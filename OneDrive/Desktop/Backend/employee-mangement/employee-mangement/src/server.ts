import app from "./app";
import db from "./models";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    await db.sequelize.authenticate();
    console.log("Database connected successfully.");
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
}

startServer();
