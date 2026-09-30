import { z } from "zod"
 
 export const clientEditFormSchema = z.object({
   email: z.string().email().min(2,"Email is required."),
   firstName: z.string().min(2, "First name is required."),
   lastName: z.string().min(2,"Last name is required."),
   address: z.string().min(2, "Address is required."),
   mobile: z.string().min(11, "Phone number must be 11 characters.").max(11,'Phone number must not be greater than 11 number'),
   lga: z.string().optional(),
   image: z
     .any().optional(),
    country:z.string().optional(), 
    state:z.string().optional(), 
    cities:z.string().optional(),
    states:z.string().optional(),
 })

const optionalString = z.preprocess(
  (val) => (val === '' || val === null || val === undefined ? undefined : val),
  z.string().optional()
)

const optionalStringMin2 = z.preprocess(
  (val) => (val === '' || val === null || val === undefined ? undefined : val),
  z.string().min(2).optional()
)

export const adminClientEditFormSchema = z.object({
  email: z.string().email().min(2, "Email is required."),
  firstName: z.string().min(2, "First name is required."),
  lastName: z.string().min(2, "Last name is required."),
  address: z.string().min(2, "Address is required."),
  phoneNumber: z.string().min(11).max(11, 'Must be 11 digits'),

  username: optionalStringMin2,
  businessName: optionalString,
  lga: optionalString,
  country: optionalString,
  state: optionalString,
  states: optionalString,
  cities: optionalString,
  picture: optionalString,
  gender: optionalString,
})