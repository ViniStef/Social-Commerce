import {registerSeller} from "~/routes/register/requests/users/registerSeller";
import {FinalRegister} from "~/routes/register/schemas/finalRegisterSchema";
import {registerBuyer} from "~/routes/register/requests/users/registerBuyer";

export async function registerUser(account: FormDataEntryValue | undefined, formData: FinalRegister) {
    if (account === "seller") {
        return await registerSeller(formData as FinalRegister);
    } else if (account === "buyer") {
        return await registerBuyer(formData as FinalRegister);
    } else {
        return undefined;
    }
}

