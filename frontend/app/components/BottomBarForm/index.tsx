import style from "*.module.scss";
import {Form} from "@remix-run/react";

type BottomBarFormProps = {
    hiddenInputValue: string;
    imageUrl: string;
    imageAlt: string;
}

export function BottomBarForm(bottomBarItems: BottomBarFormProps) {
    return (
        <Form className={style.feature__form} method={"post"}>
            <input type="hidden" name={"_action"} value={bottomBarItems.hiddenInputValue}/>
            <div className={style.feature__item}>
                <button className={style.feature__action}>
                    <img className={style.action__image} src={bottomBarItems.imageUrl}
                         alt={bottomBarItems.imageAlt}/>
                </button>
            </div>
        </Form>
    )
}