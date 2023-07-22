import {KeyPair, KeyPairPayload} from "./define";
import JWT from 'jsonwebtoken';

export abstract class AuthUtils {

    static isAuthenticated(): boolean {

        return !!localStorage.getItem('token');

    }

    static async createPairToken(keyPair: KeyPairPayload): Promise<KeyPair> {
        try {
            const payload: KeyPairPayload = {
                payload: keyPair.payload,
                publicKey: keyPair.publicKey,
                privateKey: keyPair.privateKey
            }
            const accessToken = await JWT.sign(payload.payload, payload.privateKey, {
                algorithm: 'RS256',
                expiresIn: '2 days'
            });

            const refreshToken = await JWT.sign(payload.payload, payload.privateKey,{
                algorithm: 'RS256',
                expiresIn: '7 days'
            });

            JWT.verify(accessToken, payload.publicKey, (err, decoded) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(decoded);
                }
            });
           return new Promise<KeyPair>((resolve, reject) => {
               resolve(
                   {
                       accessToken,
                       refreshToken
                   }
               )
           });
        }
        catch (e) {
            console.log(e);
            return null;
        }
    }
}