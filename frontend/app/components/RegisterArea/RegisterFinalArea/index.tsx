import style from "./style.module.scss";
import {Form, useSubmit} from "@remix-run/react";
import {Dispatch, FormEvent, SetStateAction, useContext, useEffect, useState} from "react";
import {FormData} from "@remix-run/web-fetch";
import {CurrentUserContext, InitialRegisterContext} from "~/routes/register";
import {InputField} from "~/components/RegisterArea/RegisterFinalArea/InputField";

interface needsAnimation {
    setNeedsAnimation: Dispatch<SetStateAction<boolean>>;
}

export const RegisterFinalArea = ({setNeedsAnimation}: needsAnimation) => {
    const {currentUser, setCurrentUser} = useContext(CurrentUserContext);
    const [isRegisterClicked, setIsRegisterClicked] = useState(false);
    const [isAnyInvalid, setIsAnyInvalid] = useState(false);
    const { initialRegister, setInitialRegister } = useContext(InitialRegisterContext);

    const submit = useSubmit();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isAnyInvalid) {
            const formData = new FormData(e.currentTarget);
            if (initialRegister) {
                for (const pair of initialRegister.entries()) {
                    formData.append(pair[0], pair[1]);
                }
            }

            console.log(Object.fromEntries(formData));

            setIsRegisterClicked(true);
            submit(formData, { method: "post" });
        } else {
            setIsRegisterClicked(false);
        }
    };

    const handlePrevAnimation = () => {
        setNeedsAnimation(true);

    }

    return (
        <Form className={style.registration__form} onSubmit={(e) => handleSubmit(e)} method={"post"}>
            <div className={style.registration__fields}>

                <InputField setIsAnyInvalid={setIsAnyInvalid} isRegisterClicked={isRegisterClicked} labelText={"Nome"} autocomplete={"name"} className={"name__input"} name={"name"} id={"name"}
                            placeholder={"Seu nome"}/>

                <InputField setIsAnyInvalid={setIsAnyInvalid} isRegisterClicked={isRegisterClicked} labelText={"Sobrenome"} autocomplete={"family-name"} className={"surname__input"}
                            name={"surname"} id={"surname"} placeholder={"Seu Sobrenome"}/>

                <InputField setIsAnyInvalid={setIsAnyInvalid} isRegisterClicked={isRegisterClicked} labelText={"CPF/CNPJ"} autocomplete={"cpf"} className={"identifier__input"}
                            name={"identifier"} id={"identifier"} placeholder={"Seu CPF/CNPJ"}/>

                <InputField setIsAnyInvalid={setIsAnyInvalid} isRegisterClicked={isRegisterClicked} labelText={"Senha"} autocomplete={"new-password"} className={"password__input"}
                            name={"password"} id={"password"} placeholder={"Sua Senha"} type={"password"}/>

                <InputField setIsAnyInvalid={setIsAnyInvalid} isRegisterClicked={isRegisterClicked} labelText={"Confirme a Senha"} autocomplete={"new-password"}
                            className={"passwordConfirm__input"} name={"confirmPassword"} id={"confirmPassword"}
                            placeholder={"Confirme sua Senha"} type={"password"}/>

            </div>

            <input type="hidden" name={"_action"} value={"register"}/>
            <button type={"submit"} aria-label={"cadastrar"} className={style.register__button}>Cadastrar</button>
            <a className={style.redirect__login}>Já tenho uma conta</a>

            <div className={style.return__container}>
                <button type={"button"} aria-label={"voltar"} className={style.return__button} onClick={(e) => handlePrevAnimation()}>Voltar<span
                    className={style.arrow__next}></span></button>
            </div>
        </Form>
    );

}