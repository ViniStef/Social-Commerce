import RegisterArea from "~/components/RegisterArea";
import {createContext, Dispatch, SetStateAction, useState} from "react";
import {json} from "@remix-run/react";
import {validateAction} from "~/utils/utils";
import {ActionFunctionArgs, redirect} from "@remix-run/node";
import {InitialRegister, initialRegisterSchema} from "~/routes/register/schemas/initialRegisterSchema";
import {FinalRegister, finalRegisterSchema} from "~/routes/register/schemas/finalRegisterSchema";
import {emailAvailability} from "~/routes/register/requests/emailAvailability";
import {ZodSchema} from "zod";
import {registerUser} from "~/routes/register/requests/users/registerUser";
import {isResponse} from "@remix-run/react/dist/data";

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
    const [initialRegister, setInitialRegister] = useState<HTMLFormElement | undefined>();

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

    switch (_action) {
        case "next_step": {
            const {formData, errors} = validateAction<InitialRegister>(body, decideSchema(_action));

            if (errors) {
                return {ok: false, formValidationError: errors};
            }

            const emailAvailabilityResponse = await emailAvailability(formData as InitialRegister);

            console.log(emailAvailabilityResponse);

            return {emailResponse: emailAvailabilityResponse, email: formData.email, account: formData.account};

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

            return {ok: false, data, account};
        }
        default:
            return {error: "Ação inválida"};
    }

}

