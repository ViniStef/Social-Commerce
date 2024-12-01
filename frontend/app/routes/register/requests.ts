import axios, {AxiosError} from "axios";
import {FinalRegister, InitialRegister} from "~/routes/register/schemas";
import {baseUrl} from "~/utils/urls";
import {EmailAvailabilityResponse, RegisterBuyerResponse, RegisterSellerResponse} from "~/routes/register/types";

export async function registerSeller(formData: FinalRegister): Promise<RegisterSellerResponse> {
    const { first_name, last_name, identifier, password, confirm_password, email } = formData;

    try {
        const result = await axios.post(`${baseUrl}/seller/create`, {
            first_name: first_name,
            last_name: last_name,
            cnpj: parseInt(identifier),
            password: password,
            confirm_password: confirm_password,
            email: email,
        })

        return {registerStatus: result.status};
    } catch(error) {
        return {message: `Erro interno no servidor:  ${error}`};

    }

}

export async function registerBuyer(formData: FinalRegister): Promise<RegisterBuyerResponse> {
    const { first_name, last_name, identifier, password, confirm_password, email } = formData;

    try {
        const result = await axios.post(`${baseUrl}/buyer/create`, {
            first_name: first_name,
            last_name: last_name,
            cpf: parseInt(identifier),
            password: password,
            confirm_password: confirm_password,
            email: email,
        })
        return {registerStatus: result.status};
    } catch(error) {
        return {message: `Erro interno no servidor:  ${error}`};

    }

}

export async function registerUser(account: FormDataEntryValue | undefined, formData: FinalRegister): Promise<RegisterBuyerResponse | RegisterSellerResponse>  {
    if (account === "seller") {
        return await registerSeller(formData as FinalRegister) as RegisterSellerResponse;
    }
    return await registerBuyer(formData as FinalRegister) as RegisterBuyerResponse;
}


export async function emailAvailability(formData: InitialRegister): Promise<EmailAvailabilityResponse>   {
    const { account, email } = formData as InitialRegister;

    try {
        const response = await axios.get(`${baseUrl}/register?`, {
            params: {
                type: account,
                email: email,
            }
        })

        return {isEmailUsed: response.data};

    } catch (error) {
        if (error instanceof AxiosError) {
            return error.status == 404 ? {emailUsedMessage: "Este email já está em uso"} : { errors: "Erro na conexão com o servidor, tente novamente mais tarde"};
        } else {
            return { errors: "Erro inesperado no servidor" };
        }

    }


}