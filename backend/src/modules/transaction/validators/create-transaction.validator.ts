import { z } from "zod";

export const createTransactionSchema = z.object({

  title: z
    .string()
    .min(2, "Title must be at least 2 characters"),

  amount: z
    .number()
    .positive("Amount must be greater than 0"),

  type: z.enum([
    "INCOME",
    "EXPENSE",
    "TRANSFER"
  ]),

  description: z
    .string()
    .optional(),

  transactionDate: z.coerce.date(),

  accountId: z.uuid()

});