import {Payment} from "../../models"

export const createPayment = async (data) => {
  return await Payment.create(data);
};

export const getAllPayments = async () => {
  return await Payment.findAll();
};

export const getPaymentById = async (id: number) => {
  return await Payment.findByPk(id);
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