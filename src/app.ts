import helmet from "helmet";
import morgan from "morgan";
import express, {Express} from "express";
import compression from "compression";

import {Database} from "./dbs/init.mongodb";
import {ConfigHelp} from "./utils/commonUtils";


import routes from "./routes";


// init database

const database: Database = Database.getInstance();
database.connect();
// ConfigHelp.checkOverload();

const app: Express = express();


// middlewares
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());



// routes
app.use('/', routes);



export default app;