import {Request, Response} from "express-serve-static-core";

interface IAccessController{
    signUp(request: Request,  response: Response,  next: any): Promise<void>;
}


 export class AccessController implements IAccessController{

    private static instance: AccessController;

     private constructor() {
     }
    async signUp(): Promise<void> {
        try {

            return await new Promise<void>((resolve, reject) => {

            });
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

