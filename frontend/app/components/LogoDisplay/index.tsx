import style from "./style.module.scss";
import logo from "~/assets/icons/social-commerce-logo.svg";

export const LogoDisplay = () => {
    return (
        <div className={style.company__container}>
            <img className={style.company__logo} src={logo} alt="Social Commerce Logo"/>
            <h1 className={style.company__headline}>Social Commerce</h1>
        </div>
    )
}