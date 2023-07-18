"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const mongoose = __importStar(require("mongoose"));
const dotenv_1 = require("dotenv");
const URI = process.env.MONGO_URL || "mongodb://localhost:27017/db";
class Database {
    constructor() {
        (0, dotenv_1.config)();
        this.connect();
    }
    connect(type = DatabaseType.Mongo) {
        mongoose.connect(URI).then(() => {
            console.log("Connected to database");
        })
            .catch((err) => {
            console.log(err);
        });
    }
    static getInstance() {
        if (!Database.instance)
            Database.instance = new Database();
        return Database.instance;
    }
}
exports.Database = Database;
var DatabaseType;
(function (DatabaseType) {
    DatabaseType[DatabaseType["Mongo"] = 0] = "Mongo";
})(DatabaseType || (DatabaseType = {}));
//# sourceMappingURL=init.mongodb.js.map