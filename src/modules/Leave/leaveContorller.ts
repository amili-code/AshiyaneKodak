import { Router, Request, Response, NextFunction } from "express";
import { validateDto } from "../../middlewares";
import { LeaveCreateDto, LeaveUpdateDto } from "./leaveDto";
import { 
  createLeave, 
  getAllLeaves, 
  getLeaveById, 
  getLeavesByTeacherId,
  updateLeave, 
  deleteLeave 
} from "./leaveServices";

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => { 
  try {
    const leaves = await getAllLeaves();
    if (leaves.length === 0) return res.status(200).send([]);
    res.status(200).send(leaves);
  } catch (error) {
    return next({ statusCode: 500, message: `${error}` });
  }
});

router.get("/teacher/:teacherId", async (req: Request, res: Response, next: NextFunction) => { 
  try {
    const teacherId = Number(req.params.teacherId);
    const leaves = await getLeavesByTeacherId(teacherId);
    res.status(200).send(leaves);
  } catch (error) {
    return next({ statusCode: 500, message: `${error}` });
  }
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => { 
  try {
    const leaveId = Number(req.params.id);
    const leaveData = await getLeaveById(leaveId);
    if (!leaveData) {
      return res.status(404).json({ message: 'رکورد مرخصی یافت نشد' });
    }
    res.status(200).send(leaveData);
  } catch (error) {
    return next({ statusCode: 500, message: `${error}` });
  }
});

router.post('/', validateDto(LeaveCreateDto), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await createLeave(req.body);
    if (!data) return next({ statusCode: 400, message: "ثبت مرخصی انجام نشد" });
    res.status(201).send(data);
  } catch (error) {
    return next({ statusCode: 500, message: `${error}` });
  }
});

router.put("/:id", validateDto(LeaveUpdateDto), async (req: Request, res: Response, next: NextFunction) => { 
  try {
    const leaveId = Number(req.params.id);
    const leaveData = await updateLeave(leaveId, req.body);
    if (!leaveData) {
      return next({ statusCode: 404, message: 'رکورد مرخصی یافت نشد' });
    }
    res.status(200).send(leaveData);
  } catch (error) {
    return next({ statusCode: 500, message: `${error}` });
  }
});

router.delete("/:id", async (req: Request, res: Response, next: NextFunction) => { 
  try {
    const leaveId = Number(req.params.id);
    const result = await deleteLeave(leaveId);
    if (!result) {
      return next({ statusCode: 404, message: 'رکورد مرخصی یافت نشد' });
    }
    res.status(200).json({ message: 'رکورد مرخصی با موفقیت حذف شد' });
  } catch (error) {
    return next({ statusCode: 500, message: `${error}` });
  }
});

export default router;