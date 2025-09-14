import {Router ,type Request ,type Response ,type NextFunction} from "express"
import { getAllChildGradesMax, getChildGradeByChildId } from "../ChildsGrade/ChildsGradleServices"
import { getAllMotaghayeratsMax, getMotaghayeratByChildId } from "../Motaghayerat/MotaghayeratServices";
import { getAllPaymentsMax, getPaymentByChildId } from "../Peyment/PaymentServices";
import { getChildById } from "../Childs/ChildServices";

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
router.get("/child/:id" ,async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const childData = await getChildById(Number(req.params.id))
        const childGradle = await getChildGradeByChildId(Number(req.params.id))
        const childMoteghayer = await getMotaghayeratByChildId(Number(req.params.id))
        const childPeyment = await getPaymentByChildId(Number(req.params.id))
        const data ={
            childData,
            childGradle,
            childMoteghayer,
            childPeyment,
        }
        res.status(200).send(data)
    } catch (error) {
        return next({statusCode: 500, message: error });
    } 
})

export default router;