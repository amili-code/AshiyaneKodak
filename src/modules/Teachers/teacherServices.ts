import { Teacher } from '../../models';
import { TeacherCreateDto, TeacherUpdateDto } from './teacherDto';

export const createTeacher = async (data) => {
  const teacher = await Teacher.create(data);
  return teacher;
};

export const getAllTeachers = async () => {
  return await Teacher.findAll();
};

export const getTeacherById = async (id: number) => {
  return await Teacher.findByPk(id);
};

export const updateTeacher = async (id: number, data: TeacherUpdateDto) => {
  const teacher = await Teacher.findByPk(id);
  if (!teacher) return null;
  
  await teacher.update(data);
  return teacher;
};

export const deleteTeacher = async (id: number) => {
  const teacher = await Teacher.findByPk(id);
  if (!teacher) return null;
  
  await teacher.destroy();
  return true;
};