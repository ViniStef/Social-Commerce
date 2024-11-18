import style from "../styles/style.module.scss";
import logo from "~/assets/icons/social-commerce-logo.svg";
import menu from "~/assets/images/list.svg";
import pedro from "~/assets/images/pedro.webp";
import details from "~/assets/images/three-dots-vertical.svg";
import like from "~/assets/images/heart-svgrepo-com.svg";
import bookmark from "~/assets/images/bookmark.svg";
import bag from "~/assets/images/bag.svg";
import product from "~/assets/images/product_shirt.webp";
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

import {Form, json, useActionData, useLoaderData, useSubmit} from "@remix-run/react";
import {ActionFunction, ActionFunctionArgs, LoaderFunctionArgs, redirect} from "@remix-run/node";
import axios, {AxiosError} from "axios";
import * as path from "node:path";
import * as process from "node:process";
import * as fs from "node:fs";
import {authCookie} from "~/auth";
import ProfileFollowersDisplay from "~/components/ProfileFollowersDisplay";

type BuyerProfileResultType = {
    first_name: string;
    sellers: any[];
}

type PublicationsResultType = {
    publicationDate: string;
    productName: string;
    imagePath: string;
    discount: number;
    price: number;
    likes: number;
}

export async function loader({request}: LoaderFunctionArgs) {
    let cookieString = request.headers.get("Cookie");

    if (!(cookieString?.includes("auth"))) {
        return redirect("/login");
    }

    let { userId, accountType } = await authCookie.parse(cookieString);

    if (accountType === "buyer") {
        let results = {};
        try {
            const result = await axios.get(`http://localhost:8080/buyer/profile/${userId}`)
            const { first_name, sellers }:BuyerProfileResultType = result.data;

            results = {...results, "first_name": first_name, "sellersFollowed": sellers};
        } catch (error) {
            return {"errors": "Algo deu errado no servidor"}
        }

        try {
            const result = await axios.get(`http://localhost:8080/publications/${userId}/order`);
            const publicationsList:PublicationsResultType[] = result.data;

            results = {...results, "publicationsList": publicationsList};
        } catch (error) {

        }

    } else {

    }

    return { "first_name": "Vinicius", "sellersFollowed": [{"name": "Vinicius", "profileImg": "public/000001/e8e80253-1058-4530-9b24-5262945c47c1-1731791730441-Captura de tela 2023-05-22 160427.png"},
            {"name": "Marcos", "profileImg": "public/000001/e8e80253-1058-4530-9b24-5262945c47c1-1731791730441-Captura de tela 2023-05-22 160427.png"}
        ] };
}


export default function FeedPage() {
    const submit = useSubmit();
    const data = useActionData<typeof action>();
    const {first_name, sellersFollowed } = useLoaderData<typeof loader>();


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
                            <img className={style.bar__image} src={hearts} alt="Likes"/>
                        </button>

                        <p className={style.bar__text}>Meus Likes</p>
                    </li>

                    <li className={style.bar__item}>
                        <button className={style.bar__action}>
                            <img className={style.bar__image} src={wishes} alt="Desejos"/>
                        </button>

                        <p className={style.bar__text}>Lista de Desejos</p>
                    </li>

                    <li className={style.bar__item}>
                        <button className={style.bar__action}>
                            <img className={style.bar__image} src={bookmarksFill} alt="Salvos"/>
                        </button>

                        <p className={style.bar__text}>
                            Itens Salvos
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

                        <div className={style.content__search}>
                            <Form method={"post"} className={style.search__field}>
                                <input type="hidden" name={"_action"} value={"search"}/>
                                <label className={style.sr__only} htmlFor="search">O que você está buscando?</label>
                                <input className={`${style.standard__input} ${style.field__input}`} name={"search"}
                                       id={"search"} placeholder={"O que você está buscando?"}/>
                                <button onClick={(e) => console.log("oi")} type={"submit"} aria-label={"buscar"} className={style.field__submit}></button>
                            </Form>

                            <menu className={style.search__menu}>
                                <img className={style.button__image} src={menu}
                                                                            alt="Menu"/>
                            </menu>
                        </div>
                    </div>

                    {data?.sellers &&
                        <div className={style.modal__search}>
                            <div className={style.search__results}>
                                <Form method={"post"}>
                                    <input type="hidden" name={"_action"} value={"close_search"}/>
                                    <button aria-label={"fechar"} className={style.close__button}>Close</button>
                                </Form>

                                <ul>

                                    {data.sellers.map((seller: Seller) => {
                                        return (
                                            <li key={seller.profileImgUrl}>
                                                <img src={seller.profileImgUrl} alt=""/>
                                                <p>{seller.name}</p>
                                            </li>
                                        )
                                    })}


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

                <section>
                    <div className={style.feed__choices}>
                        <div className={style.choice__followed}>
                            <p>Seguidos</p>
                            <div className={style.choice__indicator}></div>
                        </div>
                        <div className={style.choice__recommended}>
                            <p>Para você</p>
                        </div>
                    </div>
                    <br/>
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
                                    <img className={style.action__image} src={follows} alt="Seguidos"/>
                                </button>
                            </div>
                            <div className={style.feature__item}>
                                <button className={style.feature__action}>
                                    <img className={style.action__image} src={bookmarks} alt="Bookmarks"/>
                                </button>
                            </div>
                        </li>

                    </ul>

                </section>



            </main>


            <section className={style.user__container}>
                <div className={style.user__info}>
                    <img className={style.user__image} src={data?.imageUrl ? data.imageUrl : logo} alt="Imagem de Perfil"/>
                    <p className={style.user__name}>{first_name}</p>
                    <Form onChange={(event) => {submit(event.currentTarget)}} encType={"multipart/form-data"} className={style.upload__image} method={"post"}>
                        <div className={style.upload__submit}>
                            <input type={"hidden"} name={"_action"} value={"upload_image"} />
                            <label className={style.upload__input} aria-label={"Enviar foto de perfil"} htmlFor="upload__input"><img src={eraser} alt={"Enviar imagem"} /></label>
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

                        {/*{sellersFollowed ? sellersFollowed.map((seller: Seller) => {*/}
                        {/*    return (*/}
                        {/*        <ProfileFollowersDisplay profileImg={seller.profileImg} name={seller.name} />*/}
                        {/*    )*/}
                        {/*})*/}
                        {/*: <p>Você ainda não está seguindo ninguém!</p>*/}
                        {/*}*/}

                        <li className={style.follows__item}>
                            <div className={style.follows__user}>
                                <img className={style.follows__image} src={woman1} alt=""/>
                                <div className={style.user__details}>
                                    <p className={style.follows__name}>Phyllis Meredith</p>
                                    <p className={style.user__followers}>2639 Seguidores</p>
                                </div>

                            </div>
                            <button className={style.unfollow__button}><img className={style.unfollow__image}
                                                                            src={unfollow} alt=""/></button>
                            <div className={style.follows__split}></div>

                        </li>

                        <li className={style.follows__item}>
                            <div className={style.follows__user}>
                                <img className={style.follows__image} src={man1} alt=""/>
                                <div className={style.user__details}>
                                    <p className={style.follows__name}>Kevin Malone</p>
                                    <p className={style.user__followers}>58 Seguidores</p>
                                </div>
                            </div>
                            <button className={style.unfollow__button}><img className={style.unfollow__image}
                                                                            src={unfollow} alt=""/></button>
                            <div className={style.follows__split}></div>
                        </li>

                        <li className={style.follows__item}>
                            <div className={style.follows__user}>
                                <img className={style.follows__image} src={woman2} alt=""/>
                                <div className={style.user__details}>
                                    <p className={style.follows__name}>Pam Angela</p>
                                    <p className={style.user__followers}>715 Seguidores</p>
                                </div>
                            </div>
                            <button className={style.unfollow__button}><img className={style.unfollow__image}
                                                                            src={unfollow} alt=""/></button>
                            <div className={style.follows__split}></div>

                        </li>

                        <li className={style.follows__item}>
                            <div className={style.follows__user}>
                                <img className={style.follows__image} src={man2} alt=""/>
                                <div className={style.user__details}>
                                    <p className={style.follows__name}>Jim Halpert</p>
                                    <p className={style.user__followers}>115 Seguidores</p>
                                </div>
                            </div>
                            <button className={style.unfollow__button}><img className={style.unfollow__image}
                                                                            src={unfollow} alt=""/></button>
                            <div className={style.follows__split}></div>

                        </li>
                        <li className={style.follows__item}>
                            <div className={style.follows__user}>
                                <img className={style.follows__image} src={netshoes} alt=""/>
                                <div className={style.user__details}>
                                    <p className={style.follows__name}>Netshoes</p>
                                    <p className={style.user__followers}>25.495 Seguidores</p>
                                </div>
                            </div>
                            <button className={style.unfollow__button}><img className={style.unfollow__image}
                                                                            src={unfollow} alt=""/></button>
                            <div className={style.follows__split}></div>

                        </li>


                    </ul>
                </div>
            </section>

        </div>

    );
}

type Seller = {
    name: string;
    profileImgUrl: string;
}

export async function action({request}: ActionFunctionArgs) {
    const formData = await request.formData();
    const _action = formData.get("_action");

    let cookieString = request.headers.get("Cookie");
    let { userId, accountType } = await authCookie.parse(cookieString);

    const baseUrl = "http://localhost:8080/";

    switch (_action) {
        case "search": {
            console.log("chegou aki?")
            try {
                const response = await axios.get(baseUrl + `seller/findASeller/${formData.get("search")}`)
                const sellerResponse: Seller[] = response.data;

                console.log("Response data: ", response.data);

                return {sellers: sellerResponse};
            } catch(error) {

                if (error instanceof AxiosError) {
                    return { errors: "Erro na conexão com o servidor, tente novamente mais tarde"};

                } else {
                    return { errors: "Erro inesperado no servidor" };
                }
            }

        }
        case "close_search": {
            return {close_search: true};
        }
        case "upload_image": {
            const image = formData.get("image") as File;

            if (!image) {
                return {error:  "O arquivo não pode ser enviado"};
            }

            const uploadDir = path.join(process.cwd(), "public/000001");
            const filename = `${crypto.randomUUID()}-${Date.now()}-${image.name}`;
            const filePath = path.join(uploadDir, filename);

            fs.mkdirSync(uploadDir, {recursive: true});

            const arrayBuffer = await image.arrayBuffer();
            fs.writeFileSync(filePath, Buffer.from(arrayBuffer));

            const imageUrl = `/000001/${filename}`;

            if (accountType === "buyer") {
                try {
                    const result = await axios.put(`http://localhost:8080/buyer/${userId}/image`, {
                        profileImg: imageUrl,
                    })

                    if (result.status === 200) {
                        return {imageUrl: imageUrl};
                    }

                    return {status: result.status};
                } catch (error) {
                    return {erro: "Erro ao enviar imagem"};
                }
            } else {
                try {
                    const result = await axios.put(`http://localhost:8080/seller/${userId}/image`, {
                        profileImg: imageUrl,
                    })

                    if (result.status === 200) {
                        return {imageUrl: imageUrl};
                    }

                    return {status: result.status};
                } catch (error) {
                    return {erro: "Erro ao enviar imagem"};
                }
            }

        }
    }

    console.log("chegou aki2?")

}

