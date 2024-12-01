import style from "./style.module.scss";
import {Form} from "@remix-run/react";

type BarItemProps = {
    formClass?: string;
    hiddenInputValue: string;
    barImageUrl: string;
    barImageAlt: string;
    barText: string;
}

export default function BarItem(barItemContents: BarItemProps) {
    return (
        <li key={crypto.randomUUID()} className={style.bar__item}>
            <Form method={"post"} className={barItemContents.formClass}>
                <input type="hidden" name={"_action"} value={barItemContents.hiddenInputValue}/>
                <button className={style.bar__action}>
                    <img className={style.bar__image} src={barItemContents.barImageUrl} alt={barItemContents.barImageAlt}/>
                    <p className={style.bar__text}>{barItemContents.barText}</p>
                </button>
            </Form>
        </li>
    )
}