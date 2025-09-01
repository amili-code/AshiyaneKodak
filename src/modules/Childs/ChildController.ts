import {Router ,type Request ,type Response ,type NextFunction} from "express"
import { validateDto } from "../../middlewares"
import { ChildCreateDto } from "./DTO/ChildDto"
import upload from "../../middlewares/UploadPicChild"
import { deleteChild, getAllChildren, getChildById, updateChild } from "./ChildServices"
const router = Router()



router.get("/" , async (req: Request, res: Response, next: NextFunction) => { 
    try {
      const children = await getAllChildren();
      if(children.length === 0) return res.status(200).send([])
      res.status(200).send(children);
    } catch (error) {
      return next({ statusCode: 500, message: `${error}` });
    }
})
router.get("/:id" , async (req: Request, res: Response, next: NextFunction) => { 
  try {
    const childId = Number(req.params.id);
    const childData = await getChildById(childId);
    if (!childData) {
      return res.status(200).send({})
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


router.put("/:id" ,upload.single('image'),validateDto(ChildCreateDto) , async (req: Request, res: Response, next: NextFunction) => { 
    try {
    const childId = Number(req.params.id);
    const childData = await updateChild(childId , req.body , req.file);
    if (!childData) {
      next({ statusCode: 404, message: 'کودکی با این  مشخصات یافت نشد' });
    }
    res.status(200).send(childData);
  } catch (error) {
      return next({ statusCode: 500, message: `${error}` });
  }
})
router.delete("/:id" ,async (req: Request, res: Response, next: NextFunction) => { 
    try {
    const childId = Number(req.params.id);
    const childData = await deleteChild(childId);
    if (!childData) {
      return next({ statusCode: 404, message: 'کودکی با این  مشخصات یافت نشد' });
    }
    res.status(200).send(childData);
  } catch (error) {
      return next({ statusCode: 500, message: `${error}` });
  }
})

export default router;