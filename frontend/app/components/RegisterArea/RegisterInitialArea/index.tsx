import {Form, useActionData, useSubmit} from "@remix-run/react";
import style from "./style.module.scss";
import {RoleContainer} from "~/components/RegisterArea/RegisterInitialArea/RoleContainer";
import {Dispatch, FormEvent, SetStateAction, useContext, useEffect, useState} from "react";
import {action, InitialRegisterContext} from "~/routes/register/route";
import {FormData} from "@remix-run/web-fetch";

interface needsAnimation {
    needsAnimation: boolean;
    setNeedsAnimation: Dispatch<SetStateAction<boolean>>;
}

export default function RegisterInitialArea( {needsAnimation, setNeedsAnimation}: needsAnimation) {
    const data = useActionData<typeof action>();
    const { initialRegister, setInitialRegister } = useContext(InitialRegisterContext);
    const [email, setEmail] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [invalidMessage, setInvalidMessage] = useState("");
    const [isAccountTypeSelected, setIsAccountTypeSelected] = useState(true);

    const submit = useSubmit();

    useEffect(() => {
        console.log("data aq test", data);
        if (data) {
            if ("errors" in data) {
                const errors = data.errors
                if (errors.errors.email) {
                    setIsValidEmail(false);
                    setInvalidMessage(String(errors.errors.email));
                } else {
                    setIsValidEmail(true);
                    setInvalidMessage("");
                }
            } else if ("message" in data) {
                if (data.message == "Algo deu errado no servidor") {
                    setInvalidMessage("Problema no servidor, por favor tente novamente")
                } else {
                    setInvalidMessage("Este email já está em uso");
                }
                setIsValidEmail(false);
                setNeedsAnimation(true);
            }
        }

        // if (data === false) {
        //
        //     setIsValidEmail(true);
        //     setNeedsAnimation(false);
        // }

    }, [data]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        console.log(Object.fromEntries(formData));

        setInitialRegister(e.currentTarget);
        console.log(formData);

        submit(formData, {"method": "post"})
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
                    <label htmlFor={"email__input"} className={style.sr__only}>Email</label>
                    <input autoComplete={"email"} name={"email"} onChange={(e) => setEmail(e.target.value)}
                           className={isValidEmail ? `${style.email__input} ${style.standard__input}` : `${style.email__input} ${style.standard__input} ${style.invalid__email}`}
                           id={"email__input"} placeholder={"Insira seu email"} type="text"/>
                    <button type={"submit"} className={style.email__validate}></button>
                    {
                        isValidEmail ? true : <p className={style.invalid__message}>{invalidMessage}</p>
                    }
                </div>

                <input type={"hidden"} name={"_action"} value={"next_step"} />
                <button className={style.step__button} type={"submit"}>Próximo Passo<span
                    className={style.arrow__next}></span></button>
                <a className={style.redirect__login}>Já tenho uma conta</a>
            </Form>
        </>

    )
}