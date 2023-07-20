
import express, {Router} from "express";

import { AccessController } from "../../controllers/access.controller";


const router: Router = express.Router();

const accessController: AccessController = AccessController.getInstance();

router.post("/shop/sign-up", (req, res, next) =>{
    accessController.signUp(req, res, next);
});


export default router;