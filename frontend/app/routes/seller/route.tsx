import style from "../styles/style.module.scss";
import logo from "~/assets/icons/social-commerce-logo.svg";
import plus from "~/assets/icons/plus-circle.svg";
import eraser from "~/assets/icons/eraser-fill.svg";
import publication from "~/assets/icons/file-image.svg";
import metrics from "~/assets/icons/metrics.svg";
import logout from "~/assets/icons/logout.svg";
import close from "~/assets/icons/x-circle.svg";

import {Form, useActionData, useLoaderData, useSubmit} from "@remix-run/react";
import {ActionFunctionArgs, LoaderFunctionArgs, MetaFunction, redirect, SessionData} from "@remix-run/node";
import { getSession, redirectAndClearCookie, requireAuthCookie} from "~/auth";
import ProfileFollowersDisplay from "~/components/ProfileFollowersDisplay";
import {PublicationDisplay} from "~/components/PublicationDisplay";
import CreatePublicationDisplay from "~/components/CreatePublicationDisplay";
import {LogoDisplay} from "~/components/LogoDisplay";
import SellerMetrics from "~/components/SellerMetrics";
import {validateAction} from "~/utils/utils";
import CreatePublicationPlaceholder from "~/components/CreatePublicationDisplay/CreatePublicationPlaceholder";
import {CreatePublication, createPublicationSchema} from "~/routes/seller/schemas";
import {
    Buyer,
    CreatePublicationResponse,
    DeletePublicationResponse,
    GetPublicationsBySellerIdResponse,
    PublicationsResultType,
    PutSellerProfileImgResponse,
    SellerMetricsType,
    SellerProfileResultType
} from "~/routes/seller/types";
import {
    createPublication,
    deletePublication,
    getPublicationsBySellerId,
    getSellerMetricsById,
    getSellerProfileById,
    putSellerProfileImg, saveImageToFiles
} from "~/routes/seller/requests";
import BarItem from "~/components/BarItem";
import {BottomBarForm} from "~/components/BottomBarForm";

let session: SessionData;

export const meta: MetaFunction = () => {
    return [{title: "Vendedor - Social Commerce"},
        {
            name: "description",
            content: "Anuncie seus produtos e acompanhe seu sucesso"
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
            const sellerProfileData: SellerProfileResultType = await getSellerProfileById(userId);
            const sellerMetricsData: SellerMetricsType = await getSellerMetricsById(userId);

            resultFinal.imagePath = sellerProfileData.imagePath;
            resultFinal.firstName = sellerProfileData.firstName;
            resultFinal.lastName = sellerProfileData.lastName;
            resultFinal.buyers = sellerProfileData.buyers;
            resultFinal.numOfFollowers = sellerMetricsData.numOfFollowers;
            resultFinal.numOfPublications = sellerMetricsData.numOfPublications;
            resultFinal.numOfLikes = sellerMetricsData.numOfLikes;
        } catch (error) {
            console.error("Error fetching seller data", error);
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
                    <BarItem hiddenInputValue={"list_posts"}
                             barImageUrl={publication} barImageAlt={"Publicações"} barText={"Minhas Publicações"} />
                    <BarItem formClass={"nocontent__create"} hiddenInputValue={"start_creating_publication"}
                             barImageUrl={plus} barImageAlt={"Criar"} barText={"Criar Publicações"} />
                    <BarItem hiddenInputValue={"view_metrics"} barImageUrl={metrics} barImageAlt={"Métricas"}
                             barText={"Minhas Métricas"} />
                    <BarItem hiddenInputValue={"log_out"} barImageUrl={logout} barImageAlt={"Sair da Sessão"}
                             barText={"Sair da Sessão"} />
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
                            <BottomBarForm hiddenInputValue={"list_posts"} imageUrl={publication} imageAlt={"Minhas Publicações"} />
                            <BottomBarForm hiddenInputValue={"start_creating_publication"} imageUrl={plus} imageAlt={"Criar Publicação"} />
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
                            <BottomBarForm hiddenInputValue={"view_metrics"} imageUrl={metrics} imageAlt={"Minhas Métricas"} />
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

    switch (_action) {
        case "upload_image": {
            const image = formData.get("image") as File;
            if (!image) {
                return {error: "O arquivo não pode ser enviado"};
            }
            const imageUrl: string = await saveImageToFiles(image);
            const response: PutSellerProfileImgResponse = await putSellerProfileImg(userId, imageUrl);

            if (response.profileImg) {
                return {profileImg: response.profileImg};
            } else if (response.status) {
                return {status: response.status};
            } else {
                return {erro: response.erro};
            }
        }
        case "list_posts": {
            const response: GetPublicationsBySellerIdResponse = await getPublicationsBySellerId(userId);
            if (response.publications) {
                return {publications: response.publications}
            } else {
                return {erro: "Não existe nenhuma publicação ainda"};
            }
        }
        case "delete_post": {
            const publicationId = formData.get("publicationId") as string;
            const response: DeletePublicationResponse = await deletePublication(publicationId, userId);

            if (response.status) {
                return {status: response.status};
            } else {
                return {erro: response.status};
            }
        }
        case "start_creating_publication": {
            return {startCreatingPublication: true};
        }
        case "create_publication": {
            const formObjects = Object.fromEntries(formData);
            const { errors } = validateAction<CreatePublication>(formObjects, createPublicationSchema);
            if (errors) {
                return {schemaErrors: errors};
            }
            const image = formData.get("product_image") as File;
            if (!image) {
                return {error: "O arquivo não pode ser enviado"};
            }
            const imagePath: string = await saveImageToFiles(image);
            const response: CreatePublicationResponse = await createPublication(userId, formData, imagePath);

            if (response.status === 204) {
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

