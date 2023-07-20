import express, {Router} from "express";

import { AccessController } from "../../controllers/access.controller";
import {SignUpPayload} from "../../payload/payload";


const router: Router = express.Router();

const accessController: AccessController = AccessController.getInstance();

router.post("/shop/sign-up", (req, res, next) =>{
    const signUpPayload: SignUpPayload = req.body;
    accessController.signUp(signUpPayload).then((data)=>{
        res.status(200).json(data);
    }).catch((err)=>{
        res.status(400).json(err);
    });
});


export default router;