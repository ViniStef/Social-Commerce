import style from "~/styles/style.module.scss";
import {Form} from "@remix-run/react";
import close from "~/assets/icons/x-circle.svg";
import logo from "~/assets/icons/social-commerce-logo.svg";

export function MobileBottomProfileItem(data: any, loaderData: any) {
    return (
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
    )
}