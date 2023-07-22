
import express, {NextFunction, Request, Response, Router} from "express";

import { AccessController } from "../../controllers/access.controller";


const router: Router = express.Router();

const accessController: AccessController = AccessController.getInstance();

router.post("/shop/sign-up", async (req:Request, res: Response, next: NextFunction) =>{
    await accessController.signUp(req, res, next);
});


export default router;