import style from "./style.module.scss";
import {Form, useActionData, useSubmit} from "@remix-run/react";
import {Dispatch, FormEvent, SetStateAction, useContext, useEffect, useState} from "react";
import {FormData} from "@remix-run/web-fetch";
import {action, CurrentUserContext, InitialRegisterContext} from "~/routes/register";
import {InputField} from "~/components/RegisterArea/RegisterFinalArea/InputField";

interface needsAnimation {
    setNeedsAnimation: Dispatch<SetStateAction<boolean>>;
}

export const RegisterFinalArea = ({setNeedsAnimation}: needsAnimation) => {
    const data = useActionData<typeof action>();
    const {currentUser, setCurrentUser} = useContext(CurrentUserContext);
    const [isRegisterClicked, setIsRegisterClicked] = useState(false);
    const [isAnyInvalid, setIsAnyInvalid] = useState(false);
    const { initialRegister, setInitialRegister } = useContext(InitialRegisterContext);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);

    const [invalidFirstNameMessage, setInvalidFirstNameMessage] = useState("");
    const [invalidLastNameMessage, setInvalidLastNameMessage] = useState("");
    const [invalidIdentifierMessage, setInvalidIdentifierMessage] = useState("");
    const [invalidPasswordMessage, setInvalidPasswordMessage] = useState("");
    const [invalidConfirmPasswordMessage, setInvalidConfirmPasswordMessage] = useState("");

    useEffect(() => {
        if (data) {
            const expectedFields = new Set(['first_name', 'last_name', 'identifier', 'password', 'confirm_password']);
            if ("errors" in data) {
                for (const key in data.errors.errors) {
                    switch (key) {
                        case 'first_name':
                            setInvalidFirstNameMessage(data.errors.errors[key]);
                            expectedFields.delete("first_name");
                            break;
                        case 'last_name':
                            setInvalidLastNameMessage(data.errors.errors[key]);
                            expectedFields.delete("last_name");
                            break;
                        case 'identifier':
                            setInvalidIdentifierMessage(data.errors.errors[key]);
                            expectedFields.delete("identifier");
                            break;
                        case 'password':
                            setInvalidPasswordMessage(data.errors.errors[key]);
                            expectedFields.delete("password");
                            break;
                        case 'confirm_password':
                            setInvalidConfirmPasswordMessage(data.errors.errors[key]);
                            expectedFields.delete("confirm_password");
                            break;
                    }

                }
            }

            if (expectedFields.size > 0) {
                for (const missingField of expectedFields) {
                    switch (missingField) {
                        case 'first_name':
                            setInvalidFirstNameMessage("");
                            break;
                        case 'last_name':
                            setInvalidLastNameMessage("");
                            break;
                        case 'identifier':
                            setInvalidIdentifierMessage("");
                            break;
                        case 'password':
                            setInvalidPasswordMessage("");
                            break;
                        case 'confirm_password':
                            setInvalidConfirmPasswordMessage("");
                            break;
                    }
                }
            }
        }

        console.log(data);
        // if (data === true) {
        //
        //     setIsValidEmail(false);
        //     setInvalidMessage("E-mail já está em uso");
        // } else if (data === false) {
        //     setIsValidEmail(true);
        //     setNeedsAnimation(true);
        // }

    }, [data]);

    useEffect(() => {
        if (confirmPassword) {
            setIsConfirmPasswordValid(password === confirmPassword);
        }
        console.log("password2: ", password);
        console.log("confirmPassword2: ", confirmPassword);
        console.log("true false: ", confirmPassword === password);
        console.log("isConfirmPasswordValid: ", isConfirmPasswordValid);

    }, [password, confirmPassword]);

    const submit = useSubmit();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        if (initialRegister) {
            for (const pair of initialRegister.entries()) {
                formData.append(pair[0], pair[1]);
            }
        }

        console.log(Object.fromEntries(formData));

        setIsRegisterClicked(true);
        submit(formData, { method: "post" });
    };

    const handlePrevAnimation = () => {
        setNeedsAnimation(true);

    }

    return (
        <Form className={style.registration__form} onSubmit={(e) => handleSubmit(e)} method={"post"}>
            <div className={style.registration__fields}>

                <InputField invalidMessage={invalidFirstNameMessage} setIsAnyInvalid={setIsAnyInvalid} isRegisterClicked={isRegisterClicked} labelText={"Nome"} autocomplete={"name"} className={"name__input"} name={"first_name"} id={"first_name"}
                            placeholder={"Seu nome"}/>

                <InputField invalidMessage={invalidLastNameMessage} setIsAnyInvalid={setIsAnyInvalid} isRegisterClicked={isRegisterClicked} labelText={"Sobrenome"} autocomplete={"family-name"} className={"surname__input"}
                            name={"last_name"} id={"last_name"} placeholder={"Seu Sobrenome"}/>

                <InputField invalidMessage={invalidIdentifierMessage} setIsAnyInvalid={setIsAnyInvalid} isRegisterClicked={isRegisterClicked} labelText={"CPF/CNPJ"} autocomplete={"cpf"} className={"identifier__input"}
                            name={"identifier"} id={"identifier"} placeholder={"Seu CPF/CNPJ"}/>

                <InputField invalidMessage={invalidPasswordMessage} setPassword={setPassword} setIsAnyInvalid={setIsAnyInvalid} isRegisterClicked={isRegisterClicked} labelText={"Senha"} autocomplete={"new-password"} className={"password__input"}
                            name={"password"} id={"password"} placeholder={"Sua Senha"} type={"password"}/>

                <InputField invalidMessage={invalidConfirmPasswordMessage} isConfirmPasswordValid={isConfirmPasswordValid} setConfirmPassword={setConfirmPassword} password={password} setIsAnyInvalid={setIsAnyInvalid} isRegisterClicked={isRegisterClicked} labelText={"Confirme a Senha"} autocomplete={"new-password"}
                            className={"passwordConfirm__input"} name={"confirm_password"} id={"confirm_password"}
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