import {FinalRegister} from "~/routes/register/schemas/finalRegisterSchema";
import axios from "axios";
import {redirect, TypedResponse} from "@remix-run/node";
import {json} from "@remix-run/react";

export async function registerBuyer(formData: FinalRegister): Promise<number | {"message": string, "status": number}> {
    const { first_name, last_name, identifier, password, confirm_password, email } = formData;
    return await axios.post("http://localhost:8080/buyer/create", {
        first_name: first_name,
        last_name: last_name,
        cpf: parseInt(identifier),
        password: password,
        confirm_password: confirm_password,
        email: email,
    }).then(response => {
        return response.status;
    }).catch(error => {
        return {"message": `Erro interno no servidor:  ${error}`, "status": 500};
    })

}
