import RegisterArea from "~/components/RegisterArea";
import {createContext, Dispatch, SetStateAction, useState} from "react";
import {json} from "@remix-run/react";
import {validateAction} from "~/utils/utils";
import {ActionFunctionArgs} from "@remix-run/node";
import {InitialRegister, initialRegisterSchema} from "~/routes/register/schemas/initialRegisterSchema";
import {FinalRegister, finalRegisterSchema} from "~/routes/register/schemas/finalRegisterSchema";
import {emailAvailability} from "~/routes/register/requests/emailAvailability";
import {ZodSchema} from "zod";
import {registerUser} from "~/routes/register/requests/users/registerUser";

interface InitialRegisterContextType {
    initialRegister: HTMLFormElement | undefined;
    setInitialRegister: Dispatch<SetStateAction<HTMLFormElement | undefined>>;
}

export const InitialRegisterContext = createContext<InitialRegisterContextType>({
    initialRegister: undefined,
    setInitialRegister: () => {
    },
});

export const meta = () => {
    return [{ title: "Cadastrar - Social Commerce"}]
}

export default function RegisterPage() {
    const [initialRegister, setInitialRegister] = useState<HTMLFormElement | undefined>(undefined);

    return (
        <>
            <InitialRegisterContext.Provider value={{initialRegister, setInitialRegister}} >
                <RegisterArea/>
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
    const {formData, errors} = validateAction<InitialRegister | FinalRegister>(body, decideSchema(_action));
    const { account } = formData;

    if (errors) {
        return json({errors: {errors}}, 400);
    }

    switch (_action) {
        case "next_step": {
            return await emailAvailability(formData as InitialRegister);
        }
        case "register": {
            return await registerUser(account, formData as FinalRegister);
        }
    }

    return new Error("Algo deu errado no servidor!!");
}