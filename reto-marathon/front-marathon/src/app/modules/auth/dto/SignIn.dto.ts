export interface SigninRequest {
    email: string;
    password: string;
}

export interface SigninResponse {
    type_token: string;
    access_token: string;
}