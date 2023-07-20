import {AbsResponse, SignUpPayload} from "../payload/payload";
import {shop} from "../models/shop.model";
import {CommonUtils} from "../utils/commonUtils";
import {AccessService} from "../services/access.service";

interface IAccessController{
    signUp(SignUpPayload): Promise<AbsResponse<string>>;
}

interface ResponseSignUp{
    message: string;
}

 export class AccessController implements IAccessController{

    private static instance: AccessController;

     private constructor() {
     }
    async signUp(payload: SignUpPayload): Promise<AbsResponse<string>> {
         return await AccessService.getInstance().signUp(payload);
    }

    public static getInstance(): AccessController {
         if (!AccessController.instance) {
            AccessController.instance = new AccessController();
        }
        return AccessController.instance;
    }
}

