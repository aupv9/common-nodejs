import {Request, Response} from "express-serve-static-core";

import {AbsResponse, SignUpPayload} from "../payload/payload";
import {shop} from "../models/shop.model";

interface IAccessController{
    signUp(SignUpPayload): AbsResponse<string>;
}

interface ResponseSignUp{
    message: string;
}

 export class AccessController implements IAccessController{

    private static instance: AccessController;

     private constructor() {
     }
    async signUp(payload: SignUpPayload): AbsResponse<string> {
        try {
            const holder = await shop.findOne({
                email: payload.email
            });

            return new AbsResponse<string>(

            )

        }catch (e) {

        }
    }

    public static getInstance(): AccessController {
         if (!AccessController.instance) {
            AccessController.instance = new AccessController();
        }
        return AccessController.instance;
    }
}

