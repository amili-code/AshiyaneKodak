import { Leave } from '../../models';
import { LeaveCreateDto, LeaveUpdateDto } from './leaveDto';

export const createLeave = async (data) => {
  const leave = await Leave.create(data);
  return leave;
};

export const getAllLeaves = async () => {
  return await Leave.findAll({ include: ['teacher'] });
};

export const getLeaveById = async (id: number) => {
  return await Leave.findByPk(id, { include: ['teacher'] });
};

export const getLeavesByTeacherId = async (teacherId: number) => {
  return await Leave.findAll({ 
    where: { teacherId },
    include: ['teacher'] 
  });
};

export const updateLeave = async (id: number, data: LeaveUpdateDto) => {
  const leave = await Leave.findByPk(id);
  if (!leave) return null;
  
  await leave.update(data);
  return leave;
};

export const deleteLeave = async (id: number) => {
  const leave = await Leave.findByPk(id);
  if (!leave) return null;
  
  await leave.destroy();
  return true;
};