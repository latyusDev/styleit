import { z } from "zod";

export const designerEditFormSchema = z.object({
  email: z.string().email().min(2,"Email must be at least 2 characters."),
  firstName: z.string().min(2, "First name must be at least 2 characters."),
  lastName: z.string().min(2,"Last name must be at least 2 characters."),
  address: z.string().min(2, "address must be at least 2 characters."),
  mobile: z.string().min(11, "mobile number must be 11 characters."),
  bank_acc: z.string().min(10, "account number must be 10 characters.").max(10,'account number must not be greater than 10 number').optional().or(z.literal('')),
  bank: z.string().min(2, 'bank name is required').optional().or(z.literal('')),
  accountName: z.string().min(2, 'account name is required').optional().or(z.literal('')),
  lga: z.string().optional(),
  state:z.string().optional(),
  country:z.string().optional(),
  cities:z.string().optional(),
  states:z.string().optional(),
  image: z.union([
    z.string(), // Allow string URLs for existing images
    z.any().optional()
  ]).optional(),
})


