import style from "./style.module.scss";
import {Dispatch, JSX, SetStateAction, useContext} from "react";
import {CurrentUserContext} from "~/routes/register";

interface receivedProps {
    account: string;
    isAccountTypeSelected: boolean;
    setIsAccountTypeSelected: Dispatch<SetStateAction<boolean>>
}

export const RoleContainer = ( {account, isAccountTypeSelected, setIsAccountTypeSelected}: receivedProps): JSX.Element => {
    const { setCurrentUser } = useContext(CurrentUserContext);

    const setAccountType = ((accountType: string) => {
        setIsAccountTypeSelected(true);
        setCurrentUser(prevState => {
            return {...prevState, account: accountType};
        })
    })

    return (
        <div className={isAccountTypeSelected ? style.role__container : `${style.role__container} ${style.container__error}`}>
            <div className={style.role__choice}>
                <input onChange={(e) => setAccountType(e.target.value)} className={style.choice__input} value={account} type="radio" id={`choice__${account}`}
                       name={"account"}/>
                <div className={style.choice__indication}>
                    <label className={style.indication__label} htmlFor={`choice__${account}`}></label>
                </div>
            </div>
            <label htmlFor={`choice__${account}`} className={style.role__description}>{ account === "buyer" ? "Sou um Comprador" : "Sou um Vendedor" }</label>
        </div>
    )
}