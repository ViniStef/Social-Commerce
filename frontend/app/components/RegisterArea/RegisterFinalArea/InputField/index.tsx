import style from "./style.module.scss";
import {Dispatch, SetStateAction, useRef, useState} from "react";

import exclamation from "../../../../assets/images/exclamation-circle.svg";
import {useActionData} from "@remix-run/react";
import {action} from "~/routes/login/route";

interface InputProps {
    setIsAnyInvalid?: Dispatch<SetStateAction<boolean>>;
    isRegisterClicked?: boolean;
    labelText: string;
    autocomplete?: string;
    className: string;
    name: string;
    type?: string;
    id: string;
    placeholder: string;
    password?: string;
    setPassword?: Dispatch<SetStateAction<string>>;
    isConfirmPasswordValid?: boolean;
    setConfirmPassword?: Dispatch<SetStateAction<string>>;
    invalidMessage?: string;
    isAnyLoginFieldInvalid?: boolean;
}

export const InputField = ({ setIsAnyInvalid, isRegisterClicked, labelText, autocomplete="", className, name, type="text", id, placeholder, setPassword, password="",isConfirmPasswordValid=false,setConfirmPassword, invalidMessage="", isAnyLoginFieldInvalid}: InputProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const data = useActionData<typeof action>();

    return (
        <div className={style.field__container}>
            <label className={style.sr__only} htmlFor={id}>{labelText}</label>
            <input ref={inputRef}

                   autoComplete={autocomplete} className={invalidMessage || isAnyLoginFieldInvalid ? `${style.invalid__input} ${style[className]} ${style.standard__input}` : `${style[className]} ${style.standard__input}`} id={id}
                   name={name} type={type} placeholder={placeholder}/>

            {invalidMessage ?
                <div className={style.error__container}>
                    <img onClick={(e) => setShowErrorMessage(prevState => {return !prevState})} onMouseOut={(e) => setShowErrorMessage(prevState => {return !prevState})} onMouseOver={(e) => setShowErrorMessage(prevState => {return !prevState})} className={style.error__icon} src={exclamation}
                         alt={"Informação do Erro"}></img>
                    {showErrorMessage ? <p className={style.error__info}>{invalidMessage}</p> : ""}
                </div>
                : ""}
        </div>
    )

}