import {AbsResponse, SignUpPayload} from "../payload/payload";
import {AccessService} from "../services/access.service";
import {NextFunction, Request, Response} from "express";

interface IAccessController{
    signUp(req: Request,  response: Response,  next: NextFunction): Promise<void>;
}

interface ResponseSignUp{
    message: string;
}

const accessService: AccessService = AccessService.getInstance();

 export class AccessController implements IAccessController{

    private static instance: AccessController;

     private constructor() {
     }
     async signUp(req: Request,  response: Response,  next: NextFunction): Promise<void> {
        try {
            const signUpPayload: SignUpPayload = req.body;
            response.status(200).json(await accessService.signUp(signUpPayload));
        }
        catch (error) {
            next(error);
        }
    }

    public static getInstance(): AccessController {
         if (!AccessController.instance) {
            AccessController.instance = new AccessController();
        }
        return AccessController.instance;
    }
}

