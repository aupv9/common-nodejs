import * as mongoose from "mongoose";


const URI =  process.env.MONGODB_URI || "mongodb://localhost:27017/test-node";

const URI_CL= process.env.MONGO_URL_CL || "mongodb+srv://aupv96:123456ABC@cluster0.vgkqqhu.mongodb.net/?retryWrites=true&w=majority";
export class Database implements IDatabase{

    private static instance: Database;
    private constructor() {
        this.connect();
    }

    public connect(type: DatabaseType =  DatabaseType.Mongo): void{
        mongoose.connect(URI)
            .then(() => {
                console.log("Connection MongoDB success!!");
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

