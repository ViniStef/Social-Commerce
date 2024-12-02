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

import {Form, useActionData, useLoaderData, useSubmit} from "@remix-run/react";
import {
    ActionFunctionArgs,
    LoaderFunctionArgs,
    MetaFunction,
    redirect,
    SessionData
} from "@remix-run/node";
import axios, {AxiosError} from "axios";
import {getSession, redirectAndClearCookie, requireAuthCookie} from "~/auth";
import ProfileFollowersDisplay from "~/components/ProfileFollowersDisplay";
import {PublicationDisplay} from "~/components/PublicationDisplay";
import {LogoDisplay} from "~/components/LogoDisplay";
import logout from "~/assets/icons/logout.svg";
import {createContext, Dispatch, SetStateAction, useEffect, useState} from "react";
import WishlistDisplay from "~/components/WishlistDisplay";
import BarItem from "~/components/BarItem";
import {CategoryItem} from "~/components/CategoryItem";
import {BottomBarForm} from "~/components/BottomBarForm";
import {MobileBottomProfileItem} from "~/components/MobileBottomProfileItem";
import {
    BuyerProfileResultType, FollowASellerResponse, GetPublicationsByCategoryResponse,
    PublicationsResultType,
    PutBuyerProfileImgResponse,
    searchSellerResponse,
    Seller, UnfollowASellerResponse
} from "~/routes/buyer/types";
import {
    followASeller,
    getBuyerProfileById,
    getPublicationsByBuyerId, getPublicationsByCategory,
    putBuyerProfileImg,
    searchSeller,
    unfollowASeller
} from "~/routes/buyer/requests";
import {saveImageToFiles} from "~/utils/save";

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
        const buyerProfileData: BuyerProfileResultType = await getBuyerProfileById(userId);
        const publicationsData: PublicationsResultType[] = await getPublicationsByBuyerId(userId);

        resultFinal.imagePath = buyerProfileData.imagePath;
        resultFinal.firstName = buyerProfileData.firstName;
        resultFinal.lastName = buyerProfileData.lastName;
        resultFinal.sellersFollowed = buyerProfileData.sellers;
        resultFinal.publicationsList = publicationsData;
    } catch (error) {
        console.error("Error fetching buyer profile", error);
        resultFinal.errors!.push("Erro ao buscar informações do comprador.");
    }
    session = sessionLoader;
    return resultFinal;
}

type RemoveWishlistContextType = {
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
                    <BarItem isScrollButton={true} hiddenInputValue={""} barImageUrl={houseFill} barImageAlt={"Início"} barText={"Início"} />
                    <BarItem formClass={"item__form"} hiddenInputValue={"promo_posts"} barImageUrl={offers} barImageAlt={"Ofertas"} barText={"Ofertas"} />
                    <BarItem count={count} hiddenInputValue={"wishlist_display"} barImageUrl={wishes} barImageAlt={"Desejos"} barText={"Lista de Desejos"} />
                    <BarItem hiddenInputValue={"log_out"} barImageUrl={logout} barImageAlt={"Métricas"} barText={"Sair da Sessão"} />
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
                                <button type={"submit"} aria-label={"buscar"}
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
                                            <Form method={"post"}>
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
                                            </Form>
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
                        <CategoryItem hiddenInputValue={"best_promo_posts"} imageUrl={piggy} imageAlt={"Maiores Ofertas"} categoryText={"Maiores Ofertas"}/>
                        <CategoryItem hiddenInputValue={"post_by_category"} value={1} imageUrl={tree} imageAlt={"Natal"} categoryText={"Natal"} />
                        <CategoryItem hiddenInputValue={"post_by_category"} value={2} imageUrl={tv} imageAlt={"Televisores"} categoryText={"Televisores"} />
                        <CategoryItem hiddenInputValue={"post_by_category"} value={3} imageUrl={smartphone} imageAlt={"Smartphones"} categoryText={"Smartphones"} />
                        <CategoryItem hiddenInputValue={"post_by_category"} value={4} imageUrl={joystick} imageAlt={"Jogos"} categoryText={"Jogos"} />
                        <CategoryItem hiddenInputValue={"post_by_category"} value={5} imageUrl={laptop} imageAlt={"Eletrônicos"} categoryText={"Eletrônicos"} />
                        <CategoryItem hiddenInputValue={"post_by_category"} value={6} imageUrl={lamp} imageAlt={"Decorações"} categoryText={"Decorações"} />
                        <CategoryItem hiddenInputValue={"post_by_category"} value={7} imageUrl={shirt} imageAlt={"Roupas"} categoryText={"Roupas"} />
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
                            <h1 className={style.follow__headline}>Seguindo</h1>
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
                            <BottomBarForm isScrollButton={true} hiddenInputValue={"home"} imageUrl={houseFill} imageAlt={"Início"} />
                            <BottomBarForm hiddenInputValue={"promo_posts"} imageUrl={offers} imageAlt={"Ofertas"} />
                        </li>

                        <MobileBottomProfileItem data={data} loaderData={loaderData} />

                        <li className={style.feature__group}>
                            <BottomBarForm count={count} hiddenInputValue={"wishlist_display"} imageUrl={wishes} imageAlt={"Lista de Desejos"} />
                            <BottomBarForm hiddenInputValue={"log_out"} imageUrl={logout} imageAlt={"Sair da Sessão"} />
                        </li>
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

    switch (_action) {
        case "search": {
            const sellerName = formData.get("search") as string;
            const response: searchSellerResponse = await searchSeller(sellerName);

            if (response.sellers) {
                return {sellers: response.sellers};
            }else {
                return {errors: response.errors};
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

            const imageUrl: string = await saveImageToFiles(image);
            const response: PutBuyerProfileImgResponse = await putBuyerProfileImg(userId, imageUrl);

            if (response.profileImg) {
                return {profileImg: response.profileImg};
            } else if (response.status) {
                return {status: response.status};
            } else {
                return {error: response.error};
            }
        }
        case "unfollow": {
            const sellerId = formData.get("sellerId") as string;

            const response: UnfollowASellerResponse = await unfollowASeller(sellerId, userId);

            if (response.status) {
                return {status: response.status};
            } else {
                return {errors: response.error};
            }
        }
        case "follow": {
            const sellerId = formData.get("sellerId") as string;
            const response: FollowASellerResponse = await followASeller(sellerId, userId)

            if (response.status) {
                return {status: response.status};
            } else {
                return {errors: response.error};
            }
        }
        case "post_by_category": {
            const categoryId = formData.get("categoryId") as string;
            const response: GetPublicationsByCategoryResponse = await getPublicationsByCategory(categoryId, userId);

            if (response.publicationsCategory) {
                publications = response.publicationsCategory;
            } else if (response.error) {
                return {errors: response.error};
            }
            return {publicationFiltered: publications};
        }
        case "promo_posts": {
            try {
                const response = await axios.get(baseUrl + `publications/promo/${userId}`)
                const publicationsPromo: PublicationsResultType[] = response.data

                if (publicationsPromo) {
                    publications = publicationsPromo;
                }

                return {publicationFiltered: publicationsPromo};
            } catch (error) {
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
                if (error instanceof AxiosError) {
                    return {errors: "Erro na conexão com o servidor, tente novamente mais tarde"};
                } else {
                    return {errors: "Erro inesperado no servidor"};
                }
            }
        }
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


