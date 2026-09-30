import { z } from "zod";

// for representative sign up form
export const representativeFormValidation = z.object({
  fullname: z.string().min(2, "Full name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(11, "Enter valid phone").max(11, "Enter valid phone"),
  address: z.string().min(3, "Address required"),
  pwd: z.string().min(6, "Password must be at least 6 chars"),
  cpwd: z.string(),
  state: z.string().min(2, "State required"),
  lga: z.string().min(2, "LGA required"),
  gender: z.string().min(1, "Select gender"),
  pic: z.any(),
}).refine((data) => data.pwd === data.cpwd, {
  message: "Passwords do not match",
  path: ["cpwd"],
})
