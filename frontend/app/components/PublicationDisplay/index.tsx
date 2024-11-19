import style from "~/styles/style.module.scss";
import logo from "~/assets/icons/social-commerce-logo.svg";
import details from "~/assets/images/three-dots-vertical.svg";
import product from "~/assets/images/product_shirt.webp";
import like from "~/assets/images/heart-svgrepo-com.svg";
import bag from "~/assets/images/bag.svg";
import bookmark from "~/assets/images/bookmark.svg";
import {PublicationsResultType} from "~/routes/feed";

export const PublicationDisplay = ({ publication, notFound = false }: { publication: PublicationsResultType | null; notFound?: boolean }) => {
    return (


        <div className={style.post__container}>
            {notFound ?

                <div>
                    <p>
                        Não encontramos nenhuma publicação!
                    </p>
                </div>

                : <fieldset className={style.post__field}>
                    <legend className={style.field__brand}>
                        <img className={style.brand__image} src={publication?.sellerImg}/>
                        <span className={style.brand__name}>{publication?.productName}</span>
                    </legend>


                    <div className={style.post__details}>
                        <div className={style.post__date}>
                            <p className={style.date__text}>{publication?.publicationDate}</p>
                        </div>
                        <img className={style.post__extra} src={details} alt="detalhes"/>
                    </div>

                    <div className={style.separation__onpost}></div>
                    <div className={style.post__description}>
                        <p className={style.description__text}>{publication?.sellerName}</p>
                    </div>
                    <div className={style.post__description}>
                        <p className={style.description__text}>{publication?.description}</p>
                    </div>

                    <div className={style.post__product}>

                        <img className={style.product__image} src={product} alt=""/>
                        <span className={style.product__discount}>{publication?.discount}</span>
                    </div>

                    <div className={style.post__description}>
                        <p className={style.description__text}>{publication?.price}</p>
                    </div>


                    <div className={style.post__reactions}>
                        <div className={style.reaction__container}>
                            <img className={style.reaction__image} src={like} alt="gostar"/>
                        </div>
                        <div className={style.reaction__container}>
                            <img className={style.reaction__image} src={bag} alt="lista de desejos"/>
                        </div>
                        <div className={style.reaction__container}>
                            <img className={style.reaction__image} src={bookmark} alt="salvar"/>
                        </div>
                    </div>
                </fieldset>
            }

        </div>
    );


}