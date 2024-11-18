import {InitialRegister} from "~/routes/register/schemas/initialRegisterSchema";
import {json} from "@remix-run/react";
import {TypedResponse} from "@remix-run/node";
import axios, {AxiosError} from "axios";

type EmailAvailabilityResponse = {
    isEmailUsed?: boolean;
    errors?: string;
}

export async function emailAvailability(formData: InitialRegister): Promise<EmailAvailabilityResponse>   {
    const { account, email } = formData as InitialRegister;

    try {
        const response = await axios.get("http://localhost:8080/register?", {
            params: {
                type: account,
                email: email,
            }
        })

        return {isEmailUsed: response.data};
    } catch (error) {
        if (error instanceof AxiosError) {
            return { errors: "Erro na conexão com o servidor, tente novamente mais tarde"};

        } else {
            return { errors: "Erro inesperado no servidor" };
        }

    }


}