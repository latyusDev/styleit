import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import React, { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { toast } from "sonner"
import { X } from "lucide-react"
import { useAdminCreatorStore } from "@/store/admin/creatoreStore/useAdminCreator"
import { useQuery } from "@tanstack/react-query"
import ErrorMessage from "@/components/global/ErrorMessage"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import UserProfileLoader from "@/components/global/loaders/ProfileLoaders"

const formSchema = z.object({
  accountName: z.string().min(2,"Enter a valid account name"),
  accountNumber: z.string().min(10,"Enter a valid account number")
  .max(10,'account number must not be greater than 10 number'),
  bank: z.string().optional().or(z.literal('')),
})

const EditBankDetails = ({creator,_isLoading,_isError,_error}) => {

  const [loading, setLoading] = useState(false)
  const {getBankCodes,updateBankDetails} = useAdminCreatorStore()

   const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountName: "",
      accountNumber: "",
      bank: "",
    },
  })

    useEffect(() => {
            if(creator){
              const formValues = {
                  accountName: creator?.bank_account_name || '',
                  accountNumber: creator?.bank_acc || '',
                  bank: creator?.bank || '',
              }
              form.reset(formValues)
            }
          }, [creator, form])

   const {data,isLoading,error,isError} = useQuery({
        queryKey:['bank_codes'],
        queryFn:getBankCodes,
        staleTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false
     })

     const userBankName = creator?.bank || 'Select Bank'
     
  const onSubmit = async (data) => {
    const isBankChanged = !!data.bank ;
      const formData = {
          acno:data.accountNumber,
          name:data.accountName,
          bank:isBankChanged ? data.bank:userBankName
        }
    
    try {

      setLoading(true)

      const response = await updateBankDetails(creator?.id,formData)
        toast(response?.message, {
          action: {
            label: <X size={16} />,
          },
        })

    } catch (error) {
      toast.error(error?.response?.data?.message)

    } finally {
      setLoading(false)
    }
  }
  const emptyAccountDetails = !!creator?.bank_account_name 

  return (
    <div className="max-w-xl mx-auto shadow-md p-8 border rounded-md mt-20  bg-gradient-to-tr text-lightGray from-primary to-sidebar to-[35%]">

    {
      _isLoading ? <UserProfileLoader/> :
      _isError ? <ErrorMessage error={_error} /> : <>
        
        <div className="mb-4">
          <h1 className="text-center font-semibold font-lato ">{creator?.firstname}'s Bank Details</h1>
        {
          emptyAccountDetails||
      <p className="text-center ">{creator?.firstname} is yet to update their account details</p>

        }
        </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

          <FormField
            control={form.control}
            name="accountName"
            render={({ field }) => (
              <FormItem>

                <FormLabel>Account Name</FormLabel>

                <FormControl>
                  <Input
                    placeholder="Enter your account name"
                    {...field}
                  />
                </FormControl>

                <FormMessage className="text-red-500" />

              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="accountNumber"
            render={({ field }) => (
              <FormItem>

                <FormLabel>Account Number</FormLabel>

                <FormControl>
                  <Input
                    placeholder="Enter your account number"
                    {...field}
                  />
                </FormControl>

                <FormMessage className="text-red-500" />

              </FormItem>
            )}
          />
            <FormField
                    control={form.control}
                    name="bank"

                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className=' transition-all duration-300  font-[700]'>
                           Bank Name
                        </FormLabel>
                        <FormControl>
                           <Select
                                value={field.value}
                                defaultValue={field.value}
                                onValueChange={(selectedName) => {
                                field.onChange(selectedName)
                               
                              }}
                              >
                            <SelectTrigger data-testid="bank-name" className="w-full border py-6 rounded-xl">
                              <SelectValue placeholder={userBankName } />
                            </SelectTrigger>
                              <SelectContent
                              position="popper"
                              
                              className="bg-white">
                        {isLoading ? (
                           <div data-testid="bank-loader">
                                <Skeleton  className="w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                                <Skeleton  className=" mt-2 w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                                <Skeleton  className=" mt-2 w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                                <Skeleton  className=" mt-2 w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                                <Skeleton  className=" mt-2 w-full h-2 px-8 py-3 text-md font-[700] bg-gradient-to-tr from-primary to-sidebar opacity-[0.8] " />
                            </div>
                        ) : isError ? (
                          <ErrorMessage error={error} />
                        ) : (
                          data?.bank_codes.map((bank) => (
                            <SelectItem key={bank.bank_id} value={bank.bank_name} className="hover:bg-gray-300">
                              {bank.bank_name}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

          <Button
            type="submit"
            className="w-full text-white"
            disabled={loading}
          >
            {loading
              ? "Updating..."
              : "Update Bank Details"}
          </Button>

        </form>
      </Form>
        </>
    }
      

    </div>
  )
}

export default EditBankDetails
