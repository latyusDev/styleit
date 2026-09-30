import {z} from 'zod'
const transform = (message)=>{
    return z.string().transform((value)=>Number(value)).refine((value)=>!isNaN(value)&&value>0,{
        message
       })
}

export const taskPaymentValidation =  z.object({
   fullName: z.string().min(2,"Full name is required"),
   businessName: z.string().min(2, "Business name  is required"),
   amount: transform('Amount is required and  must be positive number'),
   total: transform('Total is required and  must be positive number'),
   vat: transform('Vat is required and  must be positive number'),
   
})