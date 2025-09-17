import { Insurance } from '../../models';
import { InsuranceCreateDto, InsuranceUpdateDto } from './insuranceDto';

export const createInsurance = async (data) => {
  const insurance = await Insurance.create(data);
  return insurance;
};

export const getAllInsurances = async () => {
  return await Insurance.findAll({ include: ['teacher'] });
};

export const getInsuranceById = async (id: number) => {
  return await Insurance.findByPk(id, { include: ['teacher'] });
};

export const getInsurancesByTeacherId = async (teacherId: number) => {
  return await Insurance.findAll({ 
    where: { teacherId },
    include: ['teacher'] 
  });
};

export const updateInsurance = async (id: number, data: InsuranceUpdateDto) => {
  const insurance = await Insurance.findByPk(id);
  if (!insurance) return null;
  
  await insurance.update(data);
  return insurance;
};

export const deleteInsurance = async (id: number) => {
  const insurance = await Insurance.findByPk(id);
  if (!insurance) return null;
  
  await insurance.destroy();
  return true;
};