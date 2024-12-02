
import style from "./styles/style.module.scss";
import {Form} from "@remix-run/react";

type CategoryItemProps = {
    hiddenInputValue: string;
    imageUrl: string;
    imageAlt: string;
    categoryText: string;
    value?: number;
}

export function CategoryItem(categoryProps: CategoryItemProps) {
    return (
        <Form method={"post"}>
            <li key={crypto.randomUUID()} className={style.item__category}>
                <div className={style.category__img_container}>
                    <input type="hidden" name={"_action"} value={categoryProps.hiddenInputValue}/>
                    {categoryProps.value && <input type="hidden" name={"categoryId"} value={categoryProps.value}/>}
                    <button className={`${style.category__button} ${style.category__blue}`}>
                        <img className={style.category__image} src={categoryProps.imageUrl}
                             alt={categoryProps.imageAlt}/>
                    </button>
                </div>
                <p className={style.category__name}>{categoryProps.categoryText}</p>
            </li>
        </Form>
    )
}