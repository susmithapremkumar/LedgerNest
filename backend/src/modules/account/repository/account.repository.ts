import { Prisma } from "@prisma/client";

import { prisma }
from "../../../prisma/prisma";

export const createAccount =
 async (
  data: {
    name: string;
    balance: number;
    userId: string;
  }
 ) => {

  return prisma.account.create({

    data: {

      name: data.name,

      balance: data.balance,

      userId: data.userId

    }

  });

};

export const getAccountsByUserId =
 async (
  userId: string
 ) => {

  return prisma.account.findMany({

    where: {
      userId
    },

    orderBy: {
      createdAt: "desc"
    }

  });

};

export const findAccountById =
 async (
  accountId: string
 ) => {

  return prisma.account.findUnique({

    where: {
      id: accountId
    }

  });

};

export const updateAccountBalance =
 async (

  tx: Prisma.TransactionClient,

  accountId: string,

  balance: number

 ) => {

  return tx.account.update({

    where: {
      id: accountId
    },

    data: {
      balance
    }

  });

};