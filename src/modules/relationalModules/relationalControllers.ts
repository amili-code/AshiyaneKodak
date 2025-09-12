import {Router ,type Request ,type Response ,type NextFunction} from "express"
import { getAllChildGradesMax } from "../ChildsGrade/ChildsGradleServices"
import { getAllMotaghayeratsMax } from "../Motaghayerat/MotaghayeratServices";
import { getAllPaymentsMax } from "../Peyment/PaymentServices";

const router = Router()



router.get("/child-gradle" ,async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const data = await getAllChildGradesMax();
        if(!data) return res.status(200).send([]);
        res.status(200).send(data);
    } catch (error) {
        return next({statusCode: 500, message: error });
    } 
})
router.get("/child-moteghayer" ,async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const data = await getAllMotaghayeratsMax();
        if(!data) return res.status(200).send([]);
        res.status(200).send(data);
    } catch (error) {
        return next({statusCode: 500, message: error });
    } 
})

router.get("/child-peyment" ,async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const data = await getAllPaymentsMax();
        if(!data) return res.status(200).send([]);
        res.status(200).send(data);
    } catch (error) {
        return next({statusCode: 500, message: error });
    } 
})

export default router;