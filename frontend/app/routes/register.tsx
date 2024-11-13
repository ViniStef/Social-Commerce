// import RegisterArea from "~/components/RegisterArea";
// import {useActionData} from "react-router";
// import {createContext, Dispatch, FormEvent, SetStateAction, useContext, useEffect, useState} from "react";
// import {json} from "@remix-run/react";
// import {z} from "zod";
// import {validateAction} from "~/utils/utils";
// import {ActionFunctionArgs, redirect} from "@remix-run/node";
// import axios from "axios";
// import {InitialRegister, initialRegisterSchema} from "~/routes/register/schemas/initialRegisterSchema";
// import {FinalRegister, finalRegisterSchema} from "~/routes/register/schemas/finalRegisterSchema";
//
//
// interface User {
//     name?: string;
//     surname?: string;
//     account?: string;
//     email?: string;
//     identifier?: string;
//     password?: string;
//     confirmPassword?: string;
// }
//
// interface CurrentUserContextType {
//     currentUser: User | null;
//     setCurrentUser: Dispatch<SetStateAction<User | null>>;
// }
//
// export const CurrentUserContext = createContext<CurrentUserContextType>({
//     currentUser: null,
//     setCurrentUser: () => {
//     },
// });
//
// interface InitialRegisterContextType {
//     initialRegister: HTMLFormElement | undefined;
//     setInitialRegister: Dispatch<SetStateAction<HTMLFormElement | undefined>>;
// }
//
// export const InitialRegisterContext = createContext<InitialRegisterContextType>({
//     initialRegister: undefined,
//     setInitialRegister: () => {
//     },
// });
//
// export const meta = () => {
//     return [{ title: "Cadastrar - Social Commerce"}]
// }
//
// export default function RegisterPage() {
//     const [currentUser, setCurrentUser] = useState<User | null>(null);
//     const [initialRegister, setInitialRegister] = useState<HTMLFormElement | undefined>(undefined);
//
//     return (
//         <>
//             <CurrentUserContext.Provider
//                 value={{
//                     currentUser,
//                     setCurrentUser
//                 }}
//             >
//                 <InitialRegisterContext.Provider
//                     value={{
//                         initialRegister,
//                         setInitialRegister
//                     }}
//                 >
//                     <RegisterArea/>
//                 </InitialRegisterContext.Provider>
//             </CurrentUserContext.Provider>
//         </>
//
//     )
// }
//
//
// export async function action({request}: ActionFunctionArgs) {
//     const body = Object.fromEntries(await request.formData());
//     let jsonResponse;
//
//
//     const {_action, ...data} = body;
//
//     let useSchema;
//     if (_action === "next_step") {
//         useSchema = initialRegisterSchema;
//     } else if (_action === "register") {
//         useSchema = finalRegisterSchema;
//     } else {
//         useSchema = finalRegisterSchema;
//     }
//
//     const {formData, errors} = validateAction<InitialRegister | FinalRegister>(body, useSchema);
//
//     switch (_action) {
//         case "next_step": {
//             const {account, email, _action } = formData as InitialRegister;
//             if (errors) {
//                 return json({errors: {errors}}, 400);
//                 // return json({errors}, {status: 400});
//             }
//             try {
//                 const response: Response = await fetch("http://localhost:8080/register?" +
//                     new URLSearchParams({
//                         type: account,
//                         email: email
//                     }), {
//                     method: "GET",
//                 })
//                 jsonResponse = await response.json();
//
//                 console.log("resposta json do servidor: ", jsonResponse);
//
//                 return jsonResponse;
//
//             } catch (error) {
//                 console.log("Algo deu errado ao fazer a requisição para o Spring Boot!")
//                 return {"message": "Algo deu errado no servidor", "erro": error};
//             }
//         }
//         case "register": {
//             const { first_name, last_name, identifier, password, confirm_password, email, account } = formData as FinalRegister;
//
//             if (errors) {
//                 return json({errors: {errors}});
//             }
//
//             if (account === "seller") {
//                 const response = await axios.post("http://localhost:8080/seller/create", {
//                     first_name: first_name,
//                     last_name: last_name,
//                     cnpj: identifier,
//                     password: password,
//                     confirm_password: confirm_password,
//                     email: email,
//                 }).then(response => {
//                     if (response.status === 201) {
//                         redirect("/login");
//                     }
//                     return response.status;
//                 }).catch(error => {
//                     return json({"message": `Erro interno no servidor:  ${error}`, "status": 500});
//                 })
//                 console.log(response);
//             } else if (account === "buyer") {
//                  const response = await axios.post("http://localhost:8080/buyer/create", {
//                     first_name: first_name,
//                     last_name: last_name,
//                     cpf: parseInt(identifier),
//                     password: password,
//                     confirm_password: confirm_password,
//                     email: email,
//                 }).then(response => {
//                     if (response.status === 201) {
//                         redirect("/login");
//                     }
//                     return response.status;
//                 }).catch(error => {
//                     return json({"message": `Erro interno no servidor:  ${error}`, "status": 500});
//                 })
//                 console.log(response);
//             } else {
//                 return null;
//             }
//         }
//
//     }
//
//     return new Error("Algo deu errado no servidor!!");
// }