import {
    CreatePublicationResponse,
    DeletePublicationResponse,
    GetPublicationsBySellerIdResponse,
    PublicationsResultType,
    PutSellerProfileImgResponse,
    SellerMetricsType,
    SellerProfileResultType
} from "~/routes/seller/types";
import axios, {AxiosResponse} from "axios";
import {baseUrl} from "~/utils/urls";
import path from "node:path";
import process from "node:process";
import fs from "node:fs";

export async function getSellerProfileById(sellerId: string): Promise<SellerProfileResultType> {
    const {data}: { data: SellerProfileResultType } =
        await axios.get(`${baseUrl}/seller/profile/${sellerId}`);

    return data;
}

export async function getSellerMetricsById(sellerId: string): Promise<SellerMetricsType> {
    const {data}: { data: SellerMetricsType } =
        await axios.get(`${baseUrl}/seller/metrics/${sellerId}`);

    return data;
}

export async function putSellerProfileImg(sellerId: string, imageUrl: string): Promise<PutSellerProfileImgResponse> {
    try {
        const response: AxiosResponse = await axios.put(`${baseUrl}/seller/${sellerId}/image`, {
            imagePath: imageUrl
        });

        if (response.status === 200) {
            return {profileImg: imageUrl};
        }

        return {status: response.status};
    } catch (error) {
        return {erro: "Erro ao enviar imagem"};
    }
}

export async function getPublicationsBySellerId(sellerId: string): Promise<GetPublicationsBySellerIdResponse> {
    try {
        const response: AxiosResponse = await axios.get(`${baseUrl}/publications/seller/${sellerId}`);
        const publications: PublicationsResultType[] = response.data;
        return {publications: publications};
    } catch (error) {
        return {erro: "Não existe nenhuma publicação ainda"};
    }
}

export async function deletePublication(publicationId: string, sellerId: string): Promise<DeletePublicationResponse> {
    try {
        const response: AxiosResponse = await axios.put(`${baseUrl}/publications/delete/${publicationId}/seller/${sellerId}`);
        if (response.status === 204) {
            return {status: response.status}
        }
        return {erro: "Algo inesperado aconteceu."}
    } catch (error) {
        return {erro: "Não existe publicações ainda."}
    }
}

export async function createPublication(sellerId: string, formData: FormData, imagePath: string): Promise<CreatePublicationResponse> {
    const formObjects = Object.fromEntries(formData);
    const {
        product_name,
        category,
        product_description,
        price_without_discount,
        discount_choice,
        discount_percentage
    } = formObjects;
    try {
        const response = await axios.post(`${baseUrl}/publications/${sellerId}/createPublication`, {
            product: {
                product_name: product_name,
            },
            category: {
                categoryID: category,
            },
            imagePath: imagePath,
            description: product_description,
            discount_percentage: discount_percentage,
            has_promotion: discount_choice,
            price: price_without_discount,
        })

        return {status: response.status};
    } catch (error) {
        return {erro: "Erro inesperado"};
    }
}

export async function saveImageToFiles(image: File): Promise<string> {
    const uploadDir = path.join(process.cwd(), "public/000001");
    const filename = `${crypto.randomUUID()}-${Date.now()}-${image.name}`;
    const filePath = path.join(uploadDir, filename);

    fs.mkdirSync(uploadDir, {recursive: true});
    const arrayBuffer = await image.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(arrayBuffer));

    return `public/000001/${filename}`;
}