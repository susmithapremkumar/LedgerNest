import { Request, Response, NextFunction } from "express";

import { createTransactionSchema } from "../validators/create-transaction.validator";

import { updateTransactionSchema } from "../validators/update-transaction.validator";

import {
  createUserTransaction,
  getUserTransactions,
  updateUserTransaction,
  deleteUserTransaction
} from "../services/transaction.services";

export const createTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const validatedData =
      createTransactionSchema.parse(req.body);

    const result =
      await createUserTransaction(validatedData);

    return res.status(201).json(result);

  } catch (error) {

    next(error);

  }

};

export const getTransactions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const result =
      await getUserTransactions(req.user!.userId);

    return res.status(200).json(result);

  } catch (error) {

    next(error);

  }

};

export const updateTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const validatedData =
      updateTransactionSchema.parse(req.body);

    const transactionId = String(req.params.id);

const result =
  await updateUserTransaction(
    transactionId,
    validatedData
  );

    return res.status(200).json(result);

  } catch (error) {

    next(error);

  }

};

export const deleteTransaction = async (

  req: Request,

  res: Response,

  next: NextFunction

) => {

  try {

    const transactionId = String(req.params.id);

    const result =
      await deleteUserTransaction(transactionId);

    return res.status(200).json(result);

  } catch (error) {

    next(error);

  }

};