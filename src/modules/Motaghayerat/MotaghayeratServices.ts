import {Motaghayerat} from '../../models/';

export const createMotaghayerat = async (data) => {
  return await Motaghayerat.create(data);
};

export const getAllMotaghayerats = async () => {
  return await Motaghayerat.findAll();
};

export const getMotaghayeratById = async (id: number) => {
  return await Motaghayerat.findByPk(id);
};

export const updateMotaghayerat = async (id: number, data) => {
  const motaghayer = await Motaghayerat.findByPk(id);
  if (!motaghayer) return null;
  await motaghayer.update(data);
  return motaghayer;
};

export const deleteMotaghayerat = async (id: number) => {
  const motaghayer = await Motaghayerat.findByPk(id);
  if (!motaghayer) return null;
  await motaghayer.destroy();
  return true;
};