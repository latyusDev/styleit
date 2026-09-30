import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { clientPaymentSchema } from '@/validations/ClientPaymentSchema';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/store/useAuth';
import Image from '@/components/global/Image';
import mlogo from '@/images/m_logo.png';
import Cookies from 'js-cookie';
import axios from 'axios';

export default function ClientPayment() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const {
    register,
    handleSubmit,
    formState,
    setValue,
    watch
  } = useForm({
    resolver: zodResolver(clientPaymentSchema),
    defaultValues: {
      custid: '',
      desiid: '',
      amount: '',
    }
  });
  const navigate = useNavigate()
  const { name, bookingId, designerId } = useParams();
  const { user } = useAuth();

  const amount = watch('amount');

  // Automatically calculate VAT and total
 useEffect(() => {
  if (amount && !isNaN(Number(amount))) {
    const vat = (Number(amount) * 0.12).toFixed(2);
    const total = (Number(amount) + Number(vat)).toFixed(2);
    setValue('charges', vat);
    setValue('total', total);
  } else {
    setValue('charges', '');
    setValue('total', '');
  }
}, [amount, setValue]);


  const onSubmit = async (values) => {
    const data = {
      custid: user.id.toString(),
      desiid: designerId,
      amount: values.amount,
      charges: (values.amount*0.12).toFixed(0).toString(),
    };
    const total = (Number(amount) + (0.12*amount)).toFixed(0);
      
    setIsSubmitting(true);
    
    try {
   const response =  await axios.post(`custpayment/${Number(bookingId)}/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
            Accept: 'application/json'
          },
          withCredentials: true  
        }
      );
      if(response.status === 201){
        const userDetails = {
          name,
          total,
          charges:data.charges,
          amount: data.amount,
          reference_no:response?.data.reference_no
  
        }
          localStorage.setItem('userDetails',JSON.stringify(userDetails))
          navigate(`/client/payment/${name}/${bookingId}/${designerId}/confirm_payment`)
      }
      
      setSubmitStatus({
        type: 'success',
        message: 'Payment initialized successfully!'
      });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error.response?.data?.message || 'Failed to submit payment'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (name) setValue('desiid', name);
    if (user?.id) setValue('custid', user.id.toString());
  }, [name, user, setValue]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-xl shadow-lg">
        <CardHeader className="space-y-1">
          <Image src={mlogo} className='w-[40px] h-[40px] mx-auto' />
          <CardTitle className="text-2xl font-bold text-center">Client Payment</CardTitle>
          <CardDescription className="text-center">
            Enter payment details for Styleit Africa
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="mb-4">
            
            <div className="space-y-2">
              <Label htmlFor="desiid">Destination</Label>
              <Input
                id="desiid"
                placeholder="Enter destination ID"
                {...register('desiid')}
                className={`py-6 ${formState.errors.desiid ? 'border-red-500' : ''}`}
              />
              {formState.errors.desiid && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {formState.errors.desiid.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="text"
                placeholder="0.00"
                {...register('amount')}
                className={`py-6 ${formState.errors.amount ? 'border-red-500' : ''}`}
              />
              {formState.errors.amount && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {formState.errors.amount.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="charges">Charges (12% VAT)</Label>
              <Input
                id="charges"
                type="text"
                placeholder="0.00"
                {...register('charges')}
                disabled
                className={`py-6 bg-gray-100 ${formState.errors.charges ? 'border-red-500' : ''}`}
              />
              {formState.errors.charges && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {formState.errors.charges.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="total">Total Amount</Label>
              <Input
                id="total"
                type="text"
                placeholder="0.00"
                {...register('total')}
                disabled
                className="py-6 bg-gray-100"
              />
            </div>

            {submitStatus && (
              <Alert className={submitStatus.type === 'success' ? 'mt-4 border-green-500 bg-green-50' : 'mt-4 border-red-500 bg-red-50'}>
                {submitStatus.type === 'success' ? (
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-red-600" />
                )}
                <AlertDescription className={submitStatus.type === 'success' ? 'mt-4 text-green-800' : 'mt-4 text-red-800'}>
                  {submitStatus.message}
                </AlertDescription>
              </Alert>
            )}

            <Button 
              type="button"
              className="w-full text-white mt-5" 
              disabled={isSubmitting}
              onClick={handleSubmit(onSubmit)}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Submit Payment'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
