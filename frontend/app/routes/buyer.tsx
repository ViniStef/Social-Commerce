import style from "../styles/style.module.scss";
import logo from "~/assets/icons/social-commerce-logo.svg";
import menu from "~/assets/images/list.svg";
import pedro from "~/assets/images/pedro.webp";
import search from "~/assets/images/search.svg";
import house from "~/assets/images/house.svg";
import bookmarks from "~/assets/images/bookmarks.svg";
import follows from "~/assets/images/follows.svg";
import woman1 from "~/assets/people/woman1.jfif";
import woman2 from "~/assets/people/woman2.jfif";
import man1 from "~/assets/people/man1.jfif";
import man2 from "~/assets/people/man2.jfif";
import unfollow from "~/assets/images/person-x-fill.svg";
import netshoes from "~/assets/images/netshoes-logo.png";
import smartphone from "~/assets/icons/phone.svg";
import piggy from "~/assets/icons/piggy-bank.svg";
import tree from "~/assets/icons/tree.svg"
import tv from "~/assets/icons/tv.svg";
import laptop from "~/assets/icons/laptop.svg";
import lamp from "~/assets/icons/lamp.svg";
import joystick from "~/assets/icons/joystick.svg";
import hearts from "~/assets/icons/hearts.svg";
import wishes from "~/assets/icons/bag-fill.svg";
import bookmarksFill from "~/assets/icons/bookmarks-fill.svg";
import houseFill from "~/assets/icons/house-fill.svg";
import eraser from "~/assets/icons/eraser-fill.svg";
import shirt from "~/assets/icons/shirt-svgrepo-com.svg";
import offers from "~/assets/icons/currency-dollar.svg";


import {Form, json, useActionData, useLoaderData, useRevalidator, useSubmit} from "@remix-run/react";
import {ActionFunction, ActionFunctionArgs, LoaderFunctionArgs, redirect, SessionData} from "@remix-run/node";
import axios, {AxiosError} from "axios";
import * as path from "node:path";
import * as process from "node:process";
import * as fs from "node:fs";
import {commitSession, getSession, redirectAndClearCookie, requireAuthCookie} from "~/auth";
import ProfileFollowersDisplay from "~/components/ProfileFollowersDisplay";
import {PublicationDisplay} from "~/components/PublicationDisplay";
import {LogoDisplay} from "~/components/LogoDisplay";
import logout from "~/assets/icons/logout.svg";

type Seller = {
    name: string;
    imagePath: string;
    sellerId:number;
}

type BuyerProfileResultType = {
    imagePath: string,
    name: string;
    sellers: any[];
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
    return [{ title: "Comprador - Social Commerce"}]
}

export async function loader({request}: LoaderFunctionArgs) {

    // O código antigo assim q dei o merge é esse das linhas 73 até o 78
    // Testando os da linha 80 até 84

    const sessionLoader = await getSession(
        request.headers.get("Cookie")
    )

    // let userId = sessionLoader.get("userId");
    // let accountType = sessionLoader.get("accountType");

    const {userId, accountType } = await requireAuthCookie(request);

    if (accountType === "seller") {
        return redirect("/seller");
    }

    let resultFinal: {imagePath?: string; name?: string; sellersFollowed?: any[]; publicationsList?: PublicationsResultType[]; errors?: string[] } = { errors: [] };

    try {
        const { data }: { data: BuyerProfileResultType } = await axios.get(`http://localhost:8080/buyer/profile/${userId}`);
        resultFinal.imagePath = data.imagePath;
        resultFinal.name = data.name;
        resultFinal.sellersFollowed = data.sellers;
        console.log("sellers followed aki: ", data.sellers);

    } catch (error) {
        console.error("Error fetching buyer profile", error);
        resultFinal.errors!.push("Erro ao buscar o perfil do comprador.");
    }

    try {
        const { data }: { data: PublicationsResultType[] } = await axios.get(`http://localhost:8080/publications/buyer/${userId}`);
        resultFinal.publicationsList = data;
    } catch (error) {
        console.error("Error fetching buyer publications", error);
        resultFinal.errors!.push("Erro ao buscar publicações do comprador.");
    }
    session = sessionLoader;
    return resultFinal;

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


    return (
        <div className={style.page__container}>
            <section className={style.lateral__bar}>
                <ul className={style.bar__list}>
                    <li className={style.bar__item}>
                        <button className={style.bar__action}>
                            <img className={style.bar__image} src={search} alt="Buscar"/>
                        </button>

                        <p className={style.bar__text}>Buscar</p>
                    </li>

                    <li className={style.bar__item}>
                        <button className={style.bar__action}>
                            <img className={style.bar__image} src={houseFill} alt="Início"/>
                        </button>

                        <p className={style.bar__text}>Início</p>
                    </li>

                    <li className={style.bar__item}>
                        <button className={style.bar__action}>
                            <img className={style.bar__image} src={offers} alt="Ofertas"/>
                        </button>

                        <p className={style.bar__text}>Ofertas</p>
                    </li>

                    <li className={style.bar__item}>
                        <button className={style.bar__action}>
                            <img className={style.bar__image} src={wishes} alt="Desejos"/>
                        </button>

                        <p className={style.bar__text}>Lista de Desejos</p>
                    </li>

                    <li className={style.bar__item}>
                        <Form method={"post"}>
                            <input type="hidden" name={"_action"} value={"log_out"}/>
                            <button className={style.bar__action}>
                                <img className={style.bar__image} src={logout} alt="Métricas"/>
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

                        <div className={style.content__search}>
                            <Form method={"post"} className={style.search__field}>
                                <input type="hidden" name={"_action"} value={"search"}/>
                                <label className={style.sr__only} htmlFor="search">Busque por um vendedor</label>
                                <input className={`${style.standard__input} ${style.field__input}`} name={"search"}
                                       id={"search"} placeholder={"Busque por um vendedor"}/>
                                <button onClick={(e) => console.log("oi")} type={"submit"} aria-label={"buscar"}
                                        className={style.field__submit}></button>
                            </Form>

                        </div>
                    </div>

                    {data?.sellers &&
                        <div className={style.modal__search}>
                            <div className={style.search__results}>
                                <Form className={style.close__form} method={"post"}>
                                    <input type="hidden" name={"_action"} value={"close_search"}/>
                                    <button aria-label={"fechar"} className={style.close__button}>Fechar</button>
                                </Form>

                                <div className={style.background__style}>
                                    <span className={style.line__background}></span>
                                    <span className={style.line__background}></span>
                                    <span className={style.line__background}></span>
                                </div>

                                <ul className={style.results__list}>

                                    {data.sellers.length > 0 ? data.sellers.map((seller: Seller) => {
                                            return (
                                                <li key={seller.imagePath}>
                                                    <img src={seller.imagePath} alt=""/>
                                                    <p>{seller.name}</p>
                                                </li>
                                            )
                                        }) :
                                        <li className={style.result__item}>
                                            <p className={style.noseller__text}>Não encontramos nenhum vendedor</p>
                                        </li>
                                    }


                                </ul>
                            </div>
                        </div>
                    }

                    {data?.errors &&
                        <p>Erro na busca, tente novamente mais tarde</p>
                    }


                </nav>

                <section className={style.category__section}>
                    <h1 className={style.category__title}>Categorias</h1>
                    <div className={style.separation__div}></div>
                    <ul className={style.category__list}>
                        <li className={style.item__category}>
                            <div className={style.category__img_container}>
                                <button className={`${style.category__button} ${style.category__blue}`}>
                                    <img className={style.category__image} src={piggy} alt="Produto"/>
                                </button>
                            </div>
                            <p className={style.category__name}>Maiores Ofertas</p>
                        </li>

                        <li className={style.item__category}>
                            <div className={style.category__img_container}>
                                <button className={`${style.category__button} ${style.category__blue}`}>
                                    <img className={style.category__image} src={tree} alt="Produto"/>
                                </button>
                            </div>
                            <p className={style.category__name}>Natal</p>
                        </li>

                        <li className={style.item__category}>
                            <div className={style.category__img_container}>
                                <button className={`${style.category__button} ${style.category__blue}`}>
                                    <img className={style.category__image} src={tv} alt="Produto"/>
                                </button>
                            </div>
                            <p className={style.category__name}>Televisores</p>
                        </li>

                        <li className={style.item__category}>
                            <div className={style.category__img_container}>
                                <button className={`${style.category__button} ${style.category__blue}`}>
                                    <img className={style.category__image} src={smartphone} alt="Produto"/>
                                </button>
                            </div>
                            <p className={style.category__name}>Smartphones</p>
                        </li>

                        <li className={style.item__category}>
                            <div className={style.category__img_container}>
                                <button className={`${style.category__button} ${style.category__blue}`}>
                                    <img className={style.category__image} src={joystick} alt="Produto"/>
                                </button>
                            </div>
                            <p className={style.category__name}>Jogos</p>
                        </li>

                        <li className={style.item__category}>
                            <div className={style.category__img_container}>
                                <button className={`${style.category__button} ${style.category__blue}`}>
                                    <img className={style.category__image} src={laptop} alt="Produto"/>
                                </button>
                            </div>
                            <p className={style.category__name}>Eletrônicos</p>
                        </li>

                        <li className={style.item__category}>
                            <div className={style.category__img_container}>
                                <button className={`${style.category__button} ${style.category__blue}`}>
                                    <img className={style.category__image} src={lamp} alt="Produto"/>
                                </button>
                            </div>
                            <p className={style.category__name}>Decorações</p>
                        </li>

                        <li className={style.item__category}>
                            <div className={style.category__img_container}>
                                <button className={`${style.category__button} ${style.category__blue}`}>
                                    <img style={{
                                        "padding": "1px"
                                    }} className={style.category__image} src={shirt} alt="Produto"/>
                                </button>
                            </div>
                            <p className={style.category__name}>Roupas</p>
                        </li>

                    </ul>
                </section>

                <section className={style.feed__section}>
                    <div className={style.feed__starter}>
                        <div className={style.feed__headline}>
                            <p className={style.feed__text}>Feed</p>
                            <div className={style.feed__indicator}></div>
                        </div>
                    </div>


                    {
                        loaderData?.publicationsList && loaderData.publicationsList.length > 0 ? (
                            loaderData.publicationsList.map((publication: PublicationsResultType) => (
                                <PublicationDisplay publication={publication} type={"buyer"} />
                            ))
                        ) : (
                            <PublicationDisplay publication={null} notFound={true} type={"buyer"} />
                        )
                    }


                </section>

                <section className={style.user__features}>

                    <ul className={style.feature__list}>
                        <li className={style.feature__group}>
                            <div className={style.feature__item}>
                                <button className={style.feature__action}>
                                    <img className={style.action__image} src={search} alt="Buscar"/>
                                </button>
                            </div>
                            <div className={style.feature__item}>
                                <button className={style.feature__action}>
                                    <img className={style.action__image} src={house} alt="Início"/>
                                </button>
                            </div>

                        </li>

                        <li className={`${style.feature__item} ${style.profile__item}`}>
                            <button className={style.feature__action}>
                                <img className={style.action__image} src={pedro} alt="Meu Perfil"/>
                                <p className={style.action__name}>Meu Perfil</p>
                            </button>
                        </li>

                        <li className={style.feature__group}>
                            <div className={style.feature__item}>
                                <button className={style.feature__action}>
                                    <img className={style.action__image} src={wishes} alt="Lista de Desejos"/>
                                </button>
                            </div>
                            <div className={style.feature__item}>
                                <button className={style.feature__action}>
                                    <img className={style.action__image} src={offers} alt="Ofertas"/>
                                </button>
                            </div>
                        </li>

                    </ul>

                </section>


            </main>


            <section className={style.user__container}>
                <div className={style.user__info}>
                    <img className={style.user__image} src={loaderData?.imagePath ? loaderData.imagePath : logo}
                         alt="Imagem de Perfil"/>
                    <p className={style.user__name} style={{textTransform: "capitalize"}}>{loaderData?.name}</p>
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
                            Seguindo
                        </h1>
                    </div>

                    <ul className={style.follows__list}>

                        {loaderData?.sellersFollowed && loaderData.sellersFollowed.length > 0 ? loaderData.sellersFollowed.map((seller: Seller) => {
                                return (
                                    <ProfileFollowersDisplay profileImg={seller.imagePath} name={seller.name} type={"buyer"} sellerId={seller.sellerId}/>
                                )
                            })
                            : <li className={style.nofollow__content} >
                                <div className={style.nofollow__item}>
                                <p className={style.nofollow__text}>Você ainda não está seguindo ninguém!</p>
                                </div>
                                <LogoDisplay />
                            </li>
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

    const baseUrl = "http://localhost:8080/";

    switch (_action) {
        case "search": {

            try {
                const response = await axios.get(baseUrl + `seller/findASeller/${formData.get("search")}`)
                const sellerResponse: Seller[] = response.data;

                console.log("Response data: ", response.data);

                return {sellers: sellerResponse};
            } catch (error) {

                if (error instanceof AxiosError) {
                    return {errors: "Erro na conexão com o servidor, tente novamente mais tarde"};

                } else {
                    return {errors: "Erro inesperado no servidor"};
                }
            }

        }
        case "close_search": {
            return {close_search: true};
        }
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

            if (accountType === "buyer") {
                console.log("user ID aqui")
                try {
                    const result = await axios.put(`http://localhost:8080/buyer/${userId}/image`, {
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

        case "unfollow": {
            try {
                const response = await axios.put(baseUrl + `buyer/unfollow/${formData.get("sellerId")}/by/${userId}`)
                const status = response.status;

                if(status == 204){
                    return {status: status};
                }
            } catch (error) {

                if (error instanceof AxiosError) {
                    return {errors: "Erro na conexão com o servidor, tente novamente mais tarde"};

                } else {
                    return {errors: "Erro inesperado no servidor"};
                }
            }
        }
        break;
        case "log_out": {
            return redirectAndClearCookie(request);
        }
    }
}

