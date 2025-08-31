import {Router ,type Request ,type Response ,type NextFunction} from "express"
import { validateDto } from "../../middlewares"
import { ChildsGradleDto } from "./DTO/ChildsGradleDto"
const router = Router()



router.get("/" , (req: Request, res: Response, next: NextFunction) => { 
    
})
router.get("/:id" , (req: Request, res: Response, next: NextFunction) => { 

})

router.post("/" ,validateDto(ChildsGradleDto) , (req: Request, res: Response, next: NextFunction) => { 
    
})
router.put("/:id" , validateDto(ChildsGradleDto) , (req: Request, res: Response, next: NextFunction) => { 

})
router.delete("/:id" , (req: Request, res: Response, next: NextFunction) => { 

})

export default router;