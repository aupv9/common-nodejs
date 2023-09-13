import mongoose from "mongoose";
import * as os from "os";
import * as crypto from "crypto";
import {KeyPairKeyObjectResult} from "crypto";
import * as bcrypt from "bcrypt";

export abstract class ConfigHelp {
    private static readonly TIME_INTERVAL: number = 5000;
    private static readonly THRESHOLD_OVERLOAD: number = 2;


    public static getCountConnectionMongoose(): number {
        if(!mongoose) throw new Error("dbDriver is null");
        if(!mongoose.connections) throw new Error("dbDriver.connections is null");
        if(!mongoose.connections.length) throw new Error("dbDriver.connections.length is null");
        return mongoose.connections.length;
    }

    public static checkOverload(): void {
        setInterval(() => {
           const countConnectionMongoose: number = ConfigHelp.getCountConnectionMongoose();
           const numCore : number = os.cpus().length;
           const capacityConnection: number = numCore * this.THRESHOLD_OVERLOAD;
           const usedMemory =  process.memoryUsage();

           console.log(`Active connections: ${countConnectionMongoose}`);
           console.log('Memory Usage:');
           console.log(`Heap Total: ${this.formatBytes(usedMemory.heapTotal)}`);
           console.log(`Heap Used: ${this.formatBytes(usedMemory.heapUsed)}`);
           console.log(`RSS: ${this.formatBytes(usedMemory.rss)}`);

            if(capacityConnection ==  countConnectionMongoose + 5 ){
               console.log("Overload!!!");
           }
        }, this.TIME_INTERVAL);
    }

    private static formatBytes(bytes: number): string {
        const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 Byte';
        const i: number = parseInt(String(Math.floor(Math.log(bytes) / Math.log(1024))));
        return Math.round(bytes / Math.pow(1024, i) * 100 ) / 100 + ' ' + sizes[i];
    }



}

export interface KeyPair {
    privateKey: string;
    publicKey: string;
}

export abstract class CommonUtils {

    public static hashPassword(password: string): string {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    }

    public static generateKeyPair(): KeyPairKeyObjectResult {
        return crypto.generateKeyPairSync('rsa', {
            modulusLength: 4096
        });
    }
}