import {
 Request,
 Response,
 NextFunction
} from "express";

import jwt, {
  JwtPayload
} from "jsonwebtoken";

import { env }
from "../config/env";

interface AuthPayload
  extends JwtPayload {

  userId: string;
  role: string;

}

export const authenticate =
 (
  req: Request,
  res: Response,
  next: NextFunction
 ) => {

  try {

    const authHeader =
      req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith(
        "Bearer "
      )
    ) {

      return res
        .status(401)
        .json({
          message:
            "Unauthorized"
        });

    }

    const token =
      authHeader.split(
        " "
      )[1];

    const decoded =
  jwt.verify(
    token,
    env.JWT_SECRET
  ) as AuthPayload;

    req.user =
      decoded;

    next();

  } catch {

    return res
      .status(401)
      .json({
        message:
          "Invalid token"
      });

  }

};