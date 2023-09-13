import helmet from "helmet";
import morgan from "morgan";
import express, {Express} from "express";
import compression from "compression";

import {Database} from "./dbs/init.mongodb";


import routes from "./routes";


// init database

const database: Database = Database.getInstance();
database.connect();
// ConfigHelp.checkOverload();

const app: Express = express();

const cwd = process.cwd();
console.log(cwd)

// middlewares
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// routes
app.use('/', routes);



export default app;