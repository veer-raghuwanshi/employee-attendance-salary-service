// generate-config.ts
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

dotenv.config();

// Read CLI args
const argv = yargs(hideBin(process.argv)).argv as {
  environment?: string;
};

const env = argv.environment || "development";

// Paths
const configDir = path.join(__dirname, "src/config");
const configFile = path.join(configDir, "config.json");

// Create config directory if missing
if (!fs.existsSync(configDir)) {
  fs.mkdirSync(configDir, { recursive: true });
}

// Create config object (Sequelize format)
const config: Record<string, any> = {
  [env]: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    DB_NAME: process.env.DB_NAME,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRE: process.env.JWT_EXPIRE,
  },
};

// Write config.json
fs.writeFile(configFile, JSON.stringify(config, null, 2), (err) => {
  if (err) {
    console.error("Error writing config.json:", err);
  } else {
    console.log(`✔ config.json generated for environment: ${env}`);
  }
});
