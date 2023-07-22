import {AbsResponse, SignUpPayload} from "../payload/payload";
import {shop} from "../models/shop.model";
import {CommonUtils} from "../utils/commonUtils";
import {KeyTokenService} from "./keytoken.service";
import {AuthUtils} from "../utils/authUtils";


interface IAccessService {
    signUp(payload: SignUpPayload): Promise<AbsResponse<string>>;
}

export class AccessService implements IAccessService{

    private static instance: AccessService;

    private constructor() { }

    async signUp(payload: SignUpPayload): Promise<AbsResponse<string>>{
        try {
            const holder = await shop.findOne({
                email: payload.email
            });
            if(holder){
                return new Promise<AbsResponse<string>>((resolve) => {
                    resolve(
                        AbsResponse.of("Already exist",  null,  400,  false)
                    )
                });
            }

            const newShop = await shop.create({
                name: payload.name, email: payload.email, password: CommonUtils.hashPassword(payload.password)
            });
            if(newShop){
                const keyPair = CommonUtils.generateKeyPair();

                const publicKey = keyPair.publicKey.export({
                    type: 'spki',
                    format: 'pem'
                }).toString();

                const privateKey = keyPair.privateKey.export(
                    {
                        type: 'pkcs8',
                        format: 'pem'
                    }
                ).toString();


                const token = await KeyTokenService.createKeyToken({
                   publicKey: publicKey, user: newShop._id
                });

                if(!token){
                    return new Promise<AbsResponse<string>>((resolve) => {
                        resolve(
                            AbsResponse.of("Generate token failed",  null,  500,  false)
                        )
                    });
                }

                const tokens =  await AuthUtils.createPairToken({
                    payload: {
                        userId: newShop._id,
                        email: payload.email
                    }, publicKey: token, privateKey: privateKey
                });

                return new Promise<AbsResponse<string>>((resolve) => {
                    resolve(
                        AbsResponse.of("Sign up successfully",  tokens.accessToken,  201,  true)
                    )
                });
            }

        }catch (e) {
            console.log(e);
        }
    }

    static getInstance(): AccessService {
        if (!AccessService.instance) {
            AccessService.instance = new AccessService();
        }
        return AccessService.instance;
    }
}
