import { z } from "zod"
 
 
  const loginSchema = z.object({
   email: z.string().min(2,"Email is required."),
   password: z.string().min(2, "Password is required."),
 })

 const adminLoginSchema = z.object({
   email: z.string().email({ message: 'Please enter a valid email address' }),
   pwd: z.string().min(6, { message: 'Password must be at least 6 characters' }),
 });
 
/* one */
const designerRegisterSchema = z.object({
  email: z.string().email().min(2,"Email must be at least 2 characters."),

  firstName: z.string().min(2, "First name must be at least 2 characters."),
  lastName: z.string().min(2,"Last name must be at least 2 characters."),
   state: z.string().min(2, "State is required."),
  business: z.string().min(2, "Business name required"),
  address: z.string().trim().min(2, " Address is required"),
 city: z.string().trim().min(2, "City must be at least 2 characters.").optional().or(z.literal("")),
  lga: z.string().trim().min(2, "LGA must be at least 2 characters.").optional().or(z.literal("")),

  nin: z.string()
    .min(11, "NIN number must be 11 characters.")
    .max(11, 'NIN number must not be greater than 11 number')
    .optional()
    .or(z.literal("")),

  passport: z.string()
    .min(9, "Passport number must be 9 characters.")
    .max(9, 'Passport number must not be greater than 9 number')
    .optional()
    .or(z.literal("")),

  phone: z.string()
    .min(11, "phone number must be 11 characters.")
    .max(11,'Phone number must not be greater than 11 number'),

  code: z.string().min(4, 'if no referral code Enter "0000"'),

  check: z.boolean().refine(val=>val === true, 'you must accept our terms and condition'),

  country: z.string({
    required_error: "Please select a country",
  }).min(1, "Please select a country"),

  gender:z.enum(['Male','Female'],{
    required_error:'Please choose a gender'
  }),

  image: z
    .any()
    .refine((files) => files?.length > 0, {
      message: "Image is required",
    })
    .refine((files) => files?.[0]?.size <= 5000000, {
      message: "File size must be less than 5MB",
    })
    .refine(
      (files) => 
        ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'].includes(files?.[0]?.type),
      {
        message: "Only .jpg,.jpeg,.gif,.png formats are supported",
      }
    ),
   password: z.string().min(8, "Password must be at least 8 characters."),
   confirmPassword: z.string().min(8, "Confirm password is required"),
 })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
.refine(
  (data) => {
    const hasNin = data.nin && data.nin.trim().length === 11
    const hasPassport = data.passport && data.passport.trim().length === 9
    return hasNin || hasPassport
  },
  {
    message: "Either NIN or Passport number is required",
    path: ["nin"],
  }
)
.refine(
  (data) => {
    const hasCity = data.city && data.city.trim().length >= 2
    const hasLga = data.lga && data.lga.trim().length >= 2
    return hasCity || hasLga
  },
  {
    message: "Either City or LGA is required",
    path: ["city"],
  }
)



 const  clientRegisterSchema = z.object({
   email: z.string().email().min(2,"Email must be at least 2 characters."),
  
   firstName: z.string().min(2, "First name is required."),
   lastName: z.string().min(2,"Last name is required."),
   username: z.string().min(2, "Username must be at least 2 characters."),
   address: z.string().min(2, "Address must be at least 2 characters."),
   state: z.string().min(2, "State is required."),
  city: z.string().trim().min(2, "City must be at least 2 characters.").optional().or(z.literal("")),
  lga: z.string().trim().min(2, "LGA must be at least 2 characters.").optional().or(z.literal("")),

  nin: z.string()
    .min(11, "NIN number must be 11 characters.")
    .max(11, 'NIN number must not be greater than 11 number')
    .optional()
    .or(z.literal("")),

  passport: z.string()
    .min(9, "Passport number must be 9 characters.")
    .max(9, 'Passport number must not be greater than 9 number')
    .optional()
    .or(z.literal("")),
   phone: z.string().min(11, "phone number must be 11 characters.").max(11,'Phone number must not be greater than 11 number'),
   code: z.string().min(4, 'if no referral code Enter "0000"'),
   check: z.boolean().refine(val=>val == true, 'you must accept our terms and condition'),
   country: z.string({
     required_error: "Please select a country",
   }).min(1, "Please select a country"),
   gender:z.enum(['Male','Female'],{
     required_error:'Please choose a gender'
     
   }),
   image: z
     .any()
     .refine((files) => files?.length > 0, {
       message: "Image is required",
     })
     .refine((files) => files?.[0]?.size <= 5000000, {
       message: "File size must be less than 5MB",
     })
     .refine(
       (files) => 
         ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'].includes(files?.[0]?.type),
       {
         message: "Only .jpg,.jpeg,.gif,.png formats are supported",
       }
     ),
   password: z.string().min(8, "Password must be at least 8 characters."),
   confirmPassword: z.string().min(8, "Confirm password is required"),
 })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
 
 
 export {loginSchema,designerRegisterSchema,clientRegisterSchema,adminLoginSchema}