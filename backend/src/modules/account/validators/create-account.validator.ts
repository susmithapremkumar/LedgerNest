import { z } from "zod";

export const createAccountSchema = z.object({

  name: z
    .string()
    .min(2, "Account name must be at least 2 characters"),

  balance: z
    .number()
    .min(0, "Balance cannot be negative")

});