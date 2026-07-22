import { Prisma, TransactionType } from "@prisma/client";

import { prisma }
from "../../../prisma/prisma";

interface CreateTransactionData {

  title: string;

  amount: number;

  type: TransactionType;

  description?: string;

  transactionDate: Date;

  accountId: string;

}

interface UpdateTransactionData {

  title: string;

  amount: number;

  type: TransactionType;

  description?: string;

  transactionDate: Date;

}

export const createTransaction = async (

  tx: Prisma.TransactionClient,

  data: CreateTransactionData

) => {

  return tx.transaction.create({

    data

  });

};
 
export const getTransactionsByUserId =
 async (
  userId: string
 ) => {

  return prisma.transaction.findMany({

    where: {

      account: {

        userId

      }

    },

    include: {

      account: {

        select: {

          id: true,

          name: true

        }

      }

    },

    orderBy: {

      transactionDate: "desc"

    }

  });

};

export const findTransactionById = async (
  transactionId: string
) => {

  return prisma.transaction.findUnique({

    where: {
      id: transactionId
    }

  });

};

export const updateTransaction = async (

  tx: Prisma.TransactionClient,

  transactionId: string,

  data: UpdateTransactionData

)  => {

  return tx.transaction.update({
  where: {
    id: transactionId
  },
  data: {
    title: data.title,
    amount: data.amount,
    type: data.type,
    description: data.description,
    transactionDate: data.transactionDate
  }
});

};

export const deleteTransaction = async (

  tx: Prisma.TransactionClient,

  transactionId: string

) => {

  return tx.transaction.delete({

    where: {
      id: transactionId
    }

  });

};