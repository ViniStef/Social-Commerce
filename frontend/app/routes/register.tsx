import RegisterArea from "~/components/RegisterArea";
import {useActionData} from "react-router";
import {createContext, Dispatch, FormEvent, SetStateAction, useContext, useEffect, useState} from "react";
import {json} from "@remix-run/react";
import {z} from "zod";
import {validateAction} from "~/utils/utils";
import type { ActionFunctionArgs} from "@remix-run/node";


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
    setCurrentUser: () => {},
});

interface InitialRegisterContextType {
    initialRegister: FormData | null;
    setInitialRegister: Dispatch<SetStateAction<FormData | null>>;
}

export const InitialRegisterContext = createContext<InitialRegisterContextType>({
    initialRegister: null,
    setInitialRegister: () => {},
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
                    <RegisterArea />
                </InitialRegisterContext.Provider>
            </CurrentUserContext.Provider>
        </>

    )
}



const initialRegisterSchema = z.object({
    account: z.enum(["buyer", "seller"]),
    email: z.string({
        required_error: "Email é obrigatório"
    }).email("Email inválido"),
    _action: z.enum(["nextStep", "register"])
});

type InitialRegister = z.infer<typeof initialRegisterSchema>

type FinalRegister = z.infer<typeof finalRegisterSchema>

const finalRegisterSchema = z.object({
    first_name: z.string({
        required_error: "Insira um nome"
    }).min(2, {message: "O nome deve conter no mínimo 2 letras"})
        .max(20, {message: "O nome deve conter no máximo 20 letras"})
        .regex(/^[a-zA-ZÀ-ÖØ-öø-ÿ'-]+$/, {
            message: "O nome não pode ser vazio e deve conter apenas letras, apóstrofos ou hífens",
        }),
    last_name: z.string({
        required_error: "Sobrenome é obrigatório"
    }).min(2, {message: "O sobrenome deve conter no mínimo 2 letras"})
        .max(40, {message: "O sobrenome deve conter no máximo 40 letras"})
        .regex(/^[a-zA-ZÀ-ÖØ-öø-ÿ\s'-]{2,40}$/, {
        message: "O sobrenome não pode ser vazio e pode incluir apenas letras, espaços, apóstrofos ou hífens",
    }),
    _action: z.enum(["nextStep", "register"]),
    identifier: z.union([z.string({
        required_error: "CPF ou CNPJ é obrigatório"
    }).regex(/^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2}$/, {
        message: "Formato incorreto de CPF ou CNPJ"
    }),
        z.string().regex(/^[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}-?[0-9]{2}$/)
    ]),
    password: z.string({
        required_error: "Senha é obrigatória"
    }).min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirm_password: z.string({
        required_error: "Confirme a senha"
    }).min(6, "A senha deve ter pelo menos 6 caracteres"),
}).refine((data) => data.password === data.confirm_password, {
        message: "As senhas devem ser iguais",
        path: ["confirm_password"],
    })

export async function action ({ request }: ActionFunctionArgs)   {
    console.log(request.url)
    let jsonResponse;

    let useSchema;
    if (request.url.endsWith("next_step")) {
        useSchema = initialRegisterSchema;
    } else if (request.url.endsWith("register")) {
        useSchema = finalRegisterSchema;
    } else {
        useSchema = finalRegisterSchema;
    }

    const { formData, errors } = await validateAction<InitialRegister | FinalRegister>(request, useSchema);


    switch (formData._action) {
        case "next_step":
            const { account, email } = formData as InitialRegister;
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
            const { first_name, last_name } = formData as FinalRegister;
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