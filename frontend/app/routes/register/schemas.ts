import {z} from "zod";

export const finalRegisterSchema = z.object({
    first_name:
        z.string({required_error: "O campo nome precisa existir"})
            .regex(/^[a-zA-ZÀ-ÖØ-öø-ÿ'-]+$/, "O nome deve conter apenas letras, apóstrofos ou hífens")
            .min(2, "O nome deve conter no mínimo 2 letras")
            .max(20, "O nome deve conter no máximo 20 letras"),

    last_name:
        z.string({required_error: "O campo sobrenome deve existir"})
            .regex(/^[a-zA-ZÀ-ÖØ-öø-ÿ\s'-]{2,40}$/, "O sobrenome pode incluir apenas letras, espaços, apóstrofos ou hífens")
            .min(2, "O sobrenome deve conter no mínimo 2 letras")
            .max(40, "O sobrenome deve conter no máximo 40 letras"),

    _action: z.enum(["next_step", "register"]),

    identifier:
        z.union(
            [
                z.string({required_error: "O campo CPF ou CNPJ deve existir"})
                    .regex(/^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2}$/,
                        "Formato inválido." +
                        " O CPF deve ser 000.000.000-00 ou 00000000000." +
                        " O CNPJ deve ser 00.000.000/0000-00 ou 00000000000000."),
                z.string()
                    .regex(/^[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}-?[0-9]{2}$/)
            ]
        ),

    password:
        z.string({required_error: "O campo senha deve existir"})
            .min(6, "A senha deve ter pelo menos 6 caracteres")
            .max(40, "A senha pode ter no máximo 40 caracteres"),

    confirm_password:
        z.string({required_error: "O campo confirmar senha deve existir"})
            .min(1, "Este campo não pode estar vazio"),

    email: z.string().optional(),
    account: z.string().optional(),

}).refine((data) => data.password === data.confirm_password, {
    message: "As senhas devem ser iguais",
    path: ["password", "confirm_password"],
})

export type FinalRegister = z.infer<typeof finalRegisterSchema>

export const initialRegisterSchema = z.object({
    account: z.enum(["buyer", "seller"]),
    email: z.string({
        required_error: "O campo email precisa existir"
    }).email("Email inválido").min(1, {message: "Email é obrigatório"}),
    _action: z.enum(["next_step", "register"])
});

export type InitialRegister = z.infer<typeof initialRegisterSchema>