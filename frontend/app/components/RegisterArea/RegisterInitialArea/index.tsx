import {Form, Link, useActionData, useSubmit} from "@remix-run/react";
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
    const submit = useSubmit();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        console.log(e.currentTarget);
        setInitialRegister(e.currentTarget);

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
                    <RoleContainer account={"buyer"}
                                   />
                    <RoleContainer account={"seller"}
                                   />

                    {data?.formValidationError?.account && <p className={style.invalid__message}>{"Por favor, escolha uma opção"}
                </p>
                }

                </div>
                <div className={style.email__container}>
                    <label htmlFor={"email__input"} className={style.sr__only}>Email</label>
                    <input
                        autoComplete={"email"} name={"email"}
                           className={
                               (data?.formValidationError?.email || data?.emailResponse?.errors || data?.emailResponse?.emailUsedMessage) ?
                            `${style.email__input} ${style.standard__input} ${style.invalid__email}`
                            : `${style.email__input} ${style.standard__input}`
                    }

                           id={"email__input"} placeholder={"Insira seu email"} type="text"/>
                    <button type={"submit"} className={style.email__validate}></button>

                    {data?.emailResponse?.emailUsedMessage && <p className={style.invalid__message}>{data.emailResponse.emailUsedMessage}</p>}
                    {data?.formValidationError?.email && <p className={style.invalid__message}>{data.formValidationError.email}</p>}
                    {data?.emailResponse?.errors && <p className={style.invalid__message}>{data.emailResponse.errors}</p>}

                </div>

                <input type={"hidden"} name={"_action"} value={"next_step"} />
                <button className={style.step__button} type={"submit"}>Próximo Passo<span
                    className={style.arrow__next}></span></button>
                <Link to={"/login"} className={style.redirect__login}>Já tenho uma conta</Link>
            </Form>
        </>

    )
}