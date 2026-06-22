import { prisma }
from "../../../prisma/prisma";

export const findUserByEmail =
 async (
  email: string
 ) => {

  return prisma.user.findUnique({
   where: {
    email
   }
  });

};

export const createUser =
 async (
  data: {
   fullName: string;
   email: string;
   passwordHash: string;
  }
 ) => {

  return prisma.user.create({
   data
  });

};

export const createRefreshToken =
 async (
  data: {
   token: string;
   userId: string;
   expiresAt: Date;
  }
 ) => {

  return prisma.refreshToken.create({
   data
  });

};

export const findUserById =
 async (
  id: string
 ) => {

  return prisma.user.findUnique({
   where: {
    id
   }
  });

};

export const findRefreshToken =
 async (
  token: string
 ) => {

  return prisma.refreshToken.findUnique({
    where: {
      token
    }
  });

};