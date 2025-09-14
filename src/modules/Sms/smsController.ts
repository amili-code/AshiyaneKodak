import {Router ,type Request ,type Response ,type NextFunction} from "express"
import { smsService } from "./smsServices";



const router = Router()



router.post("/send-one" , async (req: Request, res: Response, next: NextFunction) => { 
    try {

        const result = await smsService.sendSMS({
          mobile: req.body.mobile,
          message: req.body.message
        });
        res.send(`price : ${result.message} , ${result.status}`);
    } catch (error) {
      return next({ statusCode: 500, message: `${error}` });
    }
})


export default router;