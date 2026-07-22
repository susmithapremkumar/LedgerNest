import { Request, Response, NextFunction } from "express";

import { createAccountSchema }
from "../validators/create-account.validator";

import { createUserAccount }
from "../services/account.services";

import { getUserAccounts} from "../services/account.services";

export const createAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const validatedData =
      createAccountSchema.parse(req.body);

    const result =
      await createUserAccount({

        ...validatedData,

        userId: req.user!.userId

      });

    return res
      .status(201)
      .json(result);

  } catch (error) {

    next(error);

  }

};

export const getAccounts =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    try {

      const result =
        await getUserAccounts(
          req.user!.userId
        );

      return res
        .status(200)
        .json(result);

    } catch (error) {

      next(error);

    }

};