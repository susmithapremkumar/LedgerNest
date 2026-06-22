import jwt, { SignOptions } from "jsonwebtoken";

import { env } from "../config/env";

export const generateAccessToken = (
  userId: string,
  role: string
) => {

  return jwt.sign(
    {
      userId,
      role
    },
    env.JWT_SECRET,
    {
      expiresIn:
        env.JWT_EXPIRES_IN as SignOptions["expiresIn"]
    }
  );

};

export const generateRefreshToken = (
  userId: string
) => {

  return jwt.sign(
    {
      userId
    },
    env.REFRESH_TOKEN_SECRET,
    {
      expiresIn:
        env.REFRESH_TOKEN_EXPIRES_IN as SignOptions["expiresIn"]
    }
  );

};