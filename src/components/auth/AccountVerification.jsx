import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import m_logo from '@/images/m_logo.png'
import Image from "../global/Image";
import { useNavigate } from "react-router-dom";


export default function VerifyEmail() {
  const navigate = useNavigate();
  const email = localStorage.getItem('email')||null
  useEffect(()=>{
    if(!email){
      navigate(-1)
    }
  },[navigate])
  const handleResend = ()=> navigate('/resendVerificationLink')
  return (
    <div className=" text-center  p-4">
      <Card className="w-full max-w-xl shadow-md mx-auto rounded-lg">
        <CardContent className="p-6 ">
      <Image src={m_logo} className='mx-auto mb-3'/>
          <div>
            <h2 className="text-2xl font-bold">Verify Your Email</h2>

            <p className="text-sm text-gray-500 mt-2">
              We’ve sent a verification link to your email{" "}
              <a className="text-blue-600 underline" href={`mailto:${email}`}>
                {email}
              </a>
              , please check your inbox and click the link to verify your account.
            </p>
            <Button
              className="w-full mt-6 text-white"
              onClick={handleResend}
            >
              Resend Email
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
