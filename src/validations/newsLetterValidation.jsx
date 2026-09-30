import { z } from "zod"
 
 
const newsLetterSchema = z.object({
   email: z.string().min(2,"Email is required"),
   name: z.string().min(2, "Full name must be at least 2 characters."),
 })
 

export default newsLetterSchema