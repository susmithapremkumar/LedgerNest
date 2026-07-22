import { Router } from "express";

import { authenticate }
from "../../../middlewares/auth.middleware";

import {
  createAccount, getAccounts
}
from "../controllers/account.controllers";

const router = Router();

router.post(
  "/",
  authenticate,
  createAccount
);

router.get(
  "/",
  authenticate,
  getAccounts
);

export default router;