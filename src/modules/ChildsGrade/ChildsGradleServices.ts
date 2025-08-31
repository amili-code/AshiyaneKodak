import ChildGrade from '../../models/ChildGrade';

export const createChildGrade = async (data) => {
  return await ChildGrade.create(data);
};

export const getAllChildGrades = async () => {
  return await ChildGrade.findAll();
};

export const getChildGradeById = async (id: number) => {
  return await ChildGrade.findByPk(id);
};

export const updateChildGrade = async (id: number, data) => {
  const grade = await ChildGrade.findByPk(id);
  if (!grade) return null;
  await grade.update(data);
  return grade;
};

export const deleteChildGrade = async (id: number) => {
  const grade = await ChildGrade.findByPk(id);
  if (!grade) return null;
  await grade.destroy();
  return true;
};