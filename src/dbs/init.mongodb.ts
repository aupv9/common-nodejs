import * as mongoose from "mongoose";
import {ConfigHelp} from "../utils/commonUtils";


const URI =  process.env.MONGO_URL || "mongodb://localhost:27017/test-node";
export class Database implements IDatabase{

    private static instance: Database;
    private constructor() {
        this.connect();
    }

    public connect(type: DatabaseType =  DatabaseType.Mongo): void{
        mongoose.connect(URI).then(() => {
            console.log("Count connection: ", ConfigHelp.getCountConnectionMongoose(type === DatabaseType.Mongo ? mongoose :  null));
        })
        .catch((err) => {
            console.log(err);
        });
    }

    static getInstance(): Database{
        if(!Database.instance)
            Database.instance = new Database();
        return Database.instance;
    }
}

interface IDatabase{
    connect(type: DatabaseType): void;
}

enum DatabaseType{
    Mongo
}

