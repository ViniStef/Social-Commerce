import RegisterArea from "~/components/RegisterArea";
import {useActionData} from "react-router";
import {createContext, Dispatch, SetStateAction, useState} from "react";

interface User {
    nome?: String;
    sobrenome?: String;
    account?: String;
    email?: String;
    CPF?: String;
    password?: String;
    confirmPassword?: String;
}

interface CurrentUserContextType {
    currentUser: User | null;
    setCurrentUser: Dispatch<SetStateAction<User | null>>;
}

export const CurrentUserContext = createContext<CurrentUserContextType>({
    currentUser: null,
    setCurrentUser: () => {},
});

export default function RegisterPage() {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    return (
        <>
            <CurrentUserContext.Provider
                value={{
                    currentUser,
                    setCurrentUser
                }}
            >
                <RegisterArea />
            </CurrentUserContext.Provider>
        </>

    )
}


export async function action( { request }: {request: Request}) {
    const formData = await request.formData();

    // Convert FormData to an object for easier logging
    const data = Object.fromEntries(formData);

    // Log the data to the server console
    console.log("Form data:", data);

    try {
        const response: Response = await fetch(`http://localhost:8080/buyer/findbuyer/${data.email}`, {
            method: "GET",
        })
        const jsonResponse = await response.json();

        console.log(jsonResponse);

        return jsonResponse;

    } catch (error) {
        console.log("Algo deu errado ao fazer a requisição para o Spring Boot!")
        return {"message": "Algo deu Errado no servidor", "erro": error};
    }


}