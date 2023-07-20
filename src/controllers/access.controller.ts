import {AbsResponse, SignUpPayload} from "../payload/payload";
import {AccessService} from "../services/access.service";

interface IAccessController{
    signUp(request: any,  response: any,  next: any): Promise<AbsResponse<string>>;
}

interface ResponseSignUp{
    message: string;
}

const accessService: AccessService = AccessService.getInstance();

 export class AccessController implements IAccessController{

    private static instance: AccessController;

     private constructor() {
     }
    async signUp(req: any,  response: any,  next: any): Promise<AbsResponse<string>> {
        try {
            const signUpPayload: SignUpPayload = req.body;
            return response.status(200).json(await accessService.signUp(signUpPayload));
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

