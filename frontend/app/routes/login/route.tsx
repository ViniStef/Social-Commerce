import {LoginArea} from "~/components/LoginArea";
import {ActionFunctionArgs, MetaFunction, redirect} from "@remix-run/node";
import {validateAction} from "~/utils/utils";
import { commitSession, getSession} from "~/auth";
import {Login, loginSchema} from "~/routes/login/schemas";
import {tryLoginUser} from "~/routes/login/requests";

export const meta: MetaFunction = () => {
    return [{ title: "Entrar - Social Commerce"},
        {
            name: "description",
            content: "Social Commerce - Uma plataforma para descomplicar o processo de compra e vendas de produtos"
        },
        {
            name: "keywords",
            content: "Ecommerce, Vendas, Compras, Produtos, Promoções, Social Commerce, Smartphones, Tecnologias, Roupas, Televisores, Ofertas"
        }
    ]
}

export default function LoginPage() {
    return (
        <LoginArea />
    );
}

export async function action({request}: ActionFunctionArgs) {
    const body = Object.fromEntries(await request.formData());
    const { formData, errors } = validateAction<Login>(body, loginSchema);
    const { _action } = body;

    const session = await getSession(
        request.headers.get("Cookie")
    )

    if (_action == "login") {
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



