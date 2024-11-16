import {LoginArea} from "~/components/LoginArea";
import {z} from "zod";
import {ActionFunctionArgs, redirect} from "@remix-run/node";
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
            return json({errors: {errors}});
        }

        const { email, password } = formData as Login;
        if (errors) {
            return json({errors: {errors}});
        }

       const data = await loginResponse(formData);

        if(data){
            return redirect("/feed", {
                headers: {
                    "Set-Cookie": await authCookie.serialize(data),
                }
            })
        }

        return json({"message": "Erro desconhecido"});
    }
}


async function loginResponse (formData:Login){
    const { email, password } = formData as Login;

    await axios.post("http://localhost:8080/login", {
        email: email,
        password: password,
    }).then(response => {
        if (response.status === 404) {
            return json({"message": "Usuário não encontrado"});
        }

        const userAccountId = response.data.userId;
        const userAccountType = response.data.accountType;
        const cookieData = { userAccountId, userAccountType };

        return cookieData;
    }).catch(error => {
        return json({"message": `Erro interno no servidor:  ${error}`, "status": 500});
    })

    return json({"message": "Erro desconhecido"});
}