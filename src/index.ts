import express from 'express';
import cors from 'cors';
import { ENV, logger, getDbConnection } from './helper';
import { catchHandler, consoleLogger } from './middlewares';

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());



app.use(consoleLogger)



// routes group
import ChildController from "./modules/Childs/ChildController"
app.use("/children", ChildController);



import ChildsGradleController from "./modules/ChildsGrade/ChildsGradleController"
app.use("/gradle", ChildsGradleController);


import MotaghayeratController from "./modules/Motaghayerat/MotaghayeratController"
app.use("/moteghayer", MotaghayeratController);

import PaymentController from "./modules/Peyment/PaymentController"
app.use("/payment", PaymentController);

import RelationalControllers from "./modules/relationalModules/relationalControllers";
app.use("/rel", RelationalControllers);

import smsController from "./modules/Sms/smsController";
app.use("/sms", smsController);

app.use(catchHandler)



async function startServer() {
  try {
    const db = getDbConnection();
    await db.authenticate();
    
    // سینک مدل‌ها با دیتابیس (میگریشن خودکار)
    // import {Child,ChildGrade,Motaghayerat,Payment} from './models'
    // await Child.sync({ alter: true });
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
