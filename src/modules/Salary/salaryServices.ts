import { Salary } from '../../models';
import { SalaryCreateDto, SalaryUpdateDto } from './salaryDto';

export const createSalary = async (data) => {
  const salary = await Salary.create(data);
  return salary;
};

export const getAllSalaries = async () => {
  return await Salary.findAll({ include: ['teacher'] });
};

export const getSalaryById = async (id: number) => {
  return await Salary.findByPk(id, { include: ['teacher'] });
};

export const getSalariesByTeacherId = async (teacherId: number) => {
  return await Salary.findAll({ 
    where: { teacherId },
    include: ['teacher'] 
  });
};

export const updateSalary = async (id: number, data: SalaryUpdateDto) => {
  const salary = await Salary.findByPk(id);
  if (!salary) return null;
  
  await salary.update(data);
  return salary;
};

export const deleteSalary = async (id: number) => {
  const salary = await Salary.findByPk(id);
  if (!salary) return null;
  
  await salary.destroy();
  return true;
};