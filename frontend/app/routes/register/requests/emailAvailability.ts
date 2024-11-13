import {InitialRegister} from "~/routes/register/schemas/initialRegisterSchema";
import {json} from "@remix-run/react";
import {TypedResponse} from "@remix-run/node";

export async function emailAvailability(formData: InitialRegister): Promise<Boolean | TypedResponse<{"erro": any, "message": string}>>   {
    const { account, email } = formData as InitialRegister;

    try {
        const response: Response = await fetch("http://localhost:8080/register?" +
            new URLSearchParams({
                type: account,
                email: email
            }), {
            method: "GET",
        })

        return await response.json();

    } catch (error) {
        return json({"message": "Algo deu errado no servidor", "erro": error}, 500);
    }
}