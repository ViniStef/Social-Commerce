import RegisterArea from "~/components/RegisterArea";
import {useActionData} from "react-router";
import {createContext, Dispatch, FormEvent, SetStateAction, useContext, useEffect, useState} from "react";
import {json} from "@remix-run/react";
import {z} from "zod";
import {validateAction} from "~/utils/utils";
import type {ActionFunctionArgs} from "@remix-run/node";


interface User {
    name?: string;
    surname?: string;
    account?: string;
    email?: string;
    identifier?: string;
    password?: string;
    confirmPassword?: string;
}

interface CurrentUserContextType {
    currentUser: User | null;
    setCurrentUser: Dispatch<SetStateAction<User | null>>;
}

export const CurrentUserContext = createContext<CurrentUserContextType>({
    currentUser: null,
    setCurrentUser: () => {
    },
});

interface InitialRegisterContextType {
    initialRegister: FormData | null;
    setInitialRegister: Dispatch<SetStateAction<FormData | null>>;
}

export const InitialRegisterContext = createContext<InitialRegisterContextType>({
    initialRegister: null,
    setInitialRegister: () => {
    },
});

export default function RegisterPage() {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [initialRegister, setInitialRegister] = useState<FormData | null>(null);

    useEffect(() => {
        console.log(currentUser);
    }, [currentUser]);

    return (
        <>
            <CurrentUserContext.Provider
                value={{
                    currentUser,
                    setCurrentUser
                }}
            >
                <InitialRegisterContext.Provider
                    value={{
                        initialRegister,
                        setInitialRegister
                    }}
                >
                    <RegisterArea/>
                </InitialRegisterContext.Provider>
            </CurrentUserContext.Provider>
        </>

    )
}


const initialRegisterSchema = z.object({
    account: z.enum(["buyer", "seller"]),
    email: z.string({
        required_error: "O campo email precisa existir"
    }).email("Email inválido").min(1, {message: "Email é obrigatório"}),
    _action: z.enum(["next_step", "register"])
});

type InitialRegister = z.infer<typeof initialRegisterSchema>

type FinalRegister = z.infer<typeof finalRegisterSchema>

const finalRegisterSchema = z.object({
    first_name:
        z.string({required_error: "O campo nome precisa existir"})
        .regex(/^[a-zA-ZÀ-ÖØ-öø-ÿ'-]+$/, "O nome deve conter apenas letras, apóstrofos ou hífens")
        .min(2, "O nome deve conter no mínimo 2 letras")
        .max(20, "O nome deve conter no máximo 20 letras"),

    last_name:
        z.string({required_error: "O campo sobrenome deve existir"})
        .regex(/^[a-zA-ZÀ-ÖØ-öø-ÿ\s'-]{2,40}$/, "O sobrenome pode incluir apenas letras, espaços, apóstrofos ou hífens")
        .min(2, "O sobrenome deve conter no mínimo 2 letras")
        .max(40, "O sobrenome deve conter no máximo 40 letras"),

    _action: z.enum(["nextStep", "register"]),

    identifier:
        z.union(
        [
            z.string({required_error: "O campo CPF ou CNPJ deve existir"})
                .regex(/^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2}$/,
                    "Formato inválido." +
                    " O CPF deve ser 000.000.000-00 ou 00000000000." +
                    " O CNPJ deve ser 00.000.000/0000-00 ou 00000000000000."),
            z.string()
                .regex(/^[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}-?[0-9]{2}$/)
        ]
    ),

    password:
        z.string({required_error: "O campo senha deve existir"})
        .min(6, "A senha deve ter pelo menos 6 caracteres")
        .max(40, "A senha pode ter no máximo 40 caracteres"),

    confirm_password:
        z.string({required_error: "O campo confirmar senha deve existir"})
        .min(1, "Este campo não pode estar vazio"),

}).refine((data) => data.password === data.confirm_password, {
    message: "As senhas devem ser iguais",
    path: ["password", "confirm_password"],
})

export async function action({request}: ActionFunctionArgs) {
    const body = Object.fromEntries(await request.formData());
    let jsonResponse;

    console.log("body test: ", body);

    const {_action, ...data} = body;

    let useSchema;
    if (_action === "next_step") {
        useSchema = initialRegisterSchema;
    } else if (_action === "register") {
        useSchema = finalRegisterSchema;
    } else {
        useSchema = finalRegisterSchema;
    }

    const {formData, errors} = validateAction<InitialRegister | FinalRegister>(body, useSchema);


    switch (_action) {
        case "next_step":
            const {account, email} = formData as InitialRegister;
            if (errors) {
                // console.log({errors});
                return json({errors: {errors}});
                // return json({errors}, {status: 400});
            }
            try {
                // console.log("fez o post msm assim")
                const response: Response = await fetch(`http://localhost:8080/buyer/findbuyer/${email}`, {
                    method: "GET",
                })
                jsonResponse = await response.json();

                // console.log("resposta json do servidor: ", jsonResponse);

                return jsonResponse;

            } catch (error) {
                console.log("Algo deu errado ao fazer a requisição para o Spring Boot!")
                return {"message": "Algo deu Errado no servidor", "erro": error};
            }

        case "register":
            const {first_name, last_name} = formData as FinalRegister;
            if (errors) {
                console.log({errors});
                return json({errors: {errors}});
                // return json({errors}, {status: 400});
            }
            try {
                console.log("fez o post msm assim")
                // const response: Response = await fetch(`http://localhost:8080/buyer/findbuyer/${email}`, {
                //     method: "GET",
                // })
                // jsonResponse = await response.json();

                console.log("resposta json do servidor: ", jsonResponse);

                return jsonResponse;

            } catch (error) {
                console.log("Algo deu errado ao fazer a requisição para o Spring Boot!")
                return {"message": "Algo deu Errado no servidor", "erro": error};
            }
    }

    return new Error("Algo deu errado no servidor!!");
}