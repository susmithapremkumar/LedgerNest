import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

import {
  findUserByEmail,
  createUser,
  createRefreshToken,
  findRefreshToken,
  findUserById
} from "../repository/auth.repository";

import { env }
from "../../../config/env";

import {
  generateAccessToken,
  generateRefreshToken
} from "../../../utils/token";


interface RegisterUserData {
  fullName: string;
  email: string;
  password: string;
}

interface LoginUserData {
  email: string;
  password: string;
}

export const registerUser = async (
  data: RegisterUserData
) => {

  const existingUser =
    await findUserByEmail(data.email);

  if (existingUser) {
    throw new Error(
      "User already exists"
    );
  }

  const passwordHash =
    await bcrypt.hash(
      data.password,
      10
    );

  const user =
    await createUser({
      fullName: data.fullName,
      email: data.email,
      passwordHash
    });

  return {
    message: "User created",
    user: {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role
    }
  };
};

export const loginUser = async (
  data: LoginUserData
) => {

  const user =
    await findUserByEmail(
      data.email
    );

  if (!user) {
    throw new Error(
      "Invalid credentials"
    );
  }

  const isPasswordValid =
    await bcrypt.compare(
      data.password,
      user.passwordHash
    );

  if (!isPasswordValid) {
    throw new Error(
      "Invalid credentials"
    );
  }

  const accessToken =
  generateAccessToken(
    user.id,
    user.role
  );

const refreshToken =
  generateRefreshToken(
    user.id
  );

  await createRefreshToken({

  token:
    refreshToken,

  userId:
    user.id,

  expiresAt:
    new Date(
      Date.now() +
      7 * 24 * 60 * 60 * 1000
    )

});

  return {
  message: "Login successful",

  accessToken,

  refreshToken,

  user: {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role
    }
  };
};

export const refreshAccessToken =
 async (
  refreshToken: string
 ) => {

  const storedToken =
    await findRefreshToken(
      refreshToken
    );

  if (!storedToken) {
    throw new Error(
      "Refresh token not found"
    );
  }

  if (storedToken.revoked) {
    throw new Error(
      "Refresh token revoked"
    );
  }

  if (
    storedToken.expiresAt <
    new Date()
  ) {
    throw new Error(
      "Refresh token expired"
    );
  }

  const payload =
    jwt.verify(
      refreshToken,
      env.REFRESH_TOKEN_SECRET
    ) as {
      userId: string;
    };

  const user =
    await findUserById(
      payload.userId
    );

  if (!user) {
    throw new Error(
      "User not found"
    );
  }

  const accessToken =
    generateAccessToken(
      user.id,
      user.role
    );

  return {
    accessToken
  };

};