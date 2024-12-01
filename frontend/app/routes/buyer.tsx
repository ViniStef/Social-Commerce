import style from "../styles/style.module.scss";
import logo from "~/assets/icons/social-commerce-logo.svg";
import smartphone from "~/assets/icons/phone.svg";
import piggy from "~/assets/icons/piggy-bank.svg";
import tree from "~/assets/icons/tree.svg"
import tv from "~/assets/icons/tv.svg";
import laptop from "~/assets/icons/laptop.svg";
import lamp from "~/assets/icons/lamp.svg";
import joystick from "~/assets/icons/joystick.svg";
import wishes from "~/assets/icons/bag-fill.svg";
import houseFill from "~/assets/icons/house-fill.svg";
import eraser from "~/assets/icons/eraser-fill.svg";
import shirt from "~/assets/icons/shirt-svgrepo-com.svg";
import offers from "~/assets/icons/currency-dollar.svg";
import follow from "~/assets/icons/person-plus.svg";


import {Form, json, useActionData, useLoaderData, useRevalidator, useSubmit} from "@remix-run/react";
import {
    ActionFunction,
    ActionFunctionArgs,
    LoaderFunctionArgs,
    MetaFunction,
    redirect,
    SessionData
} from "@remix-run/node";
import axios, {AxiosError} from "axios";
import * as path from "node:path";
import * as process from "node:process";
import * as fs from "node:fs";
import {commitSession, getSession, redirectAndClearCookie, requireAuthCookie} from "~/auth";
import ProfileFollowersDisplay from "~/components/ProfileFollowersDisplay";
import {PublicationDisplay} from "~/components/PublicationDisplay";
import {LogoDisplay} from "~/components/LogoDisplay";
import logout from "~/assets/icons/logout.svg";
import {createContext, Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import publication from "~/assets/icons/file-image.svg";
import plus from "~/assets/icons/plus-circle.svg";
import close from "~/assets/icons/x-circle.svg";
import metrics from "~/assets/icons/metrics.svg";
import WishlistDisplay from "~/components/WishlistDisplay";

type Seller = {
    firstName: string;
    lastName: string;
    imagePath: string;
    sellerId: number;
}

type BuyerProfileResultType = {
    imagePath: string,
    firstName: string;
    lastName: string;
    sellers: any[];
}

export type PublicationsResultType = {
    publicationId: number;
    publicationDate: string;
    productName: string;
    sellerImg: string;
    sellerName: string;
    sellerId: number;
    description: string;
    imagePath: string;
    discount: number;
    price: number;
    likes: number;
}

let session: SessionData;

let publications: PublicationsResultType[];


export const meta: MetaFunction = () => {
    return [{title: "Comprador - Social Commerce"},
        {
        name: "description",
        content: "Compre novos produtos e siga seus vendedores favoritos"
        },
        {
            name: "keywords",
            content: "Ecommerce, Vendas, Compras, Produtos, Promoções, Social Commerce, Smartphones, Tecnologias, Roupas, Televisores, Ofertas"
        }
    ]
}

export async function loader({request}: LoaderFunctionArgs) {
    const sessionLoader = await getSession(
        request.headers.get("Cookie")
    )

    const {userId, accountType} = await requireAuthCookie(request);

    if (accountType === "seller") {
        return redirect("/seller");
    }

    let resultFinal: {
        imagePath?: string;
        firstName?: string;
        lastName?: string;
        sellersFollowed?: any[];
        publicationsList?: PublicationsResultType[];
        errors?: string[]
    } = {errors: []};


    try {
        const {data}: {
            data: BuyerProfileResultType
        } = await axios.get(`http://localhost:8080/buyer/profile/${userId}`);
        resultFinal.imagePath = data.imagePath;
        resultFinal.firstName = data.firstName;
        resultFinal.lastName = data.lastName;
        resultFinal.sellersFollowed = data.sellers;
        console.log("sellers followed aki: ", data.sellers);

    } catch (error) {
        console.error("Error fetching buyer profile", error);
        resultFinal.errors!.push("Erro ao buscar o perfil do comprador.");
    }

    try {
        const {data}: {
            data: PublicationsResultType[]
        } = await axios.get(`http://localhost:8080/publications/buyer/${userId}`);
        publications = data;
    } catch (error) {
        console.error("Error fetching buyer publications", error);
        resultFinal.errors!.push("Erro ao buscar publicações do comprador.");
    }
    session = sessionLoader;
    resultFinal.publicationsList = publications;
    return resultFinal;

}

interface RemoveWishlistContextType {
    cartList: PublicationsResultType[] | [];
    setCartList: Dispatch<SetStateAction<PublicationsResultType[] | []>>;
}

export const RemoveWishlistContext = createContext<RemoveWishlistContextType>({
    cartList: [],
    setCartList: () => {
    },
});


export default function FeedPage() {
    const submit = useSubmit();
    const data = useActionData<typeof action>();
    const loaderData = useLoaderData<typeof loader>();
    const publicationsFeed =   data?.publicationFiltered || loaderData.publicationsList || publications;
    const [cartList, setCartList] = useState<PublicationsResultType[]>(() => {
        if (typeof window !== "undefined" && window.localStorage) {
            const localInfo = localStorage.getItem("@CartItems");
            return localInfo ? JSON.parse(localInfo) : [];
        }
        return [];
    });

    const [count, setCount] = useState(2);

    useEffect(() => {
        localStorage.setItem("@CartItems", JSON.stringify(cartList))
        addCount();

    }, [cartList])

    const addCount = () => {
        if(cartList){
            setCount(cartList.length)
        }
    }

    function scrollToTop() {
        document.body.scrollTo(0, 0); // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    const addProductCart = (cartPublication:PublicationsResultType) => {

        const hasProduct = cartList.some((cartItem:PublicationsResultType) => cartItem.publicationId === cartPublication.publicationId);

        if (!hasProduct) {
            setCartList([...cartList, cartPublication])
            addCount();
        }
        else {
            return {error: "O produto já foi adicionado!"};
        }
    }

    return (
        <div className={style.page__container}>

            <section className={style.lateral__bar}>
                <ul className={style.bar__list}>

                    <li className={style.bar__item}>
                        <button onClick={(e) => scrollToTop()} className={style.bar__action}>
                            <img className={style.bar__image} src={houseFill} alt="Início"/>
                        </button>

                        <p className={style.bar__text}>Início</p>
                    </li>

                    <li className={style.bar__item}>
                        <Form className={style.item__form} method={"post"}>
                            <input type="hidden" name={"_action"} value={"promo_posts"}/>
                            <button className={style.bar__action}>
                                <img className={style.bar__image} src={offers} alt="Ofertas"/>
                            </button>
                            <p className={style.bar__text}>Ofertas</p>
                        </Form>
                    </li>


                <li className={style.bar__item}>
                    <Form method={"post"}>
                        <input type="hidden" name={"_action"} value={"wishlist_display"}/>
                        <button className={style.bar__action}>
                            <span className={style.desire_span}>{count}</span>
                            <img className={style.bar__image} src={wishes} alt="Desejos"/>
                        </button>
                    </Form>
                    <p className={style.bar__text}>Lista de Desejos</p>
                    </li>

                    <li className={style.bar__item}>
                        <Form method={"post"}>
                            <input type="hidden" name={"_action"} value={"log_out"}/>
                            <button className={style.bar__action}>
                                <img className={style.bar__image} src={logout} alt="Métricas"/>
                            </button>
                        </Form>
                        <p className={style.bar__text}>Sair da Sessão</p>
                    </li>

                </ul>
            </section>

            <main className={style.feed__container}>
                {data?.showWishlist && !data?.closeWishlist &&

                    <RemoveWishlistContext.Provider value={{cartList, setCartList}}>
                        <WishlistDisplay wishlistItems={cartList} />
                    </RemoveWishlistContext.Provider>}

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
                                                <form method={"post"}>
                                                    <li className={style.seller_result} key={seller.imagePath}>
                                                        <div className={style.result_person}>
                                                            <img src={seller.imagePath} alt=""/>
                                                            <p>{seller.firstName} {seller.lastName} </p>
                                                        </div>
                                                        <input type="hidden" name={"_action"} value={"follow"}/>
                                                        <input type="hidden" name={"sellerId"} value={seller.sellerId}/>
                                                        <button
                                                            className={style.button_modal}>
                                                            <img className={style.button_img} src={follow}
                                                                 alt="follow"/>
                                                        </button>
                                                    </li>
                                                </form>

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
                        <Form method={"post"}>
                            <li className={style.item__category}>
                                <div className={style.category__img_container}>
                                    <input type="hidden" name={"_action"} value={"best_promo_posts"}/>
                                    <button className={`${style.category__button} ${style.category__blue}`}>
                                        <img className={style.category__image} src={piggy} alt="Produto"/>
                                    </button>
                                </div>
                                <p className={style.category__name}>Maiores Ofertas</p>
                            </li>
                        </Form>

                        <Form method={"post"}>
                            <li className={style.item__category}>
                                <div className={style.category__img_container}>
                                    <input type="hidden" name={"_action"} value={"post_by_category"}/>
                                    <input type="hidden" name={"categoryId"} value={1}/>
                                    <button className={`${style.category__button} ${style.category__blue}`}>
                                        <img className={style.category__image} src={tree} alt="Produto"/>
                                    </button>
                                </div>
                                <p className={style.category__name}>Natal</p>
                            </li>
                        </Form>

                        <Form method={"post"}>
                            <li className={style.item__category}>
                                <div className={style.category__img_container}>
                                    <input type="hidden" name={"_action"} value={"post_by_category"}/>
                                    <input type="hidden" name={"categoryId"} value={2}/>
                                    <button className={`${style.category__button} ${style.category__blue}`}>
                                        <img className={style.category__image} src={tv} alt="Produto"/>
                                    </button>
                                </div>
                                <p className={style.category__name}>Televisores</p>
                            </li>
                        </Form>

                        <Form method={"post"}>
                            <li className={style.item__category}>
                                <div className={style.category__img_container}>
                                    <input type="hidden" name={"_action"} value={"post_by_category"}/>
                                    <input type="hidden" name={"categoryId"} value={3}/>
                                    <button className={`${style.category__button} ${style.category__blue}`}>
                                        <img className={style.category__image} src={smartphone} alt="Produto"/>
                                    </button>
                                </div>
                                <p className={style.category__name}>Smartphones</p>
                            </li>
                        </Form>

                        <Form method={"post"}>
                            <li className={style.item__category}>
                                <div className={style.category__img_container}>
                                    <input type="hidden" name={"_action"} value={"post_by_category"}/>
                                    <input type="hidden" name={"categoryId"} value={4}/>
                                    <button className={`${style.category__button} ${style.category__blue}`}>
                                        <img className={style.category__image} src={joystick} alt="Produto"/>
                                    </button>
                                </div>
                                <p className={style.category__name}>Jogos</p>
                            </li>
                        </Form>

                        <Form method={"post"}>
                            <li className={style.item__category}>
                                <div className={style.category__img_container}>
                                    <input type="hidden" name={"_action"} value={"post_by_category"}/>
                                    <input type="hidden" name={"categoryId"} value={5}/>
                                    <button className={`${style.category__button} ${style.category__blue}`}>
                                        <img className={style.category__image} src={laptop} alt="Produto"/>
                                    </button>
                                </div>
                                <p className={style.category__name}>Eletrônicos</p>
                            </li>
                        </Form>

                        <Form method={"post"}>
                            <li className={style.item__category}>
                                <div className={style.category__img_container}>
                                    <input type="hidden" name={"_action"} value={"post_by_category"}/>
                                    <input type="hidden" name={"categoryId"} value={6}/>
                                    <button className={`${style.category__button} ${style.category__blue}`}>
                                        <img className={style.category__image} src={lamp} alt="Produto"/>
                                    </button>
                                </div>
                                <p className={style.category__name}>Decorações</p>
                            </li>
                        </Form>

                        <Form method={"post"}>
                            <li className={style.item__category}>
                                <div className={style.category__img_container}>
                                    <input type="hidden" name={"_action"} value={"post_by_category"}/>
                                    <input type="hidden" name={"categoryId"} value={7}/>
                                    <button className={`${style.category__button} ${style.category__blue}`}>
                                        <img className={style.category__image} src={shirt} alt="Produto"/>
                                    </button>
                                </div>
                                <p className={style.category__name}>Roupas</p>
                            </li>
                        </Form>

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
                        publicationsFeed && publicationsFeed.length > 0 ? (
                            publicationsFeed.map((publication: PublicationsResultType) => (
                                <PublicationDisplay publication={publication} type={"buyer"}
                                                    addProductCart={addProductCart}/>
                            ))
                        ) : (
                            <PublicationDisplay publication={null} notFound={true} type={"buyer"}/>
                        )
                    }


                </section>

            </main>

            <section className={`${data?.showProfileMobile ? style.mobile__profile : style.user__section}`}>
                <div className={`${style.user__container} ${data?.showProfileMobile ? style.mobile__content : ""}`}>
                    <div className={style.user__info}>
                        <img className={style.user__image} src={loaderData?.imagePath ? loaderData.imagePath : logo}
                             alt="Imagem de Perfil"/>
                        <p className={style.user__name}
                           style={{textTransform: "capitalize"}}>{loaderData?.firstName} {loaderData?.lastName}</p>
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
                                        <ProfileFollowersDisplay profileImg={seller.imagePath} firstName={seller.firstName}
                                                                 lastName={seller.lastName} type={"buyer"}
                                                                 sellerId={seller.sellerId}/>
                                    )
                                })
                                : <li className={style.nofollow__content}>
                                    <div className={style.nofollow__item}>
                                        <p className={style.nofollow__text}>Você ainda não está seguindo ninguém!</p>
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
                                <input type="hidden" name={"_action"} value={"home"}/>
                                <div className={style.feature__item}>
                                    <button onClick={(e) => scrollToTop()} className={style.feature__action}>
                                        <img className={style.action__image} src={houseFill} alt="Início"/>
                                    </button>
                                </div>
                            </Form>

                            <Form className={style.feature__form} method={"post"}>
                                <input type="hidden" name={"_action"} value={"promo_posts"}/>
                                <div className={style.feature__item}>
                                <button className={style.feature__action}>
                                        <img className={style.action__image} src={offers} alt="Ofertas"/>
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
                                <input type="hidden" name={"_action"} value={"wishlist_display"}/>
                                <div className={style.feature__item}>
                                    <button className={`${style.feature__action} ${style.bar__action}`}>
                                        <span className={style.desire_span}>{count}</span>
                                        <img className={style.action__image} src={wishes} alt="Lista de Desejos"/>
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

export async function action({
                                 request
                             }: ActionFunctionArgs) {
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
            break;
        }

        case "unfollow": {
            try {
                const response = await axios.put(baseUrl + `buyer/unfollow/${formData.get("sellerId")}/by/${userId}`)
                const status = response.status;

                if (status == 204) {
                    return {status: status};
                }
            } catch (error) {

                if (error instanceof AxiosError) {
                    return {errors: "Erro na conexão com o servidor, tente novamente mais tarde"};

                } else {
                    return {errors: "Erro inesperado no servidor"};
                }
            }
            break;
        }

        case "follow": {
            try {
                const response = await axios.post(baseUrl + `buyer/follower/${userId}/followed/${formData.get("sellerId")}`)
                const status = response.status;

                console.log("status:" + status)
                console.log("id: " + formData.get("sellerId"))

                if (status == 200) {
                    return {status: status};
                }
            } catch (error) {

                if (error instanceof AxiosError) {
                    return {errors: "Erro na conexão com o servidor, tente novamente mais tarde"};

                } else {
                    return {errors: "Erro inesperado no servidor"};
                }
            }
            break;
        }


        case "post_by_category": {
            try {
                const response = await axios.get(baseUrl + `publications/buyer/${userId}/category/${formData.get("categoryId")}`)

                const publicationsCategory: PublicationsResultType[] = response.data

                if (publicationsCategory) {
                    publications = publicationsCategory;
                }

                return {publicationFiltered: publications};

            } catch (error) {

                if (error instanceof AxiosError) {
                    return {errors: "Erro na conexão com o servidor, tente novamente mais tarde"};

                } else {
                    return {errors: "Erro inesperado no servidor"};
                }
            }
        }

        case "promo_posts": {
            try {
                const response = await axios.get(baseUrl + `publications/promo/${userId}`)
                console.log("promo1: " + response)

                const publicationsPromo: PublicationsResultType[] = response.data

                console.log("promo2: " + publicationsPromo)

                if (publicationsPromo) {
                    publications = publicationsPromo;
                }

                return {publicationFiltered: publicationsPromo};

            } catch (error) {
                console.log("dentro do error: " + error)
                if (error instanceof AxiosError) {
                    return {errors: "Erro na conexão com o servidor, tente novamente mais tarde"};

                } else {
                    return {errors: "Erro inesperado no servidor"};
                }
            }
        }
        case "best_promo_posts": {
                try {
                    const response = await axios.get(baseUrl + `publications/mostPromo/${userId}`)

                    const publicationsPromo: PublicationsResultType[] = response.data


                    if (publicationsPromo) {
                        publications = publicationsPromo;
                    }

                    return {publicationFiltered: publicationsPromo};

                } catch (error) {
                    console.log("dentro do error: "+error)
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

        case "like_post": {
            try {
                const response = await axios.post(baseUrl + `buyer/publication/${formData.get("sellerId")}/like/${formData.get("publicationId")}`)
                const status = response.status;

                if (status == 200) {
                    return {status: status};
                }
            } catch (error) {

                if (error instanceof AxiosError) {
                    return {errors: "Erro na conexão com o servidor, tente novamente mais tarde"};

                } else {
                    return {errors: "Erro inesperado no servidor"};
                }
            }
            break;
        }

        case "show_profile_mobile": {
            return {showProfileMobile: true};
        }

        case "close_profile_mobile": {
            return {closeProfileMobile: true};
        }

        case "wishlist_display": {
            return {showWishlist: true};
        }

        case "close_wishlist": {
            return {closeWishlist: true};
        }

    }
    return {error: "Internal Server Error"};
}


