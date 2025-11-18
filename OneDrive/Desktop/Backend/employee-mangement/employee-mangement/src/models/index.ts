import fs from "fs";
import path from "path";
import { Sequelize, Model } from "sequelize";
import configFile from "../config/config.json";

const env = process.env.NODE_ENV || "development";
const config: any = (configFile as any)[env];

// DB container
export const db: any = {};

let sequelize: Sequelize;

// Initialize Sequelize instance
sequelize = config.use_env_variable
  ? new Sequelize(process.env[config.use_env_variable] as string, config)
  : new Sequelize(config.database, config.username, config.password, config);

const modelsPath = __dirname;
fs.readdirSync(modelsPath)
  .filter((file) => {
    return (
      file !== "index.ts" &&
      file !== "index.js" &&
      (file.endsWith(".ts") || file.endsWith(".js"))
    );
  })
  .forEach((file) => {
    const filePath = path.join(modelsPath, file);
    const imported = require(filePath);
    let modelClass: any = null;

    for (const exported of Object.values(imported)) {
      const exp = exported as any; // <-- FIX HERE

      if (
        typeof exp === "function" &&
        Object.getPrototypeOf(exp) === Model &&
        typeof exp.initModel === "function"
      ) {
        modelClass = exp;
        break;
      }
    }

    if (!modelClass) {
      console.warn("Skipping non-model:", file);
      return;
    }

    const model = modelClass.initModel(sequelize);
    const key = model.modelName || model.name;
    db[key] = model;

  });

// Apply associations
Object.keys(db).forEach((name) => {
  if (db[name].associate) {
    db[name].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export { sequelize };
export default db;
