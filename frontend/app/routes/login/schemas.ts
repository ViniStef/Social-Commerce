import {z} from "zod";

export const loginSchema = z.object({
    email: z.string({
        required_error: "O campo email precisa existir"
    }).email("Email inválido").min(1, {message: "Email é obrigatório"}),
    password:
        z.string({required_error: "O campo senha deve existir"})
            .min(6, "Senha inválida")
            .max(40, "Senha inválida"),
    _action: z.enum(["next_step", "register", "login"])
});

export type Login = z.infer<typeof loginSchema>;