import RegisterArea from "~/components/RegisterArea";
import {useActionData} from "react-router";
import {createContext, Dispatch, FormEvent, SetStateAction, useContext, useEffect, useState} from "react";
import {json} from "@remix-run/react";


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




export async function action( { request }: {request: Request}) {
    const formData = await request.formData();

    let { _action, ...data } = Object.fromEntries(formData);

    let jsonResponse;

    switch(_action) {
        case "nextStep":

            try {
                console.log("fez o post msm assim")
                const response: Response = await fetch(`http://localhost:8080/buyer/findbuyer/${data.email}`, {
                    method: "GET",
                })
                jsonResponse = await response.json();

                console.log("resposta json do servidor: ", jsonResponse);

                return jsonResponse;

            } catch (error) {
                console.log("Algo deu errado ao fazer a requisição para o Spring Boot!")
                return {"message": "Algo deu Errado no servidor", "erro": error};
            }
        case "register":
            console.log("Rodou no caso register!!");
            try {
                const response: Response = await fetch(`http://localhost:8080/buyer/findbuyer/${data.email}`, {
                    method: "GET",
                })
                jsonResponse = await response.json();

                console.log("resposta json do servidor: ", jsonResponse);

                return jsonResponse;

            } catch (error) {
                console.log("Algo deu errado ao fazer a requisição para o Spring Boot!")
                return {"message": "Algo deu Errado no servidor", "erro": error};
            }
    }

    console.log("Teste chegou aqui embaixo!");
    return jsonResponse || new Error("Algo deu errado no servidor!!");

}