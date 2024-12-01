import {z} from "zod";

export const createPublicationSchema = z.object({
    _action: z.string().optional(),
    product_name: z.string().min(1, {
        message: "Campo Obrigatório"
    }).max(50, {
        message: "Máximo de 50 caracteres"
    }),
    category: z.enum(["1", "2", "3", "4", "5", "6", "7"]),
    product_description: z.string().min(1, {
        message: "Campo Obrigatório"
    }).max(200, {
        message: "Máximo de 200 caracteres"
    }),
    product_image: z.any(),
    price_without_discount: z.coerce.number({message: "Apenas números são permitidos"}).min(1, {message: "Não pode ser 0 ou vazio"}).max(1000000, {message: "O valor não pode exceder 1 milhão"}),
    discount_choice: z.enum(["true", "false"]).optional(),
    discount_percentage: z.coerce.number().max(100, {message: "O desconto não pode exceder 100%"}).min(1, "O desconto não pode ser menor que 1%").optional()
})

export type CreatePublication = z.infer<typeof createPublicationSchema>;