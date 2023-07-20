import {AbsResponse, SignUpPayload} from "../payload/payload";
import {shop} from "../models/shop.model";
import {CommonUtils} from "../utils/commonUtils";
import {KeyTokenService} from "./keytoken.service";


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

                const token = KeyTokenService.createKeyToken({
                   publicKey: publicKey, user: newShop._id
                });
                token.then((res) => {
                    console.log(res);
                })
                .catch(() => {

                });


                return new Promise<AbsResponse<string>>((resolve) => {
                    resolve(
                        AbsResponse.of("Sign up successfully",  null,  200,  true)
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
