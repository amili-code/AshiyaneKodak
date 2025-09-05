import {Child} from '../../models';
import fs from 'fs';
import path from 'path';

const childPicDir = path.join(__dirname, '../../../public/ChildPic');

export const createChild = async (data, file) => {
  let imagePath = '';
  if (file) {
    imagePath = `/public/ChildPic/${file.filename}`;
  }
  const child = await Child.create({ ...data, image: imagePath });
  return child;
};

export const getAllChildren = async () => {
  return await Child.findAll();
};

export const getChildById = async (id: number) => {
  return await Child.findByPk(id);
};

export const updateChild = async (id: number, data, file,check) => {
  const child = await Child.findByPk(id);
  if (!child) return null;
  let imagePath 
  if(check){
    imagePath =  child.image;
  }
  else{
    imagePath = "";
  }
  if (file) {
    // حذف عکس قبلی
    if (imagePath) {
      const oldPicPath = path.join(childPicDir, path.basename(imagePath));
      if (fs.existsSync(oldPicPath)) fs.unlinkSync(oldPicPath);
    }
    imagePath = `/public/ChildPic/${file.filename}`;
  }
  await child.update({ ...data, image: imagePath });
  return child;
};

export const deleteChild = async (id: number) => {
  const child = await Child.findByPk(id);
  if (!child) return null;
  // حذف عکس از دایرکتوری
  if (child.image) {
    const picPath = path.join(childPicDir, path.basename(child.image));
    if (fs.existsSync(picPath)) fs.unlinkSync(picPath);
  }
  await child.destroy();
  return true;
};

export const getChildImage = (filename: string) => {
  const filePath = path.join(childPicDir, filename);
  if (fs.existsSync(filePath)) {
    return filePath;
  }
  return null;
};

