import {LoginArea} from "~/components/LoginArea";
import {z} from "zod";
import {ActionFunctionArgs, redirect, TypedResponse} from "@remix-run/node";
import {validateAction} from "~/utils/utils";
import {json} from "@remix-run/react";
import axios from "axios";
import {authCookie} from "~/auth";

export const meta = () => {
    return [{ title: "Entrar - Social Commerce"}]
}

export default function LoginPage() {
    return (
        <LoginArea />
    );
}

const loginSchema = z.object({
    email: z.string({
        required_error: "O campo email precisa existir"
    }).email("Email inválido").min(1, {message: "Email é obrigatório"}),
    password:
        z.string({required_error: "O campo senha deve existir"})
            .min(6, "Senha inválida")
            .max(40, "Senha inválida"),
    _action: z.enum(["next_step", "register", "login"])
});

type Login = z.infer<typeof loginSchema>;

export async function action({request}: ActionFunctionArgs) {
    const body = Object.fromEntries(await request.formData());
    const { formData, errors } = validateAction<Login>(body, loginSchema);
    const { _action } = body;

    if (_action == "login") {
        if (errors) {
            return {"errors": errors};
        }
        const response = await tryLoginUser(formData);
        const data = await response.json();
        console.log(data)
        if (data?.userId && data?.accountType) {
            console.log(data);
            return redirect("/feed", {
                headers: {
                    "Set-Cookie": await authCookie.serialize(data),
                }
            })
        } else if (data?.message) {
            return {"notFound": data.message};
        }
    }
    return {"error": "Algo inesperado aconteceu"};
}

type LoginResponse = {
    userId?: string;
    accountType?: string;
    message?: string;
};

async function tryLoginUser(formData: Login): Promise<TypedResponse<LoginResponse>> {
    const { email, password } = formData;

    try {
        const response = await axios.post("http://localhost:8080/login", {
            email,
            password,
        });

        if (response.status === 404) {
            return json({ message: "Usuário não encontrado" }, { status: 404 });
        }

        const { userId, accountType } = response.data;

        return json({ userId, accountType });

    } catch (error) {
        return json(
            { message: `Erro interno no servidor: ${error}` },
            { status: 500 }
        );
    }
}