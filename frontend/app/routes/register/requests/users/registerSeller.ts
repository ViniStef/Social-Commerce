import axios from "axios";
import {redirect, TypedResponse} from "@remix-run/node";
import {json} from "@remix-run/react";
import {FinalRegister} from "~/routes/register/schemas/finalRegisterSchema";

export type RegisterSellerResponse = {
    registerStatus?: number;
    message?: string;
    error?: string;
}

export async function registerSeller(formData: FinalRegister): Promise<RegisterSellerResponse> {
    const { first_name, last_name, identifier, password, confirm_password, email } = formData;

    try {
        const result = await axios.post("http://localhost:8080/seller/create", {
            first_name: first_name,
            last_name: last_name,
            cnpj: parseInt(identifier),
            password: password,
            confirm_password: confirm_password,
            email: email,
        })

        return {registerStatus: result.status};
    } catch(error) {
        return {message: `Erro interno no servidor:  ${error}`};

    }

}

