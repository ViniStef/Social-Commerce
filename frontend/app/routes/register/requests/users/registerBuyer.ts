import {FinalRegister} from "~/routes/register/schemas/finalRegisterSchema";
import axios from "axios";
import {redirect} from "@remix-run/node";
import {json} from "@remix-run/react";

export async function registerBuyer(formData: FinalRegister) {
    const { first_name, last_name, identifier, password, confirm_password, email } = formData;
    await axios.post("http://localhost:8080/buyer/create", {
        first_name: first_name,
        last_name: last_name,
        cpf: parseInt(identifier),
        password: password,
        confirm_password: confirm_password,
        email: email,
    }).then(response => {
        if (response.status === 201) {
            redirect("/login");
        }
        return response.status;
    }).catch(error => {
        return json({"message": `Erro interno no servidor:  ${error}`, "status": 500});
    })

}
