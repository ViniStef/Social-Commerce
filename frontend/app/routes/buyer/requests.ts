import {
    BuyerProfileResultType,
    FollowASellerResponse,
    GetBestPromotionPublicationsResponse,
    GetPromotionPublicationsResponse,
    GetPublicationsByCategoryResponse, LikeAPublicationResponse,
    PublicationsResultType,
    PutBuyerProfileImgResponse,
    searchSellerResponse,
    Seller,
    UnfollowASellerResponse
} from "~/routes/buyer/types";
import axios, {AxiosError, AxiosResponse} from "axios";
import {baseUrl} from "~/utils/urls";

export async function getBuyerProfileById(buyerId: string): Promise<BuyerProfileResultType> {
    const { data } = await axios.get(`${baseUrl}/buyer/profile/${buyerId}`);
    return data;
}

export async function getPublicationsByBuyerId(buyerId: string): Promise<PublicationsResultType[]> {
    const { data } = await axios.get(`${baseUrl}/publications/buyer/${buyerId}`);
    return data;
}

export async function searchSeller(sellerName: string): Promise<searchSellerResponse> {
    try {
        const response: AxiosResponse = await axios.get(`${baseUrl}/seller/findASeller/sellerName`);
        const sellerResponse: Seller[] = response.data;

        return {sellers: sellerResponse};
    } catch (error) {
        if (error instanceof AxiosError) {
            return {errors: "Erro na conexão com o servidor, tente novamente mais tarde"};
        } else {
            return {errors: "Erro inesperado no servidor"};
        }
    }
}

export async function putBuyerProfileImg(buyerId: string, imageUrl: string): Promise<PutBuyerProfileImgResponse> {
    try {
        const response: AxiosResponse = await axios.put(`${baseUrl}/buyer/${buyerId}/image`, {
            imagePath: imageUrl,
        })

        if (response.status === 200) {
            return {profileImg: imageUrl};
        }

        return {status: response.status};
    } catch (error) {
        return {error: "Erro ao enviar imagem"};
    }
}

export async function unfollowASeller(sellerId: string, buyerId: string): Promise<UnfollowASellerResponse> {
    try {
        const response: AxiosResponse = await axios.put(`${baseUrl}/buyer/unfollow/${sellerId}/by/${buyerId}`)

        if (response.status == 204) {
            return {status: response.status};
        }

        return {error: "Algo inesperado aconteceu"};
    } catch (error) {
        if (error instanceof AxiosError) {
            return {error: "Erro na conexão com o servidor, tente novamente mais tarde"};
        } else {
            return {error: "Erro inesperado no servidor"};
        }
    }
}

export async function followASeller(sellerId: string, buyerId: string): Promise<FollowASellerResponse> {
    try {
        const response = await axios.post(baseUrl + `${baseUrl}/buyer/follower/${buyerId}/followed/${sellerId}`)

        if (response.status == 200) {
            return {status: response.status};
        }

        return {error: "Algo inesperado aconteceu"};
    } catch (error) {
        if (error instanceof AxiosError) {
            return {error: "Erro na conexão com o servidor, tente novamente mais tarde"};
        } else {
            return {error: "Erro inesperado no servidor"};
        }
    }
}

export async function getPublicationsByCategory(categoryId: string, buyerId: string): Promise<GetPublicationsByCategoryResponse> {
    try {
        const response: AxiosResponse = await axios.get(`${baseUrl}/publications/buyer/${buyerId}/category/${categoryId}`)
        const publicationsCategory: PublicationsResultType[] = response.data;

        return {publicationsCategory: publicationsCategory};
    } catch (error) {
        if (error instanceof AxiosError) {
            return {error: "Erro na conexão com o servidor, tente novamente mais tarde"};
        } else {
            return {error: "Erro inesperado no servidor"};
        }
    }
}

export async function getPromotionPublications(buyerId: string): Promise<GetPromotionPublicationsResponse> {
    try {
        const response: AxiosResponse = await axios.get(`${baseUrl}/publications/promo/${buyerId}`);
        const publicationsPromo: PublicationsResultType[] = response.data

        return {publicationFiltered: publicationsPromo};
    } catch (error) {
        if (error instanceof AxiosError) {
            return {error: "Erro na conexão com o servidor, tente novamente mais tarde"};
        } else {
            return {error: "Erro inesperado no servidor"};
        }
    }
}

export async function getBestPromotionPublications(buyerId: string): Promise<GetBestPromotionPublicationsResponse> {
    try {
        const response: AxiosResponse = await axios.get(`${baseUrl}/publications/mostPromo/${buyerId}`);
        const publicationsPromo: PublicationsResultType[] = response.data;

        return {publicationFiltered: publicationsPromo};
    } catch (error) {
        if (error instanceof AxiosError) {
            return {error: "Erro na conexão com o servidor, tente novamente mais tarde"};
        } else {
            return {error: "Erro inesperado no servidor"};
        }
    }
}

export async function likeAPublication(sellerId: string, publicationId: string): Promise<LikeAPublicationResponse>  {
    try {
        const response: AxiosResponse = await axios.post(`${baseUrl}/buyer/publication/${sellerId}/like/${publicationId}`);
        const status: number = response.status;

        if (status == 200) {
            return {status: status};
        }

        return {error: "Erro inesperado no servidor"};
    } catch (error) {
        if (error instanceof AxiosError) {
            return {error: "Erro na conexão com o servidor, tente novamente mais tarde"};
        } else {
            return {error: "Erro inesperado no servidor"};
        }
    }
}