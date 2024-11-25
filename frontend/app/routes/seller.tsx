import style from "../styles/style.module.scss";
import logo from "~/assets/icons/social-commerce-logo.svg";
import search from "~/assets/images/search.svg";
import hearts from "~/assets/icons/hearts.svg";
import plus from "~/assets/icons/plus-circle.svg";
import houseFill from "~/assets/icons/house-fill.svg";
import eraser from "~/assets/icons/eraser-fill.svg";
import publication from "~/assets/icons/file-image.svg";
import metrics from "~/assets/icons/metrics.svg";
import logout from "~/assets/icons/logout.svg";
import close from "~/assets/icons/x-circle.svg";

import {Form, json, useActionData, useLoaderData, useRevalidator, useSubmit} from "@remix-run/react";
import {ActionFunction, ActionFunctionArgs, LoaderFunctionArgs, redirect, SessionData} from "@remix-run/node";
import axios, {AxiosError} from "axios";
import * as path from "node:path";
import * as process from "node:process";
import * as fs from "node:fs";
import {commitSession, getSession, redirectAndClearCookie, requireAuthCookie} from "~/auth";
import ProfileFollowersDisplay from "~/components/ProfileFollowersDisplay";
import {PublicationDisplay} from "~/components/PublicationDisplay";
import ignore from "ignore";
import CreatePublicationDisplay from "~/components/CreatePublicationDisplay";
import {LogoDisplay} from "~/components/LogoDisplay";
import SellerMetrics from "~/components/SellerMetrics";
import {z} from "zod";
import house from "~/assets/images/house.svg";
import pedro from "~/assets/images/pedro.webp";
import wishes from "~/assets/icons/bag-fill.svg";
import offers from "~/assets/icons/currency-dollar.svg";
import {useState} from "react";
import {validateAction} from "~/utils/utils";
import {InitialRegister} from "~/routes/register/schemas/initialRegisterSchema";
import CreatePublicationPlaceholder from "~/components/CreatePublicationDisplay/CreatePublicationPlaceholder";

type Buyer = {
    firstName: string;
    lastName: string;
    imagePath: string;
}

type SellerProfileResultType = {
    imagePath: string,
    firstName: string;
    lastName: string;
    buyers: Buyer[];
}

type SellerMetrics = {
    numOfFollowers: number,
    numOfPublications: number;
    numOfLikes: number;
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

export const meta = () => {
    return [{title: "Vendedor - Social Commerce"}]
}

export async function loader({request}: LoaderFunctionArgs) {

    const sessionLoader = await getSession(
        request.headers.get("Cookie")
    )

    // let userId = sessionLoader.get("userId");
    // let accountType = sessionLoader.get("accountType");

    const {userId, accountType} = await requireAuthCookie(request);

    if (accountType === "buyer") {
        return redirect("/buyer");
    }

    if (accountType === "seller") {
        let resultFinal: {
            imagePath?: string;
            firstName?: string;
            lastName?: string;
            buyers?: Buyer[];
            errors?: string[];
            numOfFollowers?: number,
            numOfPublications?: number,
            numOfLikes?: number
        } = {errors: []};

        try {
            const {data}: {
                data: SellerProfileResultType
            } = await axios.get(`http://localhost:8080/seller/profile/${userId}`);
            resultFinal.imagePath = data.imagePath;
            resultFinal.firstName = data.firstName;
            resultFinal.lastName = data.lastName;
            resultFinal.buyers = data.buyers;
        } catch (error) {
            console.error("Error fetching seller profile", error);
            resultFinal.errors!.push("Erro ao buscar o perfil do comprador.");
        }

        try {
            const {data}: { data: SellerMetrics } = await axios.get(`http://localhost:8080/seller/metrics/${userId}`);
            resultFinal.numOfFollowers = data.numOfFollowers;
            resultFinal.numOfPublications = data.numOfPublications;
            resultFinal.numOfLikes = data.numOfLikes;

        } catch (error) {
            console.error("Error fetching seller metrics", error);
            resultFinal.errors!.push("Erro ao buscar o perfil do comprador.");
        }

        session = sessionLoader;
        return resultFinal;
    }

    return null

}

export default function FeedPage() {
    const submit = useSubmit();
    const data = useActionData<typeof action>();
    const loaderData = useLoaderData<typeof loader>();

    return (
        <div className={`${style.page__container} ${data?.showProfileMobile ? style.change__background : ""}`}>
            <section className={style.lateral__bar}>
                <ul className={style.bar__list}>

                    <li className={style.bar__item}>
                        <Form method={"post"}>
                            <input type="hidden" name={"_action"} value={"list_posts"}/>
                            <button className={style.bar__action}>
                                <img className={style.bar__image} src={publication} alt="Publicações"/>
                                <p className={style.bar__text}>Minhas Publicações</p>
                            </button>
                        </Form>
                    </li>

                    <li className={style.bar__item}>
                        <Form className={style.nocontent__create} method={"post"}>
                            <input type="hidden" name={"_action"} value={"start_creating_publication"}/>
                            <button className={style.bar__action}>
                                <img className={style.bar__image} src={plus} alt="Criar"/>
                                <p className={style.bar__text}>Criar Publicações</p>
                            </button>
                        </Form>
                    </li>

                    <li className={style.bar__item}>
                        <Form method={"post"}>
                            <input type="hidden" name={"_action"} value={"view_metrics"}/>
                            <button className={style.bar__action}>
                                <img className={style.bar__image} src={metrics} alt="Métricas"/>
                                <p className={style.bar__text}>Minhas Métricas</p>
                            </button>
                        </Form>
                    </li>

                    <li className={style.bar__item}>
                        <Form method={"post"}>
                            <input type="hidden" name={"_action"} value={"log_out"}/>
                            <button className={style.bar__action}>
                                <img className={style.bar__image} src={logout} alt="Sair da Sessão"/>
                                <p className={style.bar__text}>Sair da Sessão</p>
                            </button>
                        </Form>
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
                            <p className={style.feed__text}>{loaderData?.firstName} Workbench</p>
                            <div className={style.feed__indicator}></div>
                        </div>
                    </div>

                    {!data?.showProfileMobile &&

                    data?.viewMetrics && <SellerMetrics numOfFollowers={loaderData?.numOfFollowers}
                                                       numOfPublications={loaderData?.numOfPublications}
                                                       numOfLikes={loaderData?.numOfLikes}/> }

                    {data?.publications && data.publications.length > 0 ?
                        data?.publications && (
                            data.publications.map((publication: PublicationsResultType) => (
                                <PublicationDisplay publication={publication} type={"seller"}/>
                            ))
                        )
                        : (!data?.viewMetrics && !data?.startCreatingPublication && !data?.schemaErrors) && <CreatePublicationPlaceholder />}

                    {(data?.startCreatingPublication || data?.schemaErrors) && <CreatePublicationDisplay />}


                </section>


            </main>


            <section className={`${data?.showProfileMobile ? style.mobile__profile : style.user__section}`}>
                <div className={`${style.user__container} ${data?.showProfileMobile ? style.mobile__content : ""} `}>
                    <div className={style.user__info}>
                        <img className={style.user__image} src={loaderData?.imagePath ? loaderData.imagePath : logo}
                             alt="Imagem de Perfil"/>
                        <p style={{textTransform: "capitalize"}} className={style.user__name}>{loaderData?.firstName} {loaderData?.lastName}</p>
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

                            {loaderData?.buyers && loaderData.buyers.length > 0 ? loaderData.buyers.map((buyer: Buyer) => {
                                    return (
                                        <ProfileFollowersDisplay profileImg={buyer.imagePath} firstName={buyer.firstName}
                                                                 lastName={buyer.lastName} type={"seller"}/>
                                    )
                                })
                                : <li className={style.nofollow__content}>
                                    <div className={style.nofollow__item}>
                                        <p className={style.nofollow__text}>Você não possui nenhum seguidor no
                                            momento!</p>
                                    </div>
                                    <LogoDisplay/>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
            </section>


            <section className={style.bottom__features}>
                <div className={style.user__features}>
                    <ul className={style.feature__list}>

                        <li className={style.feature__group}>
                            <Form className={style.feature__form} method={"post"}>
                                <input type="hidden" name={"_action"} value={"list_posts"}/>
                                <div className={style.feature__item}>
                                    <button className={style.feature__action}>
                                        <img className={style.action__image} src={publication}
                                             alt="Minhas Publicações"/>
                                    </button>
                                </div>
                            </Form>

                            <Form className={style.feature__form} method={"post"}>
                                <input type="hidden" name={"_action"} value={"start_creating_publication"}/>
                                <div className={style.feature__item}>
                                    <button className={style.feature__action}>
                                        <img className={style.action__image} src={plus} alt="Criar Publicação"/>
                                    </button>
                                </div>
                            </Form>

                        </li>

                        <li className={`${style.profile__item} ${style.feature__item}`}>
                            {data?.showProfileMobile ?
                                <Form className={style.close__form} method={"post"}>
                                    <input type="hidden" name={"_action"} value={"close_profile_mobile"}/>
                                    <button className={style.feature__action}>
                                        <img className={style.action__image} src={close} alt="Fechar Menu"/>
                                        <p className={style.action__name}>Fechar Perfil</p>
                                    </button>
                                </Form>
                                :
                                <Form className={style.close__form} method={"post"}>
                                    <input type="hidden" name={"_action"} value={"show_profile_mobile"}/>
                                    <button className={style.feature__action}>
                                        <img className={style.action__image}
                                             src={loaderData?.imagePath ? loaderData.imagePath : logo} alt="Perfil"/>
                                        <p className={style.action__name}>Meu Perfil</p>
                                    </button>
                                </Form>
                            }

                        </li>

                        <li className={style.feature__group}>
                            <Form className={style.feature__form} method={"post"}>
                                <input type="hidden" name={"_action"} value={"view_metrics"}/>
                                <div className={style.feature__item}>
                                    <button className={style.feature__action}>
                                        <img className={style.action__image} src={metrics} alt="Minhas Métricas"/>
                                    </button>
                                </div>
                            </Form>

                            <Form className={style.feature__form} method={"post"}>
                                <input type="hidden" name={"_action"} value={"log_out"}/>
                                <div className={style.feature__item}>
                                    <button className={style.feature__action}>
                                        <img className={style.action__image} src={logout} alt="Sair da Sessão"/>
                                    </button>
                                </div>
                            </Form>
                        </li>

                    </ul>
                </div>

            </section>

        </div>

    );
}


const createPublicationSchema = z.object({
    _action: z.string().optional(),
    product_name: z.string().min(1, {
        message: "Campo Obrigatório"
    }).max(50, {
        message: "Máximo de 50 caracteres"
    }),
    category: z.enum(["1", "2", "3", "4", "5", "6", "7"]),
    product_description: z.string().min(1, {
        message: "Campo Obrigatório"
    }).max(200, {
        message: "Máximo de 200 caracteres"
    }),
    product_image: z.any(),
    price_without_discount: z.coerce.number({message: "Apenas números são permitidos"}).min(1, {message: "Não pode ser 0 ou vazio"}).max(1000000, {message: "O valor não pode exceder 1 milhão"}),
    discount_choice: z.enum(["true", "false"]).optional(),
    discount_percentage: z.coerce.number().max(100, {message: "O desconto não pode exceder 100%"}).min(1, "O desconto não pode ser menor que 1%").optional()
})

type CreatePublication = z.infer<typeof createPublicationSchema>;

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
                return {erro: "Não existe nenhuma publicação ainda"};
            }
        }

        case "delete_post": {
            try {
                const result = await axios.put(`http://localhost:8080/publications/delete/${formData.get("publicationId")}/seller/${userId}`)

                const response = result.status;

                if (response == 204) {
                    return {status: response};
                }

            } catch (error) {
                return {erro: "Não existe publicacões ainda."};
            }
            break;
        }
        case "start_creating_publication": {
            return {startCreatingPublication: true};
        }
        case "create_publication": {
            const formObjects = Object.fromEntries(formData);
            const {formData:formParsedData, errors} = validateAction<CreatePublication>(formObjects, createPublicationSchema);

            if (errors) {
                return {schemaErrors: errors};
            }

            const image = formData.get("product_image") as File;

            console.log("teste ", image);

            const uploadDir = path.join(process.cwd(), "public/000001");
            const filename = `${crypto.randomUUID()}-${Date.now()}-${image.name}`;
            const filePath = path.join(uploadDir, filename);

            fs.mkdirSync(uploadDir, {recursive: true});
            const arrayBuffer = await image.arrayBuffer();
            fs.writeFileSync(filePath, Buffer.from(arrayBuffer));

            const imagePath = `public/000001/${filename}`;

            const {
                product_name,
                category,
                product_description,
                product_image,
                price_without_discount,
                discount_choice,
                discount_percentage
            } = formObjects;
            const result = await axios.post(baseUrl + `publications/${userId}/createPublication`, {
                product: {
                    product_name: product_name,
                },
                category: {
                    categoryID: category,
                },
                imagePath: imagePath,
                description: product_description,
                discount_percentage: discount_percentage,
                has_promotion: discount_choice,
                price: price_without_discount,
            })

            if (result.status === 204) {
                return {created: true};
            }

            return {created: false};
        }

        case "view_metrics": {
            return {viewMetrics: true};
        }

        case "log_out": {
            return redirectAndClearCookie(request);
        }

        case "show_profile_mobile": {
            return {showProfileMobile: true};
        }

        case "close_profile_mobile": {
            return {closeProfileMobile: true};
        }
    }
    return {error: "Internal Server Error"}
}

