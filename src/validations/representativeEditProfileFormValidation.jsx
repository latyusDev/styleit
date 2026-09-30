import { z } from "zod";

// for representative sign up form
export const representativeEditProfileFormValidation = z.object({
  fullname: z.string().min(2, "Full name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(11, "Enter valid phone").max(11, "Enter valid phone"),
  address: z.string().min(3, "Address required"),
  state: z.string().optional(),
  lga: z.string().optional(),
  gender: z.string().optional(),
})