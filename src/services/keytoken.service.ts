import {TokenModel} from "../models/keyStore.model";
import {Types} from "mongoose";

interface IKeyToken{
    user: Types.ObjectId,
    publicKey: string
}
export class KeyTokenService{

    static  async createKeyToken(payload: IKeyToken): Promise<string>{
        try {
            const  token =  await TokenModel.create({
                user: payload.user,
                publicKey: payload.publicKey
            });

            return token ?
                new Promise((resolve, reject) => {
                    resolve(token.publicKey);
                })
                :
                new Promise((resolve, reject) => {
                    reject(null);
                }
                );
        }
        catch (e) {
            throw e;
        }
    }

}