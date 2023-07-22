import express, {Router} from "express";
import access from "./access";

const router: Router = express.Router();

router.use("/v1/api/access", access);





export default router;