import * as z from 'zod';

export const clientPaymentSchema = z.object({
  custid: z.string()
    .min(1, 'Customer ID is required')
    .trim(),
  desiid: z.string()
    .min(1, 'Destination ID is required')
    .trim(),
  amount: z.string()
    .min(1, 'Amount is required')
    .refine((val) => !isNaN(Number(val)), {
      message: 'Amount must be a valid number'
    })
    .refine((val) => Number(val) > 0, {
      message: 'Amount must be greater than 0'
    })
 
});


