import {TokenModel} from "../models/keyStore.model";
import {Types} from "mongoose";
interface IKeyToken{
    user: Types.ObjectId,
    privateKey: string
}
export class KeyTokenService{

    static  async createKeyToken(payload: IKeyToken): Promise<string>{
        try {
            const  token =  await TokenModel.create({
                user: payload.user,
                privateKey: payload.privateKey
            });

            return token ?
                new Promise((resolve, reject) => {
                    resolve(token.privateKey);
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