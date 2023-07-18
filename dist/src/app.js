"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const init_mongodb_1 = require("./dbs/init.mongodb");
// init database
const database = init_mongodb_1.Database.getInstance();
database.connect();
const app = (0, express_1.default)();
// middlewares
app.use((0, morgan_1.default)('dev'));
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
// routes
app.get('/', (req, res, next) => {
    return res.status(200).json({
        message: 'Hello World!'.repeat(100000)
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map