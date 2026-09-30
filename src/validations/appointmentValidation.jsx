import { z }  from "zod";

export const bookAppointmentSchema = z.object({
   fullName:z.string().min(1,'select a designer'),
  bookingDate: z.date({
    required_error: "Booking date  is required",
  }).refine(
    (date) => !isNaN(date.getTime()),
    {
      message:  "Booking date  is required",
    }
  ),
  collectionDate: z.date({
    required_error: "Collection date  is required",
  }).refine(
    (date) => !isNaN(date.getTime()),
    {
      message:  "Collection date  is required", 
    }
  ),
   
   bookingTime: z.string().min(5,'Booking time is required and must be in 00:00 format'),
   collectionTime: z.string().min(5,'Collection time is required and must be in 00:00 format')
 })

 

export const directBookingSchema = z.object({
  bookingDate: z.date({
    required_error: "Booking date  is required",
  }).refine(
    (date) => !isNaN(date.getTime()),
    {
      message:  "Booking date  is required",
    }
  ),
  collectionDate: z.date({
    required_error: "Collection date  is required",
  }).refine(
    (date) => !isNaN(date.getTime()),
    {
      message:  "Collection date  is required", 
    }
  ),
   
   bookingTime: z.string().min(5,'Booking time is required and must be in 00:00 format'),
   collectionTime: z.string().min(5,'Collection time is required and must be in 00:00 format')
 })

 