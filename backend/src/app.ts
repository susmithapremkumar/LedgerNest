import express
from "express";

import cors
from "cors";

import helmet
from "helmet";

import cookieParser
from "cookie-parser";

import authRoutes
from "./modules/auth/routes/auth.routes";

import { errorMiddleware } from "./middlewares/error.middleware";

import adminRoutes
from "../src/modules/admin/routes/admin.routes";

import accountRoutes
from "./modules/account/routes/account.routes";

import transactionRoutes
from "./modules/transaction/routes/transaction.routes";

const app =
 express();

app.use(
  "/api/admin",
  adminRoutes
);

app.use(
 helmet()
);

app.use(
 cors({
  origin: "*",
  credentials: true
 })
);

app.use(
 cookieParser()
);

app.use(
 express.json()
);

app.get(
 "/health",
 (
  req,
  res
 ) => {
  res.json({
   status: "ok"
  });
 }
);

app.use(
 "/api/auth",
 authRoutes
);

app.use(
  "/api/accounts",
  accountRoutes
);

app.use(
  "/api/transactions",
  transactionRoutes
);

app.use(errorMiddleware);

export default app;