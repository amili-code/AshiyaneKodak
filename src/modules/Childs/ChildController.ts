import {Router ,type Request ,type Response ,type NextFunction} from "express"
import { validateDto } from "../../middlewares"
import { ChildCreateDto } from "./DTO/ChildDto"
import upload from "../../middlewares/UploadPicChild"
import { getChildById } from "./ChildServices"
const router = Router()



router.get("/" , (req: Request, res: Response, next: NextFunction) => { 
    
})
router.get("/:id" , async (req: Request, res: Response, next: NextFunction) => { 
  try {
    const childId = Number(req.params.id);
    const childData = await getChildById(childId);
    if (!childData) {
      return next({ statusCode: 404, message: "بچه‌ای با این شناسه پیدا نشد." });
    }
    res.status(200).send(childData);
  } catch (error) {
      return next({ statusCode: 500, message: `${error}` });
  }
})

router.get('/image/:filename', (req, res) => {
  const filePath = req.params.filename;
  if (!filePath) return res.status(404).send('عکس یافت نشد');
  res.sendFile(filePath);
});

router.post("/" , upload.single("image"),validateDto(ChildCreateDto) , (req: Request, res: Response, next: NextFunction) => { 
    
})
router.put("/:id" ,validateDto(ChildCreateDto) ,  (req: Request, res: Response, next: NextFunction) => { 

})
router.delete("/:id" , (req: Request, res: Response, next: NextFunction) => { 

})

export default router;