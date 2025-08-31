import express from 'express';
import cors from 'cors';
import { ENV, logger, getDbConnection } from './helper';


const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes group
import ChildController from "./modules/Childs/ChildController"
app.use("/children", ChildController);



import ChildsGradleController from "./modules/ChildsGrade/ChildsGradleController"
app.use("/children/gradle", ChildsGradleController);


import MotaghayeratController from "./modules/Motaghayerat/MotaghayeratController"
app.use("/children/gradle", MotaghayeratController);






import { catchHandler } from './middlewares';
app.use(catchHandler)




async function startServer() {
  try {
    const db = getDbConnection();
    await db.authenticate();

    // سینک مدل‌ها با دیتابیس (میگریشن خودکار)
    // await ChildGrade.sync({ alter: true });
    logger.info("✅ Database migrated & connected successfully");

    app.listen(ENV.PORT, () => {
      logger.info(`🚀 Server running at http://localhost:${ENV.PORT}`);
    });
  } catch (error) {
    logger.error("❌ Database connection or migration failed:", error);
    process.exit(1);
  }
}

startServer();
