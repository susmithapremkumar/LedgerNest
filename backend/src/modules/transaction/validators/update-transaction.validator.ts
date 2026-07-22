import { z } from "zod";

export const updateTransactionSchema = z.object({

  title: z.string().min(1, "Title is required"),

  amount: z.number().positive("Amount must be greater than 0"),

  type: z.enum(["INCOME", "EXPENSE", "TRANSFER"]),

  description: z.string().optional(),

  transactionDate: z.coerce.date(),

});