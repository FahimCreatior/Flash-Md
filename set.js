const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;
module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNk45WFlsRXBzazV0d1lOWVZ6TTRDM1pmRVpXb1N5aEsyNytNaVJPRlpWTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicXgwZWcvQVZORnkwWERFQUtiQVBwUVcvOGFrZ3ZxRWVNMUc2V3N3d3dBTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrRXI2cmx4bC9IempzZEZ0Qk45VG0rZGxZcEdGLzh3cllsaHNqaG1vdVgwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFY0U5TldRRHMxbUJNSDB5Ty9OLy9RZUNsQmNnSVovVnV0YmViamlNWERFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVBSXR5cEMzY3hlNlNsQ1lvaGNvelNGcEJyWFp4dThWckxCQnNVNkN1MWs9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImYzOGRxRlE2TDhaVEg4blRpTWFhNXU1dU1CYjZRa3JVczBZVWFyNlUrbXM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic0pXTFV2ZWNJSFBFTm1OM0U1MjNYcEdnTkJMOG1lcllKMS85bUMxMmowND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTGZiTXNPa0tBdkZka25KaXlrZ0xwUzBldFV0dnJyS054R1lhbUZoeGhXdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkY1RGdLL2I4RGZabzhET0VQYjNyZVEydFFXaHg5VktlMnFobnF5c0xiR1hSaDFVL3Q3MnpIdGRReDY5Y1NMLzQ2b0lpNEdRaWlZcGtoODNyc1dUTkFBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTg5LCJhZHZTZWNyZXRLZXkiOiJjNlN5VWJwZ2hCVGx5ekJOaVd2aXdnQzFPUU15Witxekh4YkdrNG11eW9zPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDc5NzYzMzYyNkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJGRjBBNUZEMkRCOTEyNzczRjZCOTVFQTBBQzcyNDNEMCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzI3Nzg3MzY0fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJNSEhQVkdkc1RqeVNuVjRCZF9jNXFBIiwicGhvbmVJZCI6IjkyYWEwODU1LTEzYTMtNGE1Ni04NDIzLWZjYjAyNzg5ZDAwOSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJOUmlmTFpnS2hoVUJ5YTdiV2FBSU9RblZQTjg9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidTVndlVBRVczWDcxTVphRXhsbXBMRDdWSDhBPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkNHNFY5V1M3IiwibWUiOnsiaWQiOiIyNTQ3OTc2MzM2MjY6NThAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiRGVQQ01hc3RlciJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTlNQcVpZR0VOTGk3N2NHR0JvZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiSkJ4dWxmaGthK00zNTljMzhoUVBwWjBIbWR3YXdGMWpmKzh4TEd3bkVIYz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiRDBXdFgzQjNNOFlKTXlHMWxiWHFmanhsV2dUY2xiSWZ2TEtQNjE1OUxxWk96Z3JNYnRhVXBkRURUN242NGEzMTYxbTA3T090dlEyVlM2RXNWc0xUQnc9PSIsImRldmljZVNpZ25hdHVyZSI6IjgyeE96R2xmSWhLaGVuQWQ5blBYb2JsYWRNYW1xUURhMlFtUE8ySUgvbGtES1k4dVV2WE94WGpiaE9YQWVtOHU2Umg3VXI0N3ZYaGc2SUU5TTJsQkNRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0Nzk3NjMzNjI2OjU4QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlNRY2JwWDRaR3ZqTitmWE4vSVVENldkQjVuY0dzQmRZMy92TVN4c0p4QjMifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3Mjc3ODczNjAsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRTdXIn0=',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "254797633626",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'off',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || 'online',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "off",
    ANTICALL: process.env.ANTICALL || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech"
        : "postgresql://giftedtech_ke:9BzoUeUQO2owLEsMjz5Vhshva91bxF2X@dpg-crice468ii6s73f1nkt0-a.oregon-postgres.render.com/api_gifted_tech",
    /* new Sequelize({
        dialect: 'sqlite',
        storage: DATABASE_URL,
        logging: false,
    })
    : new Sequelize(DATABASE_URL, {
        dialect: 'postgres',
        ssl: true,
        protocol: 'postgres',
        dialectOptions: {
            native: true,
            ssl: { require: true, rejectUnauthorized: false },
        },
        logging: false,
    }), */
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
