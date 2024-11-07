import style from "./style.module.scss";
import {RoleContainer} from "~/components/RegisterArea/RegisterInitialArea/RoleContainer";
import {Form} from "@remix-run/react";
import {Dispatch, FormEvent, SetStateAction} from "react";

interface needsAnimation {
    setNeedsAnimation: Dispatch<SetStateAction<boolean>>;
}

export const RegisterFinalArea = ( {setNeedsAnimation}: needsAnimation) => {

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    const handlePrevAnimation = () => {
        setNeedsAnimation(true);

    }

    return (
        <Form className={style.registration__form} onSubmit={(e) => handleSubmit(e)} method={"post"}>
            <div className={style.registration__fields}>
                <div className={style.field__container}>
                    <label className={style.sr__only} htmlFor={"name"}>Nome</label>
                    <input autoComplete={"name"} className={`${style.name__input} ${style.standard__input}`} id={"name"} name={"name"} type="text" placeholder={"Seu Nome"}/>
                </div>

                <div className={style.field__container}>
                    <label className={style.sr__only} htmlFor={"surname"}>Sobrenome</label>
                    <input autoComplete={"family-name"} className={`${style.surname__input} ${style.standard__input}`} id={"surname"} name={"surname"} type="text" placeholder={"Seu Sobrenome"}/>
                </div>

                <div className={style.field__container}>
                    <label className={style.sr__only} htmlFor={"identifier"}>CPF/CNPJ</label>
                    <input autoComplete={"cpf"} className={`${style.identifier__input} ${style.standard__input}`} id={"identifier"} name={"identifier"} type={"text"} placeholder={"Seu CPF/CNPJ"}/>
                </div>

                <div className={style.field__container}>
                    <label className={style.sr__only} htmlFor={"password"}>Senha</label>
                    <input autoComplete={"new-password"} className={`${style.password__input} ${style.standard__input}`} id={"password"} name={"password"} type="password" placeholder={"Sua Senha"}/>
                </div>

                <div className={style.field__container}>
                    <label className={style.sr__only} htmlFor={"confirmPassword"}>Confirme a Senha</label>
                    <input autoComplete={"new-password"} className={`${style.passwordConfirm__input} ${style.standard__input}`} id={"confirmPassword"} name={"confirmPassword"} type="password" placeholder={"Confirme sua Senha"}/>
                </div>
            </div>

            <button className={style.register__button}>Cadastrar</button>
            <a className={style.redirect__login}>Já tenho uma conta</a>

            <div className={style.return__container}>
                <button className={style.return__button} onClick={(e) => handlePrevAnimation()}>Voltar<span
                    className={style.arrow__next}></span></button>
            </div>
        </Form>
    );

}