import style from "./style.module.scss";
import {LogoDisplay} from "~/components/LogoDisplay";
import follows from "~/assets/icons/people-fill.svg";
import likes from "~/assets/icons/heart-fill.svg";
import publications from "~/assets/icons/publications.svg";


export default function SellerMetrics({numOfFollowers, numOfPublications, numOfLikes}: {numOfFollowers?: number, numOfPublications?: number, numOfLikes?:number }) {
    return (
        <section className={style.seller__metrics}>
            <h1 className={style.metrics__headline}>Métricas</h1>
            <div className={style.metrics__wrap}>
                <div className={style.left__line}></div>
                <ul className={style.metrics__list}>
                    <li className={style.metrics__item}>
                        <div className={style.left__wrap}>
                            <div className={style.img__container}>
                                <img className={style.metric__image} src={follows} alt="Seguidores"/>
                            </div>
                        </div>
                        <div className={style.metrics__info}>
                            <h1 className={style.metric__headline}>Quantidade de Seguidores</h1>

                            <div className={style.metric__division}></div>
                            <span className={style.metric__value}>{numOfFollowers}</span>
                        </div>
                    </li>
                    <li className={style.metrics__item}>
                        <div className={style.left__wrap}>
                            <div className={style.img__container}>
                                <img className={style.metric__image} src={publications} alt="Publicações"/>
                            </div>
                        </div>
                        <div className={style.metrics__info}>
                            <h1 className={style.metric__headline}>Quantidade de Publicações</h1>

                            <div className={style.metric__division}></div>
                            <span className={style.metric__value}>{numOfPublications}</span>
                        </div>
                    </li>
                    <li className={style.metrics__item}>
                        <div className={style.left__wrap}>
                            <div className={style.img__container}>
                                <img className={style.metric__image} src={likes} alt="Curtidas"/>
                            </div>
                        </div>
                        <div className={style.metrics__info}>
                            <h1 className={style.metric__headline}>Quantidade de Curtidas</h1>

                            <div className={style.metric__division}></div>
                            <span className={style.metric__value}>{numOfLikes}</span>
                        </div>
                    </li>

                </ul>
            </div>


            <LogoDisplay/>
        </section>
    );
}