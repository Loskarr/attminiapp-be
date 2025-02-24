// filepath: /d:/HCMUT/luan van tot nghiep/attminiapp-be/src/config.ts
import * as dotenv from 'dotenv';

dotenv.config();

// DECLARE ALL VARIABLES
const MONGO_DB_USER = process.env.MONGO_DB_USER || '';
const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD || '';

// console.log(MONGO_DB_USER, MONGO_DB_PASSWORD);
const MONGO_URL = `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@attminiapp.rpheg.mongodb.net/attminiapp?retryWrites=true&w=majority&appName=attminiapp`;
const SERVER_PORT = process.env.PORT ? Number(process.env.PORT) : 5000;

// CREATE CONFIG OBJECT
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

// EXPORT
export default config;