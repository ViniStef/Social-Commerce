import style from "./style.module.scss";
import {LogoDisplay} from "~/components/LogoDisplay";
import {Form, Link, useActionData} from "@remix-run/react";
import {InputField} from "~/components/RegisterArea/RegisterFinalArea/InputField";
import {useEffect, useState} from "react";
import {action} from "~/routes/login";
import DeveloperSocials from "~/components/DeveloperSocials";

export const LoginArea = () => {
    const [isAnyLoginFieldInvalid, setIsAnyLoginFieldInvalid] = useState<boolean>(false);
    const [invalidMessage, setInvalidMessage] = useState("");
    const data = useActionData<typeof action>();

    const anyFieldInvalid = !!data?.errors || !!data?.notFound || !!data?.invalid;

    console.log("Valor de teste aq: ", anyFieldInvalid);

    // useEffect(() => {
    //     if (data) {
    //         if ("errors" in data) {
    //             const errorsMsg = data.errors.errors;
    //             if (errorsMsg.email == "Email inválido" || errorsMsg.password == "Senha inválida") {
    //                 setInvalidMessage("Credenciais inválidas");
    //                 setIsAnyLoginFieldInvalid(true);
    //             }
    //         } else if ("message" in data) {
    //             if (data.message == "Usuário não encontrado") {
    //                 setInvalidMessage(data.message);
    //                 setIsAnyLoginFieldInvalid(true);
    //             }
    //         }
    //     }
    //
    //
    // }, [data]);

    return (
        <main className={style.main__page}>
            <DeveloperSocials />
            <div className={style.register__container}>
                <LogoDisplay />
                <Form className={style.login__form} method={"post"}>
                    <h1 className={style.login__header}>Entre em sua conta</h1>
                    <div className={style.credentials__container}>

                        <InputField type={"text"} autocomplete={"email"} isAnyLoginFieldInvalid={anyFieldInvalid}
                                    labelText={"Email"} className={"login__email"} name={"email"} id={"login__email"}
                                    placeholder={"Insira seu e-mail"}/>
                        <InputField autocomplete={"new-password"} isAnyLoginFieldInvalid={anyFieldInvalid}
                                    labelText={"Senha"} className={"login__password"} name={"password"}
                                    id={"login__password"} placeholder={"Insira sua senha"} type={"password"}/>


                        {data?.notFound && <p className={style.invalid__message}>Usuário não encontrado</p>}
                        {(data?.errors || data?.invalid) && <p className={style.invalid__message}>Credenciais inválidas</p>}
                    </div>


                    <input type="hidden" name={"_action"} value={"login"}/>
                    <button type={"submit"} aria-label={"entrar"} className={style.login__button}>Entrar
                    </button>
                    <Link to={"/register"} className={style.redirect__register}>Ainda não sou cadastrado</Link>
                </Form>
            </div>
        </main>
    );
}

