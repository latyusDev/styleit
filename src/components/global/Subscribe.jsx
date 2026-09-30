import React from "react";
import { useForm } from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";



const subscribeSchema = z.object({
   email:z.string().min(5,'Email is required')
  })
const Subscribe = ()=>{

     const form = useForm({
        resolver:zodResolver(subscribeSchema),
        defaultValues:{
            email:'',
        }
      })
    
    
      const onSubmit = (values)=>{
      }
    return(
        <div className="font-lato">
        <h1 className="capitalize text-center text-2xl md:text-3xl text-primary mb-7">Subscribe to our newsletter</h1>

             <Form {...form} className='flex-[0.5]'>
                            <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-5">

                              <div className="flex gap-9 items-start mx-auto max-w-[700px] bdorder-[4px] mb-10"> 
                              <div className='basis-[70%]'>
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                            <FormControl>
                                                <Input type="email" placeholder="Email" className="w-full text-lg text-black bg-white border border-secondary 
                                                 placeholder:font-lato placeholder-secondary pl-9 py-7 rounded-2xl outline-[0]" {...field} />
                                            </FormControl>
                                            <FormMessage className="text-red-500" />
                                            </FormItem>
                                        )}
                                        />

                                        
                              </div>
                               <div>
                               <Button type="submit" className='w-full text-white rounded-xl text-lg py-7 font-[700] px-6 md:px-16'>Subscribe</Button>
                            </div>
                            </div>
                            </form>
                        </Form>
        </div>
    )
}

export default Subscribe