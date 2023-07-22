import {Types} from "mongoose";


export interface KeyPair {
    accessToken: string;
    refreshToken: string;
}

interface UserPayload {
    userId: Types.ObjectId;
    email: string;
}
export interface KeyPairPayload {
    payload: UserPayload;
    publicKey: string;
    privateKey: string;
}