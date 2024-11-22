import {InitialRegister} from "~/routes/register/schemas/initialRegisterSchema";
import {json} from "@remix-run/react";
import {TypedResponse} from "@remix-run/node";
import axios, {AxiosError} from "axios";

type EmailAvailabilityResponse = {
    isEmailUsed?: boolean;
    errors?: string;
    emailUsedMessage?: string;
}

export async function emailAvailability(formData: InitialRegister): Promise<EmailAvailabilityResponse>   {
    const { account, email } = formData as InitialRegister;

    console.log("acc:", account, "email:", email);

    try {
        const response = await axios.get("http://localhost:8080/register?", {
            params: {
                type: account,
                email: email,
            }
        })

        console.log("teste aq: ", response.data);

        return {isEmailUsed: response.data};
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log("Status: ", error.status);
            return error.status == 404 ? {emailUsedMessage: "Este email já está em uso"} : { errors: "Erro na conexão com o servidor, tente novamente mais tarde"};

        } else {
            return { errors: "Erro inesperado no servidor" };
        }

    }


}