import { Router, Request, Response, NextFunction } from "express";
import { validateDto } from "../../middlewares";
import { TeacherCreateDto, TeacherUpdateDto } from "./teacherDto";
import { 
  createTeacher, 
  getAllTeachers, 
  getTeacherById, 
  updateTeacher, 
  deleteTeacher 
} from "./teacherServices";

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => { 
  try {
    const teachers = await getAllTeachers();
    if (teachers.length === 0) return res.status(200).send([]);
    res.status(200).send(teachers);
  } catch (error) {
    return next({ statusCode: 500, message: `${error}` });
  }
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => { 
  try {
    const teacherId = Number(req.params.id);
    const teacherData = await getTeacherById(teacherId);
    if (!teacherData) {
      return res.status(404).json({ message: 'استاد یافت نشد' });
    }
    res.status(200).send(teacherData);
  } catch (error) {
    return next({ statusCode: 500, message: `${error}` });
  }
});

router.post('/', validateDto(TeacherCreateDto), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await createTeacher(req.body);
    if (!data) return next({ statusCode: 400, message: "ثبت استاد انجام نشد" });
    res.status(201).send(data);
  } catch (error) {
    return next({ statusCode: 500, message: `${error}` });
  }
});

router.put("/:id", validateDto(TeacherUpdateDto), async (req: Request, res: Response, next: NextFunction) => { 
  try {
    const teacherId = Number(req.params.id);
    const teacherData = await updateTeacher(teacherId, req.body);
    if (!teacherData) {
      return next({ statusCode: 404, message: 'استادی با این مشخصات یافت نشد' });
    }
    res.status(200).send(teacherData);
  } catch (error) {
    return next({ statusCode: 500, message: `${error}` });
  }
});

router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => { 
  try {
    const teacherId = Number(req.params.id);
    const result = await deleteTeacher(teacherId);
    if (!result) {
      return next({ statusCode: 404, message: 'استادی با این مشخصات یافت نشد' });
    }
    res.status(200).json({ message: 'استاد با موفقیت حذف شد' });
  } catch (error) {
    return next({ statusCode: 500, message: `${error}` });
  }
});

export default router;