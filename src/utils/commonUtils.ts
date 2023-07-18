import mongoose, {Mongoose} from "mongoose";
import * as os from "os";



export abstract class ConfigHelp {
    private static readonly TIME_INTERVAL: number = 5000;

    public static getCountConnectionMongoose(dbDriver: Mongoose): number {
        if(!dbDriver) throw new Error("dbDriver is null");
        if(!dbDriver.connections) throw new Error("dbDriver.connections is null");
        if(!dbDriver.connections.length) throw new Error("dbDriver.connections.length is null");
        return dbDriver.connections.length;
    }

    public static checkOverload(): void {
        setInterval(() => {
           const count: number = ConfigHelp.getCountConnectionMongoose(mongoose);
           const numCore : number = os.cpus().length;
        }, this.TIME_INTERVAL);
    }

}