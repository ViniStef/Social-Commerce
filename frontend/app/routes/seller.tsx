import style from "../styles/style.module.scss";
import logo from "~/assets/icons/social-commerce-logo.svg";
import search from "~/assets/images/search.svg";
import hearts from "~/assets/icons/hearts.svg";
import plus from "~/assets/icons/plus-circle.svg";
import houseFill from "~/assets/icons/house-fill.svg";
import eraser from "~/assets/icons/eraser-fill.svg";
import publication from "~/assets/icons/file-image.svg";


import {Form, json, useActionData, useLoaderData, useRevalidator, useSubmit} from "@remix-run/react";
import {ActionFunction, ActionFunctionArgs, LoaderFunctionArgs, redirect, SessionData} from "@remix-run/node";
import axios, {AxiosError} from "axios";
import * as path from "node:path";
import * as process from "node:process";
import * as fs from "node:fs";
import {commitSession, getSession} from "~/auth";
import ProfileFollowersDisplay from "~/components/ProfileFollowersDisplay";
import {PublicationDisplay} from "~/components/PublicationDisplay";
import ignore from "ignore";

type Buyer = {
    name: string;
    imagePath: string;
}

type SellerProfileResultType = {
    imagePath: string,
    name: string;
    buyers: Buyer[];
}

export type PublicationsResultType = {
    publicationId: number;
    publicationDate: string;
    productName: string;
    sellerImg: string;
    sellerName: string;
    description: string;
    imagePath: string;
    discount: number;
    price: number;
    likes: number;
}

let session: SessionData;

export async function loader({request}: LoaderFunctionArgs) {

    const sessionLoader = await getSession(
        request.headers.get("Cookie")
    )

    let userId = sessionLoader.get("userId");
    let accountType = sessionLoader.get("accountType");


    if (accountType === "seller") {
        let resultFinal: {imagePath?: string; name?: string; buyers?: Buyer[]; errors?: string[] } = { errors: [] };

        try {
            const { data }: { data: SellerProfileResultType } = await axios.get(`http://localhost:8080/seller/profile/${userId}`);
            resultFinal.imagePath = data.imagePath;
            resultFinal.name = data.name;
            resultFinal.buyers = data.buyers;
        } catch (error) {
            console.error("Error fetching seller profile", error);
            resultFinal.errors!.push("Erro ao buscar o perfil do comprador.");
        }

        session = sessionLoader;
        return resultFinal;
    }

    return null

}

// if (accountType === "buyer") {
//     try {
//         const result = await axios.get(`http://localhost:8080/buyer/profile/${userId}`)
//         const {name, sellers}: BuyerProfileResultType = result.data;
//         console.log(name);
//         console.log(sellers);
//         return {name: name, sellersFollowed: sellers};
//
//     } catch (error) {
//         console.log("catch")
//         return {"errors": "Algo deu errado no servidor"}
//     }
// }


// try {
//     const result = await axios.get(`http://localhost:8080/publications/${userId}/order`);
//     const publicationsList:PublicationsResultType[] = result.data;
//
//     results = {...results, "publicationsList": publicationsList};
//     return results;
//
// } catch (error) {
//     return console.log(error);
// }

export default function FeedPage() {
    const submit = useSubmit();
    const data = useActionData<typeof action>();
    const loaderData = useLoaderData<typeof loader>();
    console.log(loaderData);

    return (
        <div className={style.page__container}>
            <section className={style.lateral__bar}>
                <ul className={style.bar__list}>


                    <li className={style.bar__item}>
                        <Form method={"post"}>
                            <input type="hidden" name={"_action"} value={"list_posts"}/>
                            <button className={style.bar__action}>
                                <img className={style.bar__image} src={publication} alt="Publicacoes"/>
                            </button>
                        </Form>


                        <p className={style.bar__text}>Minhas Publicações</p>
                    </li>


                    <li className={style.bar__item}>
                    <button className={style.bar__action}>
                            <img className={style.bar__image} src={plus} alt="Criar"/>
                        </button>

                        <p className={style.bar__text}>
                            Criar Publicações
                        </p>
                    </li>

                </ul>
            </section>

            <main className={style.feed__container}>
                <nav className={style.navbar__feed}>
                    <div className={style.feed__content}>
                        <div className={style.logo__content}>
                            <img className={style.logo__image} src={logo} alt={"Social Commerce"}/>
                            <h1 className={style.logo__name}>Social Commerce</h1>
                        </div>
                    </div>
                </nav>

                <section>
                    <div className={style.feed__starter}>
                        <div className={style.feed__headline}>
                            <p className={style.feed__text}>{loaderData?.name} Workbench</p>
                            <div className={style.feed__indicator}></div>
                        </div>
                    </div>
                    <br/>


                    {
                        data?.publications&& (
                            data.publications.map((publication: PublicationsResultType) => (
                                <PublicationDisplay publication={publication} type={"seller"} />
                            ))
                        )
                    }

                </section>

            </main>


            <section className={style.user__container}>
                <div className={style.user__info}>
                    <img className={style.user__image} src={loaderData?.imagePath ? loaderData.imagePath : logo}
                         alt="Imagem de Perfil"/>
                    <p className={style.user__name}>{loaderData?.name}</p>
                    <Form onChange={(event) => {
                        submit(event.currentTarget)
                    }} encType={"multipart/form-data"} className={style.upload__image} method={"post"}>
                        <div className={style.upload__submit}>
                            <input type={"hidden"} name={"_action"} value={"upload_image"}/>
                            <label className={style.upload__input} aria-label={"Enviar foto de perfil"}
                                   htmlFor="upload__input"><img src={eraser} alt={"Enviar imagem"}/></label>
                            <input name={"image"} id={"upload__input"} type={"file"} accept={"image/png"}/>
                        </div>
                    </Form>
                    <div className={`${style.separation__follows} ${style.separation__div}`}></div>
                </div>

                <div className={style.user__follows}>
                    <div className={style.follows__headline}>
                        <h1 className={style.follow__headline}>
                            Seguidores
                        </h1>
                    </div>

                    <ul className={style.follows__list}>

                        {loaderData?.buyers ? loaderData.buyers.map((buyer: Buyer) => {
                                return (
                                    <ProfileFollowersDisplay profileImg={buyer.imagePath} name={buyer.name} type={"seller"}/>
                                )
                            })
                            : <p>Você ainda não está seguindo ninguém!</p>
                        }
                    </ul>
                </div>
            </section>
        </div>
    );
}

export async function action({request}: ActionFunctionArgs) {
    const formData = await request.formData();
    const _action = formData.get("_action");

    let userId = session.get("userId");
    let accountType = session.get("accountType");
    console.log(userId);
    console.log(accountType);

    const baseUrl = "http://localhost:8080/";

    switch (_action) {

        case "upload_image": {
            const image = formData.get("image") as File;

            if (!image) {
                return {error: "O arquivo não pode ser enviado"};
            }

            const uploadDir = path.join(process.cwd(), "public/000001");
            const filename = `${crypto.randomUUID()}-${Date.now()}-${image.name}`;
            const filePath = path.join(uploadDir, filename);

            fs.mkdirSync(uploadDir, {recursive: true});

            const arrayBuffer = await image.arrayBuffer();
            fs.writeFileSync(filePath, Buffer.from(arrayBuffer));

            const imageUrl = `public/000001/${filename}`;

            if (accountType === "seller") {
                try {
                    const result = await axios.put(`http://localhost:8080/seller/${userId}/image`, {
                        imagePath: imageUrl,
                    })

                    if (result.status === 200) {
                        return {profileImg: imageUrl};
                    }

                    return {status: result.status};
                } catch (error) {
                    return {erro: "Erro ao enviar imagem"};
                }
            }
        }

        case "list_posts": {
            try {
                const result = await axios.get(`http://localhost:8080/publications/seller/${userId}`)

                const response: PublicationsResultType[] = result.data;

                return {publications: response};

            } catch (error) {
                return {erro: "Não existe publicacões ainda."};
            }
        }

        case "delete_post": {
            try {
                const result = await axios.put(`http://localhost:8080/publications/delete/${formData.get("publicationId")}/seller/${userId}`)

                const response = result.status;

                if (response== 204){
                    return {status: response};
                }

            } catch (error) {
                return {erro: "Não existe publicacões ainda."};
            }

        }
    }
    return {error: "Internal Server Error"}
}

