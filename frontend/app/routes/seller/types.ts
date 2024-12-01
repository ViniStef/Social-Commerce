export type Buyer = {
    firstName: string;
    lastName: string;
    imagePath: string;
}

export type SellerProfileResultType = {
    imagePath: string,
    firstName: string;
    lastName: string;
    buyers: Buyer[];
}

export type SellerMetricsType = {
    numOfFollowers: number,
    numOfPublications: number;
    numOfLikes: number;
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

export type PutSellerProfileImgResponse = {
    profileImg?: string;
    status?: number;
    erro?: string;
}

export type GetPublicationsBySellerIdResponse = {
    publications?:PublicationsResultType[];
    erro?: string;
}

export type DeletePublicationResponse = {
    status?: number;
    erro?: string;
}

export type CreatePublicationResponse = {
    status?: number;
    erro?: string;
}