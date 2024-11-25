import style from "~/components/CreatePublicationDisplay/style.module.scss";
import plus from "~/assets/icons/plus-circle.svg";
import {Form} from "@remix-run/react";

export default function CreatePublicationPlaceholder() {
    return(
        <section className={style.nocontent__container}>
            <div className={style.nocontent__text}>
                <p className={style.nocontent__headline}>
                    Crie uma publicação
                </p>
            </div>
            <img className={style.nocontent__image} src={plus} alt="Logo"/>
            <Form className={style.nocontent__create} method={"post"}>
                <input type="hidden" name={"_action"} value={"start_creating_publication"}/>
                <button className={style.create__btn}><img className={style.create__img} src={plus} alt=""/></button>
            </Form>
        </section>
)
}