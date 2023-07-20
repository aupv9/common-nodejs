import {AbsResponse, SignUpPayload} from "../payload/payload";
import {shop} from "../models/shop.model";
import {CommonUtils} from "../utils/commonUtils";


export class AccessService {

    private static instance: AccessService;
    constructor() { }
    async signUp(payload: SignUpPayload): Promise<AbsResponse<string>>{
        try {
            const holder = await shop.findOne({
                email: payload.email
            });
            if(holder){
                return new Promise<AbsResponse<string>>((resolve, reject) => {
                    resolve(
                        AbsResponse.of("Already exist",  null,  400,  false)
                    )
                });
            }

            const newShop = await shop.create({
                name: payload.name, email: payload.email, password: CommonUtils.hashPassword(payload.password)
            });

            if(newShop){
                return new Promise<AbsResponse<string>>((resolve, reject) => {
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
