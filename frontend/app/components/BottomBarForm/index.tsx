import style from "~/styles/style.module.scss";
import {Form} from "@remix-run/react";

type BottomBarFormProps = {
    hiddenInputValue: string;
    imageUrl: string;
    imageAlt: string;
    isScrollButton?: boolean;
    count?: number;
}

function scrollToTop() {
    document.body.scrollTo(0, 0); // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

export function BottomBarForm(bottomBarItems: BottomBarFormProps) {
    return (
        <Form className={style.feature__form} method={"post"}>
            <input type="hidden" name={"_action"} value={bottomBarItems.hiddenInputValue}/>
            <div className={style.feature__item}>
                {!bottomBarItems.isScrollButton &&
                    <input type="hidden" name={"_action"} value={bottomBarItems.hiddenInputValue}/>}
                <button className={style.feaure__action} onClick={() => {
                    bottomBarItems.isScrollButton && scrollToTop()
                }}>
                    {bottomBarItems.count && <span className={style.desire_span}>{bottomBarItems.count}</span>}
                    <img className={style.action__image} src={bottomBarItems.imageUrl}
                         alt={bottomBarItems.imageAlt}/>
                </button>
            </div>
        </Form>
    )
}