import {Router ,type Request ,type Response ,type NextFunction} from "express"
import { validateDto } from "../../middlewares"
import { MotaghayeratDto } from "./DTO/MotaghayeratDto"
const router = Router()



router.get("/" , (req: Request, res: Response, next: NextFunction) => { 
    
})
router.get("/:id" , (req: Request, res: Response, next: NextFunction) => { 

})

router.post("/" ,validateDto(MotaghayeratDto) , (req: Request, res: Response, next: NextFunction) => { 
    
})
router.put("/:id" , validateDto(MotaghayeratDto) , (req: Request, res: Response, next: NextFunction) => { 

})
router.delete("/:id" , (req: Request, res: Response, next: NextFunction) => { 

})

export default router;