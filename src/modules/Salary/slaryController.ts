import { Router, Request, Response, NextFunction } from "express";
import { validateDto } from "../../middlewares";
import { SalaryCreateDto, SalaryUpdateDto } from "./salaryDto";
import { 
  createSalary, 
  getAllSalaries, 
  getSalaryById, 
  getSalariesByTeacherId,
  updateSalary, 
  deleteSalary 
} from "./salaryServices";

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => { 
  try {
    const salaries = await getAllSalaries();
    if (salaries.length === 0) return res.status(200).send([]);
    res.status(200).send(salaries);
  } catch (error) {
    return next({ statusCode: 500, message: `${error}` });
  }
});

router.get("/teacher/:teacherId", async (req: Request, res: Response, next: NextFunction) => { 
  try {
    const teacherId = Number(req.params.teacherId);
    const salaries = await getSalariesByTeacherId(teacherId);
    res.status(200).send(salaries);
  } catch (error) {
    return next({ statusCode: 500, message: `${error}` });
  }
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => { 
  try {
    const salaryId = Number(req.params.id);
    const salaryData = await getSalaryById(salaryId);
    if (!salaryData) {
      return res.status(404).json({ message: 'رکورد حقوق یافت نشد' });
    }
    res.status(200).send(salaryData);
  } catch (error) {
    return next({ statusCode: 500, message: `${error}` });
  }
});

router.post('/', validateDto(SalaryCreateDto), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await createSalary(req.body);
    if (!data) return next({ statusCode: 400, message: "ثبت حقوق انجام نشد" });
    res.status(201).send(data);
  } catch (error) {
    return next({ statusCode: 500, message: `${error}` });
  }
});

router.put("/:id", validateDto(SalaryUpdateDto), async (req: Request, res: Response, next: NextFunction) => { 
  try {
    const salaryId = Number(req.params.id);
    const salaryData = await updateSalary(salaryId, req.body);
    if (!salaryData) {
      return next({ statusCode: 404, message: 'رکورد حقوق یافت نشد' });
    }
    res.status(200).send(salaryData);
  } catch (error) {
    return next({ statusCode: 500, message: `${error}` });
  }
});

router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => { 
  try {
    const salaryId = Number(req.params.id);
    const result = await deleteSalary(salaryId);
    if (!result) {
      return next({ statusCode: 404, message: 'رکورد حقوق یافت نشد' });
    }
    res.status(200).json({ message: 'رکورد حقوق با موفقیت حذف شد' });
  } catch (error) {
    return next({ statusCode: 500, message: `${error}` });
  }
});

export default router;