import { prisma } from "../../../prisma/prisma";

import {
  createTransaction,
  getTransactionsByUserId,
  findTransactionById,
  updateTransaction,
  deleteTransaction
} from "../repository/transaction.repository";

import {
  findAccountById,
  updateAccountBalance
} from "../../account/repository/account.repository";

interface CreateTransactionData {

  title: string;

  amount: number;

  type: "INCOME" | "EXPENSE" | "TRANSFER";

  description?: string;

  transactionDate: Date;

  accountId: string;

}

interface UpdateTransactionData {

  title: string;

  amount: number;

  type: "INCOME" | "EXPENSE" | "TRANSFER";

  description?: string;

  transactionDate: Date;

}

export const createUserTransaction = async (
  data: CreateTransactionData
) => {

  return prisma.$transaction(async (tx) => {

    const account =
      await findAccountById(
        data.accountId
      );

    if (!account) {
      throw new Error("Account not found");
    }

    let newBalance =
      Number(account.balance);

    if (data.type === "INCOME") {

      newBalance += data.amount;

    } else if (data.type === "EXPENSE") {

      newBalance -= data.amount;

    }

    const transaction =
      await createTransaction(
        tx,
        data
      );

    await updateAccountBalance(
      tx,
      account.id,
      newBalance
    );

    return {

      message:
        "Transaction created successfully",

      transaction

    };

  });

};

export const getUserTransactions = async (
  userId: string
) => {

  const transactions =
    await getTransactionsByUserId(userId);

  return {

    message: "Transactions fetched successfully",

    transactions

  };

};

export const updateUserTransaction = async (

  transactionId: string,

  data: UpdateTransactionData

) => {

  return prisma.$transaction(async (tx) => {

    // Find the existing transaction
    const existingTransaction =
      await findTransactionById(transactionId);

    if (!existingTransaction) {
      throw new Error("Transaction not found");
    }

    // Find the account
    const account =
      await findAccountById(existingTransaction.accountId);

    if (!account) {
      throw new Error("Account not found");
    }

    let newBalance = Number(account.balance);

    // Reverse the old transaction
    if (existingTransaction.type === "INCOME") {

      newBalance -= Number(existingTransaction.amount);

    } else if (existingTransaction.type === "EXPENSE") {

      newBalance += Number(existingTransaction.amount);

    }

    // Apply the new transaction
    if (data.type === "INCOME") {

      newBalance += data.amount;

    } else if (data.type === "EXPENSE") {

      newBalance -= data.amount;

    }

    // Update transaction
    const updatedTransaction =
      await updateTransaction(
        tx,
        transactionId,
        data
      );

    // Update account balance
    await updateAccountBalance(
      tx,
      account.id,
      newBalance
    );

    return {

      message: "Transaction updated successfully",

      transaction: updatedTransaction

    };

  });

};

export const deleteUserTransaction = async (
  transactionId: string
) => {

  return prisma.$transaction(async (tx) => {

    // Find the transaction
    const existingTransaction =
      await findTransactionById(transactionId);

    if (!existingTransaction) {
      throw new Error("Transaction not found");
    }

    // Find the account
    const account =
      await findAccountById(existingTransaction.accountId);

    if (!account) {
      throw new Error("Account not found");
    }

    let newBalance = Number(account.balance);

    // Reverse the transaction effect
    if (existingTransaction.type === "INCOME") {

      newBalance -= Number(existingTransaction.amount);

    } else if (existingTransaction.type === "EXPENSE") {

      newBalance += Number(existingTransaction.amount);

    }

    // Delete transaction
    await deleteTransaction(
      tx,
      transactionId
    );

    // Update account balance
    await updateAccountBalance(
      tx,
      account.id,
      newBalance
    );

    return {

      message: "Transaction deleted successfully"

    };

  });

};