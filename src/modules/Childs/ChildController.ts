import {Router ,type Request ,type Response ,type NextFunction} from "express"
import { validateDto } from "../../middlewares"
import { ChildCreateDto } from "./DTO/ChildDto"
import upload from "../../middlewares/UploadPicChild"
import { deleteChild, getAllChildren, getChildById, updateChild ,createChild} from "./ChildServices"
import path from 'path';
import fs from "fs"


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
 try {
    const filename = req.params.filename;
    
    // اعتبارسنجی نام فایل
    if (!filename || filename.includes('..') || filename.includes('/')) {
      return res.status(400).send('نام فایل نامعتبر است');
    }

    // استفاده از __dirname که در CommonJS در دسترس است
    const rootDir = path.resolve(__dirname, '../../../public/ChildPic');
    const filePath = path.join(rootDir, filename);

    // بررسی وجود فایل
    if (!fs.existsSync(filePath)) {
      return res.status(404).send('عکس یافت نشد');
    }

    res.sendFile(filePath, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        if (!res.headersSent) {
          res.status(500).send('خطا در ارسال فایل');
        }
      }
    });

  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).send('خطای سرور');
  }
});

router.post('/', upload.single('image'),validateDto(ChildCreateDto) ,async (req: Request, res: Response, next: NextFunction) =>{
  try {
      const data = await createChild(req.body , req.file)
      if(!data) return next({statusCode: 400, message: "ثبت نام انجام نشد" });
      res.status(200).send(data);
  } catch (error) {
      return next({statusCode: 500, message: error });
  }
})
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