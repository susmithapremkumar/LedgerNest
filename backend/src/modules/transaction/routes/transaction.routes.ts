import { Router } from "express";

import { authenticate }
from "../../../middlewares/auth.middleware";

import {
  createTransaction, getTransactions, updateTransaction, deleteTransaction }
from "../controllers/transaction.controllers";

const router = Router();

router.post("/", authenticate, createTransaction);

router.get("/", authenticate, getTransactions);

router.put("/:id", authenticate, updateTransaction);

router.delete("/:id", authenticate, deleteTransaction);

export default router;