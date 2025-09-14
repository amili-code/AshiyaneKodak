import ChildGrade from '../../models/ChildGrade';
import { Child } from '../../models';
import { where } from 'sequelize';

export const createChildGrade = async (data) => {
  return await ChildGrade.create(data);
};

export const getAllChildGrades = async () => {
  return await ChildGrade.findAll();
};

export const getAllChildGradesMax = async () => {
  return await ChildGrade.findAll({
    include: [{
      model: Child,
      as: 'child', // استفاده از alias تعریف شده در ارتباط
      attributes: ['id', 'firstName', 'lastName', 'gender', 'age' , 'image' , 'fatherPhone' , 'motherPhone','birthdate' ] // فیلدهای مورد نیاز
    }]
  });
};

export const getChildGradeById = async (id: number) => {
  return await ChildGrade.findByPk(id);
};

export const getChildGradeByChildId = async (id: number) => {
  return await ChildGrade.findAll({where:{
    childId : id
  }});
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