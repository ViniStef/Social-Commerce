import style from "./style.module.scss";
import {Form} from "@remix-run/react";

type BarItemProps = {
    formClass?: string;
    hiddenInputValue: string;
    barImageUrl: string;
    barImageAlt: string;
    barText: string;
    isScrollButton?: boolean;
    count?: number;
}

function scrollToTop() {
    document.body.scrollTo(0, 0); // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

export default function BarItem(barItemContents: BarItemProps) {
    return (
        <li key={crypto.randomUUID()} className={style.bar__item}>
            <Form method={"post"} className={`${barItemContents.formClass && style[barItemContents.formClass]}`}>
                {!barItemContents.isScrollButton &&
                    <input type="hidden" name={"_action"} value={barItemContents.hiddenInputValue}/>}
                <button className={style.bar__action} onClick={() => {
                    barItemContents.isScrollButton && scrollToTop()}}>
                    <div style={
                        {
                            position: "relative"
                        }
                    }>
                        {barItemContents.count == 0 ? <span className={style.desire_span}>{barItemContents.count}</span> : ""}
                        <img className={style.bar__image} src={barItemContents.barImageUrl} alt={barItemContents.barImageAlt}/>
                    </div>
                    <p className={style.bar__text}>{barItemContents.barText}</p>
                </button>
            </Form>
        </li>
    )
}