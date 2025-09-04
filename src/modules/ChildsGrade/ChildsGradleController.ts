import {Router ,type Request ,type Response ,type NextFunction} from "express"
import { validateDto } from "../../middlewares"
import { ChildsGradleDto } from "./DTO/ChildsGradleDto"
import { createChildGrade,deleteChildGrade ,getAllChildGrades,getChildGradeById,updateChildGrade} from "./ChildsGradleServices"

const router = Router()



router.get("/" ,async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const data = await getAllChildGrades()
        if(!data) return res.status(200).send([]);;
        res.status(200).send(data);
    } catch (error) {
        return next({statusCode: 500, message: error });
    }
    
})
router.get("/:id" ,async (req: Request, res: Response, next: NextFunction) => { 
    try {

        const data = await getChildGradeById(Number(req.params.id))
        if(!data) return res.status(200).send({});;
        res.status(200).send(data);
    } catch (error) {
        return next({statusCode: 500, message: error });
    }
})
router.post("/" , validateDto(ChildsGradleDto) , async (req: Request, res: Response, next: NextFunction) => { 
        try {
        const data = await createChildGrade(req.body)
        if(!data) return next({statusCode: 400, message: "ثبت نام انجام نشد" });
        res.status(200).send(data);
    } catch (error) {
        return next({statusCode: 500, message: error });
    }
})
router.put("/:id" , validateDto(ChildsGradleDto) ,async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const data = await updateChildGrade(Number(req.params.id) , req.body)
        if(!data) return next({statusCode: 404, message: "اطلاعات این مقطع ثبت نامی یافت نشد!" });
        res.status(200).send(data);
    } catch (error) {
        return next({statusCode: 500, message: error });
    }
})
router.delete("/:id" ,async (req: Request, res: Response, next: NextFunction) => { 
   try {
        const data = await deleteChildGrade(Number(req.params.id))
        if(!data) return next({statusCode: 404, message: "اطلاعات این مقطع ثبت نامی یافت نشد!" });
        res.status(200).send(data);
    } catch (error) {   
        return next({statusCode: 500, message: error });
    }
})

export default router;