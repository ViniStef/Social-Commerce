import {registerSeller} from "~/routes/register/requests/users/registerSeller";
import {FinalRegister} from "~/routes/register/schemas/finalRegisterSchema";
import {registerBuyer} from "~/routes/register/requests/users/registerBuyer";
import {JsonFunction, TypedResponse} from "@remix-run/node";

export async function registerUser(account: FormDataEntryValue | undefined, formData: FinalRegister): Promise<number | {"message": string, "status": number}>  {
    if (account === "seller") {
        return await registerSeller(formData as FinalRegister);
    }

    const respostaDoRegisterBuyer = await registerBuyer(formData as FinalRegister);
    console.log("respostaDoRegisterBuyer: ", respostaDoRegisterBuyer)

    return respostaDoRegisterBuyer;

}

