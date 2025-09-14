import {Payment  , Child , ChildGrade , Motaghayerat} from "../../models"

export const createPayment = async (data) => {
  return await Payment.create(data);
};

export const getAllPayments = async () => {
  return await Payment.findAll();
};

export const getAllPaymentsMax = async () => {
  return await Payment.findAll({
    include: [
      {
        model: Child,
        as: 'child',
        attributes: ['id', 'firstName', 'lastName', 'gender', 'fatherPhone', 'motherPhone', 'age', 'birthdate', 'address'] // فیلدهای مورد نیاز از Child
      },
      {
        model: ChildGrade,
        as: 'childGrade',
        attributes: ['id', 'grade', 'registerDate', 'endDate', 'remainingAmount'] // فیلدهای مورد نیاز از ChildGrade
      },
      {
        model: Motaghayerat,
        as: 'motaghayerat',
        attributes: ['id', 'title', 'remainingAmount'] // فیلدهای مورد نیاز از Motaghayerat
      }
    ]
  });
};

export const getPaymentById = async (id: number) => {
  return await Payment.findByPk(id);
};

export const getPaymentByChildId = async (id: number) => {
  return await Payment.findAll({where:{
    childId : id
  }});
};

export const updatePayment = async (id: number, data) => {
  const payment = await Payment.findByPk(id);
  if (!payment) return null;
  await payment.update(data);
  return payment;
};

export const deletePayment = async (id: number) => {
  const payment = await Payment.findByPk(id);
  if (!payment) return null;
  await payment.destroy();
  return true;
};