import {registerSeller, RegisterSellerResponse} from "~/routes/register/requests/users/registerSeller";
import {FinalRegister} from "~/routes/register/schemas/finalRegisterSchema";
import {registerBuyer, RegisterBuyerResponse} from "~/routes/register/requests/users/registerBuyer";
import {JsonFunction, TypedResponse} from "@remix-run/node";

export async function registerUser(account: FormDataEntryValue | undefined, formData: FinalRegister): Promise<RegisterBuyerResponse | RegisterSellerResponse>  {
    if (account === "seller") {
        return await registerSeller(formData as FinalRegister) as RegisterSellerResponse;
    }

    return await registerBuyer(formData as FinalRegister) as RegisterBuyerResponse;
}

