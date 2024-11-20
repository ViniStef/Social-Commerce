import style from "./style.module.scss";
import logo from "~/assets/icons/social-commerce-logo.svg";
import details from "~/assets/images/three-dots-vertical.svg";
import product from "~/assets/images/product_shirt.webp";
import like from "~/assets/images/heart-svgrepo-com.svg";
import bag from "~/assets/images/bag.svg";
import bookmark from "~/assets/images/bookmark.svg";
import trash from "~/assets/icons/trash-fill.svg"
import {PublicationsResultType} from "~/routes/seller";
import unfollow from "~/assets/images/person-x-fill.svg";
import {Form} from "@remix-run/react";

export const PublicationDisplay = ({ type, publication, notFound = false }: { publication: PublicationsResultType | null; notFound?: boolean, type: string }) => {
    const dateConversion: {[key: string]: string} = {"1": "Janeiro", "2": "Fevereiro", "3": "Março", "4": "Abril", "5": "Maio", "6": "Junho",
            "7": "Julho", "8": "Agosto", "9": "Setembro", "10": "Outubro", "11": "Novembro", "12": "Dezembro"};

    let convertedDate;
    if (publication?.publicationDate) {
        const [day, month] = publication.publicationDate.split("-");
        const convertedMonth = dateConversion[parseInt(month, 10)];
        convertedDate = `${day} de ${convertedMonth}`;
    } else {
        console.log("Data inválida ou ausente");
    }

    return (


        <div className={style.post__container}>
            {notFound ?

                <div className={style.noposts__container}>
                    <p className={style.noposts__headline}>
                        Comece a seguir um vendedor para ver suas
                        publicações!
                    </p>
                    <img className={style.noposts__image} src={logo} alt="Logo"/>
                </div>

                : <fieldset className={style.post__field}>
                    <legend className={style.field__brand}>
                        <img className={style.brand__image} src={publication?.sellerImg}/>
                        <span className={style.product__name}>{publication?.productName}</span>
                    </legend>


                    <div className={style.post__details}>
                        <div className={style.post__date}>
                            <p className={style.date__text}>{convertedDate && convertedDate}</p>
                        </div>
                    </div>


                    <div className={style.username__headline}>
                        <h1 className={style.headline__text} style={{textTransform: "capitalize"}}>{publication?.sellerName}</h1>
                    </div>

                    <div className={style.separation__onpost}></div>

                    <div className={style.post__description}>
                        <p className={style.description__text}>{publication?.description}</p>
                    </div>


                    <div className={style.post__product}>
                        <img className={style.product__image} src={product} alt=""/>
                        <span className={style.product__discount}>-{publication?.discount}%</span>
                    </div>

                    <div className={style.price__description}>
                        <p className={style.price__before}>R$ {publication?.price}</p>
                        <p className={style.price__text}>R$ {publication?.price ? publication.price - (publication.price * publication?.discount/100) : publication?.price}</p>
                    </div>

                    {type == "buyer" ?
                        <div className={style.post__reactions}>
                            <div className={style.reaction__container}>
                                <img className={style.reaction__image} src={like} alt="gostar"/>
                                <p className={style.likes__count}>{publication?.likes ? publication.likes : 0}</p>
                            </div>
                            <div className={style.reaction__container}>
                                <img className={style.reaction__image} src={bag} alt="lista de desejos"/>
                            </div>
                        </div> :
                        <div className={style.post__reactions}>
                            <div className={style.reaction__container}>
                                <Form method={"post"}>
                                    <input type="hidden" name={"_action"} value={"delete_post"}/>
                                    <input type="hidden" name={"publicationId"} value={publication?.publicationId}/>
                                    <button className={style.unfollow__button}><img className={style.reaction__image}
                                                                                    src={trash} alt="deletar"/>
                                    </button>
                                </Form>
                            </div>
                        </div>
                    }


                </fieldset>
            }

        </div>
    );


}