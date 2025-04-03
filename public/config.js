"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
const MONGO_DB_USER = process.env.MONGO_DB_USER || '';
const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD || '';
const MONGO_URL = `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@attminiapp.rpheg.mongodb.net/attminiapp?retryWrites=true&w=majority&appName=attminiapp`;
const SERVER_PORT = process.env.PORT ? Number(process.env.PORT) : 5000;
const config = {
    mongo: {
        url: MONGO_URL,
    },
    server: {
        port: SERVER_PORT,
    },
};
config.mongo.url = MONGO_URL;
config.server.port = SERVER_PORT;
exports.default = config;
//# sourceMappingURL=config.js.map