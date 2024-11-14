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
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaU9iREZnREVIS3oxZmJVS0Z3ZkFJL3dFSUNvYUpQYmtzeXVSanBZbnNXcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieDhnNDNHaTU1NEI0dzM5Y0VIeThxa2tvSGtkTFUySTRiVkp3aS9vSWR6VT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtSmJvVXNnRlNlQVdzZTNrNVBvN01SM2hENjJ1cGtCU29QKzFaNzNaOWx3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLZGVUc2VGWjd1dnNGR3lIMDRzcDNpMm1CQjR1MWcxWS9oNlBEeUw3K1V3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBJWW5lZmhKd0JxdWxKcDBKN0YvVzhTMGlXTldaTUY5WUlYbkJ2MWdBbFE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IloveEZ2aWRNcnQ3VTlLc2VKeS9WSTFZUUt3dTY4MXJ3VkZtUWJkaDBKUTA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV01LVTFCVU5vRnpGaHFaak1tcWFCNlpkUE5HcHF0KzRhSEY4WHhtdWkxcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidXU2UG5VSWtNT0k1N2xSREpLeEtvcG52MXFLYlRzUGZDdnd1a0NoWWNXUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlEQXluL1l3T1lwYVdWcWV1UFZTcnpIRE80ZERSOXhBNGR1VmpJN0ttOCtvais4eGd0U3RkTFIwa0did3ZrR1FOSEgvZmJmNmNuc2gya0ZnNFpNOENRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjksImFkdlNlY3JldEtleSI6ImlXaDF4ZFl5dktyZkdNMkNjZmtWR1ZNUlRHZGNNMTNaZllSa2psREZHMFk9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjZvc0FQUFpSU1hxaUNhV2ZaV2VtbGciLCJwaG9uZUlkIjoiNGYzYTg3OGYtZTdkOC00ZGVjLWJjNWYtNmU0MmM0ZjU3YTIwIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBVcWc3WnJDeFpEc3dUZFp5Y0NZbzR1NUlYbz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIzYWt3KzB2UENVNTg5dEVwRElqZHVxK1lGKzQ9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiS0wyQVhESksiLCJtZSI6eyJpZCI6IjI1NDc5NzYzMzYyNjo2OUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJhcnQuaXN0LmljIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNOV1BxWllHRUt6MTFya0dHQW9nQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJKQnh1bGZoa2ErTTM1OWMzOGhRUHBaMEhtZHdhd0YxamYrOHhMR3duRUhjPSIsImFjY291bnRTaWduYXR1cmUiOiJBN0V6T0xpMkxXWUZFV0cwNkxsZW1HRi9XbjAvaEFvYU9UejZ0eFlDaC9pTUY4RkloOTc0OHVEc1BNKzBLalpjQnFXb3Z1TTBLVUxCaEkzeWt1WjRCUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiNUVGRlJUU05ydWpjR2thRy9Ta2M3dUVsRlVQV3k1Zk5MMFF2WFJNMVV3Wm9WNXZKYTVCc3pLNFZlT1Q2elB2a1hMcDgzZi9WVkYxUE5aNnI1dmRaREE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQ3OTc2MzM2MjY6NjlAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCU1FjYnBYNFpHdmpOK2ZYTi9JVUQ2V2RCNW5jR3NCZFkzL3ZNU3hzSnhCMyJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczMTU3NDQ1OCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFFN2UifQ==',
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
