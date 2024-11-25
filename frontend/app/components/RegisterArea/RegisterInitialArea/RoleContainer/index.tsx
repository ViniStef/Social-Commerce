import style from "./style.module.scss";
import {Dispatch, JSX, SetStateAction, useContext, useEffect} from "react";
import {action} from "~/routes/register/route";
import {useActionData} from "@remix-run/react";

type RoleContainerProps = {
    account:string;
}

export const RoleContainer = ({account}: RoleContainerProps) => {
    const data = useActionData<typeof action>();

    console.log("data aki: ", data);

    return (
        <div className={data?.formValidationError?.account ? `${style.role__container} ${style.container__error}` : style.role__container}>
            <div className={style.role__choice}>
                <input className={style.choice__input} value={account} type="radio" id={`choice__${account}`}
                       name={"account"}/>
                <div className={style.choice__indication}>
                    <label className={style.indication__label} htmlFor={`choice__${account}`}></label>
                </div>
            </div>
            <label htmlFor={`choice__${account}`} className={style.role__description}>{ account === "buyer" ? "Sou um Comprador" : "Sou um Vendedor" }</label>
        </div>
    )
}