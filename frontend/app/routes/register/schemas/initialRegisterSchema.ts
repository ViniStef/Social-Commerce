import {z} from "zod";

export const initialRegisterSchema = z.object({
    account: z.enum(["buyer", "seller"]),
    email: z.string({
        required_error: "O campo email precisa existir"
    }).email("Email inválido").min(1, {message: "Email é obrigatório"}),
    _action: z.enum(["next_step", "register"])
});

export type InitialRegister = z.infer<typeof initialRegisterSchema>