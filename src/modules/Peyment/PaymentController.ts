import {Router ,type Request ,type Response ,type NextFunction} from "express"
import { validateDto } from "../../middlewares"
import { PaymentDto } from "./DTO/PaymentDto"
import { createPayment,deletePayment,getAllPayments,getPaymentById,updatePayment} from "./PaymentServices"
import { getChildGradeById, updateChildGrade } from "../ChildsGrade/ChildsGradleServices"
import { getMotaghayeratById, updateMotaghayerat } from "../Motaghayerat/MotaghayeratServices"

const router = Router()



router.get("/" ,async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const data = await getAllPayments()
        if(!data) return res.status(200).send([]);;
        res.status(200).send(data);
    } catch (error) {
        return next({statusCode: 500, message: error });
    }
})
router.get("/:id" ,async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const data = await getPaymentById(Number(req.params.id))
        if(!data) return res.status(200).send({});;
        res.status(200).send(data);
    } catch (error) {
        return next({statusCode: 500, message: error });
    }
})
router.post("/" , validateDto(PaymentDto),async (req: Request, res: Response, next: NextFunction) => { 
     try {
        let updated:any
        const data = await createPayment(req.body)
        if(!data) return next({statusCode: 400, message: "ثبت نام انجام نشد" });
       
       
        if( req.body.childGradeId ){
            try {
                const childGradle = await getChildGradeById(req.body.childGradeId) 
                childGradle.remainingAmount = childGradle.remainingAmount - req.body.amount
                updated = await updateChildGrade(req.body.childGradeId , childGradle.dataValues)
            } catch (error) {
                const del = await deletePayment(Number(data.id))
                return next({statusCode: 400, message: "قیمت پرداختی از قیمت لازمه بیشتر است" });
            }
        }

        if(req.body.motaghayeratId){
            try {
                const moteghayer = await getMotaghayeratById(req.body.motaghayeratId)
                moteghayer.remainingAmount = moteghayer.remainingAmount - req.body.amount
                
                updated = await updateMotaghayerat(req.body.motaghayeratId , moteghayer.dataValues)
            } catch (error) {
                const del = await deletePayment(Number(data.id))
                return next({statusCode: 400, message: "قیمت پرداختی از قیمت لازمه بیشتر است" });
            }
        }
        
       
        res.status(200).send({ data , updated});
    } catch (error) {
        return next({statusCode: 500, message: error });
    }
})

router.put("/:id" , validateDto(PaymentDto) ,async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const data = await updatePayment(Number(req.params.id), req.body)
        if(!data) return next({statusCode: 404, message: "اطلاعات این پرداخت ثبت نامی یافت نشد!" });
        res.status(200).send(data);
    } catch (error) {
        return next({statusCode: 500, message: error });
    }
})
router.delete("/:id" ,async (req: Request, res: Response, next: NextFunction) => { 
   try {
        const data = await deletePayment(Number(req.params.id))
        if(!data) return next({statusCode: 404, message: "اطلاعات این پرداخت ثبت نامی یافت نشد!" });
        res.status(200).send(data);
    } catch (error) {   
        return next({statusCode: 500, message: error });
    }
})

export default router;