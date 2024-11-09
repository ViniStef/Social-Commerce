import style from "./style.module.scss";
import {Dispatch, SetStateAction, useContext, useEffect, useRef, useState} from "react";
import {CurrentUserContext} from "~/routes/register";
import exclamation from "../../../../assets/images/exclamation-circle.svg";

interface InputProps {
    setIsAnyInvalid: Dispatch<SetStateAction<boolean>>;
    isRegisterClicked: boolean;
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
}

export const InputField = ({ setIsAnyInvalid, isRegisterClicked, labelText, autocomplete="", className, name, type="text", id, placeholder, setPassword, password="",isConfirmPasswordValid=false,setConfirmPassword, invalidMessage=""}: InputProps) => {
    const {currentUser, setCurrentUser} = useContext(CurrentUserContext);
    const inputRef = useRef<HTMLInputElement>(null);
    const [selfInvalid, setSelfInvalid] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    // useEffect(() => {
    //     if (isRegisterClicked && inputRef.current) {
    //         if (!isValidField(name, inputRef.current.value)) {
    //             setIsAnyInvalid(true);
    //             setSelfInvalid(true);
    //         } else {
    //             setSelfInvalid(false);
    //         }
    //     }
    //
    // }, [isRegisterClicked])



    const isValidField = (field: string, value: string): boolean => {
        value.trim();
        switch (field) {
            case "name":
                if (value.match(/^[a-zA-Z]{2,}$/)) {
                    return true;
                }
                return false;
            case "surname":
                if (value.match(/^[a-zA-Z\s]{2,}$/)) {
                    return true;
                }
                return false;
            case "identifier":
                if (value.match(/^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2} | [0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}-?[0-9]{2})$/)) {
                    return true;
                }
                return false;
            case "password":
                if (value.match(/^[a-zA-Z\d]{6,}$/)) {
                    if (setPassword) {
                        setPassword(value);
                        return true;
                    }
                    return false;
                }

                return false;
            case "confirmPassword":
                if (setConfirmPassword) {
                    setConfirmPassword(value);
                }
                return false;

        }

        return false;

    }

    return (
        <div className={style.field__container}>
            <label className={style.sr__only} htmlFor={id}>{labelText}</label>
            <input ref={inputRef} autoComplete={autocomplete} className={invalidMessage ? `${style[className]} ${style.standard__input} ${style.invalid__input}`  :`${style[className]} ${style.standard__input}`} id={id}
                   name={name} type={type} placeholder={placeholder}/>

            {invalidMessage ?
                <div className={style.error__container}>
                    <img onMouseOut={(e) => setShowErrorMessage(prevState => {return !prevState})} onMouseOver={(e) => setShowErrorMessage(prevState => {return !prevState})} className={style.error__icon} src={exclamation}
                         alt={"Informação do Erro"}></img>
                    {showErrorMessage ? <p className={style.error__info}>{invalidMessage}</p> : ""}
                </div>
                : ""}
        </div>
    )

}