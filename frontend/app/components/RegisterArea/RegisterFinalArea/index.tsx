import style from "./style.module.scss";
import {Form, Link, useActionData, useSubmit} from "@remix-run/react";
import {Dispatch, FormEvent, SetStateAction, useContext, useEffect, useState} from "react";
import {FormData} from "@remix-run/web-fetch";
import {action, InitialRegisterContext} from "~/routes/register/route";
import {InputField} from "~/components/RegisterArea/RegisterFinalArea/InputField";
import {TypedResponse} from "@remix-run/node";

interface needsAnimation {
    setNeedsAnimation: Dispatch<SetStateAction<boolean>>;
}

type DataResponses<T extends string | number | symbol = string> = {
    response: Promise<boolean | TypedResponse<any>>;
    errors: { errors: Record<T, string> };
};

export const RegisterFinalArea = ({setNeedsAnimation}: needsAnimation) => {
    const data = useActionData<typeof action>();
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

    // useEffect(() => {
    //     if (data) {
    //         const expectedFields = new Set(['first_name', 'last_name', 'identifier', 'password', 'confirm_password']);
    //         if ("errors" in data) {
    //             for (const key in data.errors.errors) {
    //                 switch (key) {
    //                     case 'first_name':
    //                         setInvalidFirstNameMessage(data.errors.errors[key]);
    //                         expectedFields.delete("first_name");
    //                         break;
    //                     case 'last_name':
    //                         setInvalidLastNameMessage(data.errors.errors[key]);
    //                         expectedFields.delete("last_name");
    //                         break;
    //                     case 'identifier':
    //                         setInvalidIdentifierMessage(data.errors.errors[key]);
    //                         expectedFields.delete("identifier");
    //                         break;
    //                     case 'password':
    //                         setInvalidPasswordMessage(data.errors.errors[key]);
    //                         expectedFields.delete("password");
    //                         break;
    //                     case 'confirm_password':
    //                         setInvalidConfirmPasswordMessage(data.errors.errors[key]);
    //                         expectedFields.delete("confirm_password");
    //                         break;
    //                 }
    //
    //             }
    //         }
    //
    //         if (expectedFields.size > 0) {
    //             for (const missingField of expectedFields) {
    //                 switch (missingField) {
    //                     case 'first_name':
    //                         setInvalidFirstNameMessage("");
    //                         break;
    //                     case 'last_name':
    //                         setInvalidLastNameMessage("");
    //                         break;
    //                     case 'identifier':
    //                         setInvalidIdentifierMessage("");
    //                         break;
    //                     case 'password':
    //                         setInvalidPasswordMessage("");
    //                         break;
    //                     case 'confirm_password':
    //                         setInvalidConfirmPasswordMessage("");
    //                         break;
    //                 }
    //             }
    //         }
    //     }
    //
    //     console.log(data);
    //     // if (data === true) {
    //     //
    //     //     setIsValidEmail(false);
    //     //     setInvalidMessage("E-mail já está em uso");
    //     // } else if (data === false) {
    //     //     setIsValidEmail(true);
    //     //     setNeedsAnimation(true);
    //     // }
    //
    // }, [data]);

    useEffect(() => {
        console.log(initialRegister);
    }, [initialRegister]);

    const submit = useSubmit();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        console.log(Object.fromEntries(formData));


        const initialRegisterData = new FormData(initialRegister);
        console.log(Object.fromEntries(initialRegisterData));
        if (initialRegister) {
            const initialRegisterObject = Object.fromEntries(initialRegisterData);
            const keys = Object.keys(initialRegisterObject);
            console.log("Chaves:", keys);
            // console.log();
            for (const pair of Object.entries(initialRegisterObject)) {
                console.log(pair);
                if (!(pair[0] == "_action")) {
                    formData.append(pair[0], pair[1]);
                }
            }
        }
        if (initialRegister) {
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

                <InputField invalidMessage={data?.errors && data.errors.first_name} setIsAnyInvalid={setIsAnyInvalid} isRegisterClicked={isRegisterClicked} labelText={"Nome"} autocomplete={"given-name"} className={"name__input"} name={"first_name"} id={"first_name"}
                            placeholder={"Seu nome"}/>

                <InputField invalidMessage={data?.errors && data.errors.last_name} setIsAnyInvalid={setIsAnyInvalid} isRegisterClicked={isRegisterClicked} labelText={"Sobrenome"} autocomplete={"family-name"} className={"surname__input"}
                            name={"last_name"} id={"last_name"} placeholder={"Seu Sobrenome"}/>

                <InputField invalidMessage={data?.errors && data.errors.identifier} setIsAnyInvalid={setIsAnyInvalid} isRegisterClicked={isRegisterClicked} labelText={"CPF/CNPJ"} autocomplete={"cpf"} className={"identifier__input"}
                            name={"identifier"} id={"identifier"} placeholder={"Seu CPF/CNPJ"}/>

                <InputField invalidMessage={data?.errors && data.errors.password} setPassword={setPassword} setIsAnyInvalid={setIsAnyInvalid} isRegisterClicked={isRegisterClicked} labelText={"Senha"} autocomplete={"new-password"} className={"password__input"}
                            name={"password"} id={"password"} placeholder={"Sua Senha"} type={"password"}/>

                <InputField invalidMessage={data?.errors && data.errors.confirm_password} isConfirmPasswordValid={isConfirmPasswordValid} setConfirmPassword={setConfirmPassword} password={password} setIsAnyInvalid={setIsAnyInvalid} isRegisterClicked={isRegisterClicked} labelText={"Confirme a Senha"} autocomplete={"new-password"}
                            className={"passwordConfirm__input"} name={"confirm_password"} id={"confirm_password"}
                            placeholder={"Confirme sua Senha"} type={"password"}/>

            </div>

            <input type="hidden" name={"_action"} value={"register"}/>
            <button type={"submit"} aria-label={"cadastrar"} className={style.register__button}>Cadastrar</button>
            <Link to={"/login"} className={style.redirect__login}>Já tenho uma conta</Link>

            <div className={style.return__container}>
                <button type={"button"} aria-label={"voltar"} className={style.return__button} onClick={(e) => handlePrevAnimation()}>Voltar<span
                    className={style.arrow__next}></span></button>
            </div>
        </Form>
    );

}