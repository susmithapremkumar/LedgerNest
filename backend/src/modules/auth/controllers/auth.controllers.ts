
import { registerUser } from "../services/auth.services";

import { registerSchema } from "../validators/register.validator";

import { NextFunction, Request, Response } from "express";

import { loginSchema } from "../validators/login.validator";

import { loginUser } from "../services/auth.services";

import {  refreshAccessToken } from "../services/auth.services";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const validatedData =
      registerSchema.parse(req.body);

    const result =
      await registerUser(validatedData);

    return res.status(201).json(result);

  } catch (error) {
    next(error);
  }
}
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const validatedData =
      loginSchema.parse(req.body);

    const result =
      await loginUser(validatedData);

    return res
      .status(200)
      .json(result);

  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const {
      refreshToken
    } = req.body;

    const result =
      await refreshAccessToken(
        refreshToken
      );

    return res
      .status(200)
      .json(result);

  } catch (error) {

    next(error);

  }

};
// export const register = async (
//   req: Request,
//   res: Response
// ) => {

//   const validatedData =
//     registerSchema.parse(req.body);

//   const result =
//     await registerUser(validatedData);

//   return res
//     .status(201)
//     .json(result);
// };