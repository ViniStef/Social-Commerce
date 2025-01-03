import {LoginArea} from "~/components/LoginArea";
import {z} from "zod";
import {ActionFunctionArgs, redirect, TypedResponse} from "@remix-run/node";
import {validateAction} from "~/utils/utils";
import {json} from "@remix-run/react";
import axios from "axios";
import { commitSession, getSession} from "~/auth";

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

    const session = await getSession(
        request.headers.get("Cookie")
    )

    if (_action == "login") {
        console.log("oii2: ", errors);
        if (errors) {
            return {"errors": errors};
        }
        const response = await tryLoginUser(formData);
        const data = await response.json();

        if (data.invalid === true) {
            return {"invalid": true};
        }

        if (data?.userId && data?.userAccountType) {
            session.set( "userId", data.userId);
            session.set( "accountType", data.userAccountType);

            if(data.userAccountType == "buyer"){
                return redirect("/buyer", {
                    headers: {
                        "Set-Cookie": await commitSession(session),
                    },
                })
            } else {
                return redirect("/seller", {
                    headers: {
                        "Set-Cookie": await commitSession(session),
                    },
                })
            }

        } else if (data?.message) {
            return {"notFound": data.message};
        }

    }

    return {"error": "Algo inesperado aconteceu"};
}

export type LoginResponse = {
    userId?: string;
    userAccountType?: string;
    message?: string;
    invalid?: boolean;
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

        if (response.data === false) {
            return json({invalid: true});
        }

        const { userId, accountType } = response.data;

        return json({ userId, userAccountType: accountType });

    } catch (error) {
        console.log("Teste error: ", error);
        return json(
            { message: `Erro interno no servidor: ${error}` },
            { status: 500 }
        );
    }
}