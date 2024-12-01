export type RegisterSellerResponse = {
    registerStatus?: number;
    message?: string;
    error?: string;
}

export type RegisterBuyerResponse = {
    registerStatus?: number;
    message?: string;
    error?: string;
}

export type EmailAvailabilityResponse = {
    isEmailUsed?: boolean;
    errors?: string;
    emailUsedMessage?: string;
}