export type Seller = {
    firstName: string;
    lastName: string;
    imagePath: string;
    sellerId: number;
}

export type BuyerProfileResultType = {
    imagePath: string,
    firstName: string;
    lastName: string;
    sellers: any[];
}

export type PublicationsResultType = {
    publicationId: number;
    publicationDate: string;
    productName: string;
    sellerImg: string;
    sellerName: string;
    sellerId: number;
    description: string;
    imagePath: string;
    discount: number;
    price: number;
    likes: number;
}

export type searchSellerResponse = {
    sellers?: Seller[];
    errors?: string;
}

export type PutBuyerProfileImgResponse = {
    profileImg?: string;
    status?: number;
    error?: string;
}

export type UnfollowASellerResponse = {
    status?: number;
    error?: string;
}

export type FollowASellerResponse = {
    status?: number;
    error?: string;
}

export type GetPublicationsByCategoryResponse = {
    publicationsCategory?: PublicationsResultType[];
    error?: string;
}

export type GetPromotionPublicationsResponse = {
    publicationFiltered?: PublicationsResultType[];
    error?: string;
}

export type GetBestPromotionPublicationsResponse = {
    publicationFiltered?: PublicationsResultType[];
    error?: string;
}

export type LikeAPublicationResponse = {
    status?: number;
    error?: string;
}