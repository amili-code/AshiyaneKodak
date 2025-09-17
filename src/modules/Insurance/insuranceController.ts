import { Router, Request, Response, NextFunction } from "express";
import { validateDto } from "../../middlewares";
import { InsuranceCreateDto, InsuranceUpdateDto } from "./insuranceDto";
import { 
  createInsurance, 
  getAllInsurances, 
  getInsuranceById, 
  getInsurancesByTeacherId,
  updateInsurance, 
  deleteInsurance 
} from "./insuranceServices";

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => { 
  try {
    const insurances = await getAllInsurances();
    if (insurances.length === 0) return res.status(200).send([]);
    res.status(200).send(insurances);
  } catch (error) {
    return next({ statusCode: 500, message: `${error}` });
  }
});

router.get("/teacher/:teacherId", async (req: Request, res: Response, next: NextFunction) => { 
  try {
    const teacherId = Number(req.params.teacherId);
    const insurances = await getInsurancesByTeacherId(teacherId);
    res.status(200).send(insurances);
  } catch (error) {
    return next({ statusCode: 500, message: `${error}` });
  }
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => { 
  try {
    const insuranceId = Number(req.params.id);
    const insuranceData = await getInsuranceById(insuranceId);
    if (!insuranceData) {
      return res.status(404).json({ message: 'رکورد بیمه یافت نشد' });
    }
    res.status(200).send(insuranceData);
  } catch (error) {
    return next({ statusCode: 500, message: `${error}` });
  }
});

router.post('/', validateDto(InsuranceCreateDto), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await createInsurance(req.body);
    if (!data) return next({ statusCode: 400, message: "ثبت بیمه انجام نشد" });
    res.status(201).send(data);
  } catch (error) {
    return next({ statusCode: 500, message: `${error}` });
  }
});

router.put("/:id", validateDto(InsuranceUpdateDto), async (req: Request, res: Response, next: NextFunction) => { 
  try {
    const insuranceId = Number(req.params.id);
    const insuranceData = await updateInsurance(insuranceId, req.body);
    if (!insuranceData) {
      return next({ statusCode: 404, message: 'رکورد بیمه یافت نشد' });
    }
    res.status(200).send(insuranceData);
  } catch (error) {
    return next({ statusCode: 500, message: `${error}` });
  }
});

router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => { 
  try {
    const insuranceId = Number(req.params.id);
    const result = await deleteInsurance(insuranceId);
    if (!result) {
      return next({ statusCode: 404, message: 'رکورد بیمه یافت نشد' });
    }
    res.status(200).json({ message: 'رکورد بیمه با موفقیت حذف شد' });
  } catch (error) {
    return next({ statusCode: 500, message: `${error}` });
  }
});

export default router;