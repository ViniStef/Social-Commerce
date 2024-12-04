import RegisterArea from "~/components/RegisterArea";
import {createContext, Dispatch, SetStateAction, useState} from "react";
import {validateAction} from "~/utils/utils";
import {ActionFunctionArgs, MetaFunction, redirect} from "@remix-run/node";
import {InitialRegister, initialRegisterSchema, FinalRegister, finalRegisterSchema} from "~/routes/register/schemas";
import {emailAvailability} from "~/routes/register/requests";
import {ZodSchema} from "zod";
import {registerUser} from "~/routes/register/requests";
import DeveloperSocials from "~/components/DeveloperSocials";

type InitialRegisterContextType = {
    initialRegister: HTMLFormElement | undefined;
    setInitialRegister: Dispatch<SetStateAction<HTMLFormElement | undefined>>;
}

export const InitialRegisterContext = createContext<InitialRegisterContextType>({
    initialRegister: undefined,
    setInitialRegister: () => {
    },
});

export const meta: MetaFunction = () => {
    return [{ title: "Cadastrar - Social Commerce"},
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

export default function RegisterPage() {
    const [initialRegister, setInitialRegister] = useState<HTMLFormElement | undefined>();

    return (
        <>
            <InitialRegisterContext.Provider value={{initialRegister, setInitialRegister}} >
                <RegisterArea/>
                <DeveloperSocials />
            </InitialRegisterContext.Provider>
        </>

    )
}

function decideSchema(action: FormDataEntryValue): ZodSchema {
    if (action === "next_step") {
        return initialRegisterSchema;
    } else if (action === "register") {
        return finalRegisterSchema;
    }
    return initialRegisterSchema;
}

export async function action({request}: ActionFunctionArgs) {
    const body = Object.fromEntries(await request.formData());
    const { _action } = body;

    switch (_action) {
        case "next_step": {
            const {formData, errors} = validateAction<InitialRegister>(body, decideSchema(_action));

            if (errors) {
                return {ok: false, formValidationError: errors};
            }

            const emailAvailabilityResponse = await emailAvailability(formData as InitialRegister);

            return {emailResponse: {isEmailUsed: false}, email: formData.email, account: formData.account};

        }
        case "register": {
            const {formData, errors} = validateAction<FinalRegister>(body, decideSchema(_action));
            if (errors) {
                return {ok: false, "errors": errors};
            }
            const { account } = formData;
            const data = await registerUser(account, formData as FinalRegister);
            if (data.registerStatus === 201) {
                return redirect("/login");
            }
            return redirect("/login");

            // return {ok: false, data, account};
        }
        default:
            return {error: "Ação inválida"};
    }

}

