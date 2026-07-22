import { createAccount } from "../repository/account.repository";

import { getAccountsByUserId } from "../repository/account.repository";

interface CreateAccountData {
  name: string;
  balance: number;
  userId: string;
}

export const createUserAccount = async (
  data: CreateAccountData
) => {

  const account = await createAccount({
    name: data.name,
    balance: data.balance,
    userId: data.userId
  });

  return {
    message: "Account created successfully",
    account
  };

};

export const getUserAccounts =
  async (
    userId: string
  ) => {

    const accounts =
      await getAccountsByUserId(
        userId
      );

    return {
      accounts
    };

};