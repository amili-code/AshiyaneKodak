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

import insuranceController from "./modules/Insurance/insuranceController"
app.use("/insurance", insuranceController);

import leaveContorller from "./modules/Leave/leaveContorller"
app.use("/leave", leaveContorller);

import slaryController from "./modules/Salary/slaryController"
app.use("/salary", slaryController);

import teacherController from "./modules/Teachers/teacherController"
app.use("/teacher", teacherController);

import RelationalControllers from "./modules/relationalModules/relationalControllers";
app.use("/rel", RelationalControllers);

import smsController from "./modules/Sms/smsController";
app.use("/sms", smsController);

app.use(catchHandler)



async function startServer() {
  try {
    const db = getDbConnection();
    await db.authenticate();
    
    // // ابتدا مدل‌های اصلی
    // import {Child,ChildGrade,Motaghayerat,Payment,Insurance,Leave,Salary,Teacher} from './models'
    // await Teacher.sync({ alter: true });
    // await Child.sync({ alter: true });
    
    // // سپس مدل‌های وابسته
    // await Promise.all([
    //     Insurance.sync({ alter: true }),
    //     Leave.sync({ alter: true }),
    //     Salary.sync({ alter: true }),
    //     ChildGrade.sync({ alter: true }),
    //     Motaghayerat.sync({ alter: true }),
    //     Payment.sync({ alter: true })
    // ]);
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
