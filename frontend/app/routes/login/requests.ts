import {Login} from "~/routes/login/schemas";
import {TypedResponse} from "@remix-run/node";
import {LoginResponse} from "~/routes/login/types";
import axios from "axios";
import {json} from "@remix-run/react";

export async function tryLoginUser(formData: Login): Promise<TypedResponse<LoginResponse>> {
    const { email, password } = formData;

    try {

        const response = await axios.post("http://localhost:8080/login", {
            email,
            password,
        });

        if (response.status === 404) {
            return json({ message: "Usuário não encontrado" }, { status: 404 });
        }

        if (response.data === false) {
            return json({invalid: true});
        }

        const { userId, accountType } = response.data;

        return json({ userId, userAccountType: accountType });

    } catch (error) {
        return json(
            { message: `Erro interno no servidor: ${error}` },
            { status: 500 }
        );
    }
}