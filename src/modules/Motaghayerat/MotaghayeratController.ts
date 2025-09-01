import {Router ,type Request ,type Response ,type NextFunction} from "express"
import { validateDto } from "../../middlewares"
import { MotaghayeratDto } from "./DTO/MotaghayeratDto"
import {createMotaghayerat,deleteMotaghayerat,getAllMotaghayerats,getMotaghayeratById,updateMotaghayerat} from "./MotaghayeratServices"
const router = Router()



router.get("/" ,async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const data = await getAllMotaghayerats()
        if(!data) return res.status(200).send([]);;
        res.status(200).send(data);
    } catch (error) {
        return next({statusCode: 500, message: error });
    }
})
router.get("/:id" ,async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const data = await getMotaghayeratById(req.body.params)
        if(!data) return res.status(200).send({});
        res.status(200).send(data);
    } catch (error) {
        return next({statusCode: 500, message: error });
    }
})

router.post("/" ,validateDto(MotaghayeratDto) , async(req: Request, res: Response, next: NextFunction) => { 
    try {
        const data = await createMotaghayerat(req.body)
        if(!data) return next({statusCode: 400, message: "متغیر ایجاد نشد" });
        res.status(200).send(data);
    } catch (error) {
        return next({statusCode: 500, message: error });
    }
})
router.put("/:id" , validateDto(MotaghayeratDto) ,async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const data = await updateMotaghayerat(Number(req.params.id), req.body)
        if(!data) return next({statusCode: 404, message: "اطلاعات متغیر مد نظر پیدا نشد" });
        res.status(200).send(data);
    } catch (error) {
        return next({statusCode: 500, message: error });
    }
})
router.delete("/:id" ,async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const data = await deleteMotaghayerat(Number(req.params.id))
        if(!data) return next({statusCode: 404, message: "اطلاعات متغیر مد نظر پیدا نشد" });
        res.status(200).send(data);
    } catch (error) {
        return next({statusCode: 500, message: error });
    }
})

export default router;