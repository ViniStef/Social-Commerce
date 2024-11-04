import {Form} from "@remix-run/react";
import style from "./style.module.css";

export default function RegisterInitialForm() {

    return (
        <>
            <Form method={"post"}>
                <div>
                    <label htmlFor="">Sou um comprador</label>
                    <input name={"account"} value={"buyer"} className={style.test__class} type="radio"/>

                    <label htmlFor="">Sou um vendedor</label>
                    <input name={"account"} value={"seller"} type="radio"/>

                    <label htmlFor="">Email</label>
                    <input name={"email"} type="email"/>

                    <button type={"submit"}>Enviar</button>
                </div>

            </Form>
        </>
    )
}