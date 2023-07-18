import helmet from "helmet";
import morgan from "morgan";
import express, {Express} from "express";
import compression from "compression";

import {Database} from "./dbs/init.mongodb";



// init database

const database: Database = Database.getInstance();
database.connect();


const app: Express = express();


// middlewares
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())


// routes
app.get('/', (req, res, next) => {
    return res.status(200).json({
        message: 'Hello World!'.repeat(100000)
    })
});




export default app;