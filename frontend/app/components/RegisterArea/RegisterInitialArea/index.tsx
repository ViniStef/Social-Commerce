import {Form, useSubmit} from "@remix-run/react";
import style from "./style.module.scss";
import {useActionData} from "react-router";
import {RoleContainer} from "~/components/RegisterArea/RegisterInitialArea/RoleContainer";
import {LogoDisplay} from "~/components/LogoDisplay";
import {Dispatch, FormEvent, SetStateAction, useContext, useEffect, useState} from "react";
import {CurrentUserContext} from "~/routes/register";
import {FormData} from "@remix-run/web-fetch";

interface needsAnimation {
    needsAnimation: boolean;
    setNeedsAnimation: Dispatch<SetStateAction<boolean>>;
}

export default function RegisterInitialArea( {needsAnimation, setNeedsAnimation}: needsAnimation) {
    let data = useActionData();
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    const [email, setEmail] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [invalidMessage, setInvalidMessage] = useState("");
    const [isAccountTypeSelected, setIsAccountTypeSelected] = useState(true);

    const submit = useSubmit();

    useEffect(() => {
        if (data === true) {
            setIsValidEmail(false);
            setInvalidMessage("E-mail já está em uso");
        } else if (data === false) {
            setIsValidEmail(true);
        }
    }, [data]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (currentUser) {
            if (currentUser.account && currentUser.email) {
                setIsAccountTypeSelected(true);
                const formData = new FormData(e.currentTarget);
                submit(formData, {method: "post"});
                setNeedsAnimation(false);

            } else {
                if (!currentUser.account) {
                    setIsAccountTypeSelected(false);
                }
                setNeedsAnimation(false);

            }
        } else {
            setIsAccountTypeSelected(false);
        }


    }

    const verifyEmail = (email: string) => {
        if (email.match(/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/)) {
            setIsValidEmail(true);
            setCurrentUser(prevState => {
                return {...prevState, email: email};
            })
        } else {
            if (email.length < 1) {
                setInvalidMessage("Insira um e-mail");
            } else {
                setInvalidMessage("E-mail inválido, tente novamente");
            }

            setIsValidEmail(false);
            setCurrentUser(prevState => {
                return {...prevState, email: ""};
            })
        }
    }


    return (
        <>
            <div className={needsAnimation ? `${style.welcome__container} ${style.animate}` : style.welcome__container}>
                <h1 className={style.welcome__headline}>Olá! Seja Bem Vindo</h1>
                <p className={style.welcome__instruction}>Por favor, selecione uma das seguintes opções para
                    continuar</p>
            </div>
            <Form className={needsAnimation ? `${style.registration__form} ${style.animate}` : style.registration__form} onSubmit={(e) => handleSubmit(e)} method={"post"}>
                <div className={style.registration__roles}>
                    <RoleContainer account={"buyer"} isAccountTypeSelected={isAccountTypeSelected}
                                   setIsAccountTypeSelected={setIsAccountTypeSelected}/>
                    <RoleContainer account={"seller"} isAccountTypeSelected={isAccountTypeSelected}
                                   setIsAccountTypeSelected={setIsAccountTypeSelected}/>
                    {
                        isAccountTypeSelected ? true :
                            <p className={style.invalid__message}>{"Por favor, escolha uma opção"}</p>
                    }
                </div>
                <div className={style.email__container}>
                    <label htmlFor={"email__input"} className={style.sr__only}>E-mail</label>
                    <input name={"email"} onChange={(e) => setEmail(e.target.value)}
                           className={isValidEmail ? `${style.email__input} ${style.standard__input}` : `${style.email__input} ${style.standard__input} ${style.invalid__email}`}
                           id={"email__input"} placeholder={"Insira seu e-mail"} type="text"/>
                    <button type={"submit"} className={style.email__validate}
                            onClick={(e) => verifyEmail(email)}></button>
                    {
                        isValidEmail ? true : <p className={style.invalid__message}>{invalidMessage}</p>

                    }
                </div>

                <button className={style.step__button} onClick={(e) => verifyEmail(email)} type={"submit"}>Próximo Passo<span
                    className={style.arrow__next}></span></button>
                <a className={style.redirect__login}>Já tenho uma conta</a>
            </Form>
        </>

    )
}