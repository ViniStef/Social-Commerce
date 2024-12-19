import {Link} from "@remix-run/react";
import style from "./style.module.scss";
import github from "~/assets/icons/github.svg";
import linkedin from "~/assets/icons/linkedin.svg";

export default function DeveloperSocials() {
    return (
        <div className={style.dev__socials}>
            <div className={style.dev__container}>
                <div className={style.dev__info}>
                    <h1 className={style.dev__name}>Marcos Vinícius Alves Goulart</h1>
                    <div className={style.social__links}>
                        <a target={"_blank"
                        } className={style.link__social} href={"https://github.com/mvsgurtz"}><img className={style.social__image} src={github}
                                                                          alt="GitHub"/></a>
                        <a target={"_blank"
                        } className={style.link__social}
                              href={"https://www.linkedin.com/in/marcos-vinícius-goulart/"}><img
                            className={style.social__image} src={linkedin} alt="LinkedIn"/></a>
                    </div>
                </div>
                <div className={style.dev__info}>
                    <h1 className={style.dev__name}>Vinícius Steflitsch da Silva</h1>
                    <div className={style.social__links}>
                        <a target={"_blank"
                        } className={style.link__social} href={"https://github.com/ViniStef"}><img className={style.social__image} src={github}
                                                                          alt="GitHub"/></a>
                        <a target={"_blank"
                        } className={style.link__social}
                              href={"https://www.linkedin.com/in/vinicius-steflitsch"}><img
                            className={style.social__image} src={linkedin} alt="LinkedIn"/></a>
                    </div>
                </div>
            </div>

        </div>
    );
}
