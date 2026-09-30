import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, X } from "lucide-react";
import m_logo from '@/images/m_logo.png'
import Image from "../global/Image";
import { useAuthService } from "@/store/useAuthService";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import NinEmailForm from "./NinEmailForm";


export default function UploadNin() {
  const [image, setImage] = useState(null);
  const [file,setFile] = useState(null)
  const [serverState,setServerState] = useState({isLoading:false,isReady:false,isError:false,error:null})
  const {uploadNin} = useAuthService();
  const navigate = useNavigate();
  
  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    setFile(file)
    if (file) {
      const preview = URL.createObjectURL(file);
      setImage(preview);
      setFile(file)
    }
  };
  const handleRemove = () => {
    setImage(null);
  };

  const handleNinUpload = async()=>{
    try{
      setServerState({...serverState,isLoading:true})
    const result = await uploadNin(file)

     if(result?.status === 401){
      setServerState({...serverState,isLoading:false})
       toast(result?.response?.data?.message||'Something went wrong,try again', {
        action: { label: <X size={16} /> },
      });
    }
    if(result?.status === 200){
        toast("Account verified successfully, kindly login", {
            action: { label: <X size={16} /> }
        });
        Cookies.remove('ninToken')
       navigate('/login')
    }
   
    }catch(error){
        setServerState({...serverState,error})
          toast(error?.response?.data?.message||'Something went wrong,try again', {
        action: { label: <X size={16} /> },
      });
    }finally{
        setServerState({...serverState,isLoading:false})
    }
  }

 


  return (
    <div className=" text-center p-4">
      <Card className="w-full max-w-xl mx-auto my-16 shadow-md rounded-lg">
        <CardContent className="p-6 mb-3">
            <Image src={m_logo} className='mx-auto'/>
        {
            serverState.isReady ?   
        <div className="">
          <div className="mb-3">
            <h1 className="text-2xl font-bold">Upload NIN</h1>
            <p className="text-sm text-gray-500 mt-2">
              Upload a clear image of your NIN slip or card
            </p>
          </div>
          {!image ? (
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-16 cursor-pointer hover:bg-gray-50">
              <span className="text-sm text-gray-500">Click to upload</span>
              <Input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleUpload}
              />
            </label>
          ) : (
            <div className="relative">
              <img
                src={image}
                alt="NIN Preview"
                className="w-full h-56 object-cover rounded-xl"
              />

              <button
                onClick={handleRemove}
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-100"
              >
                <X size={18} />
              </button>
            </div>
          )}

          <Button disabled={!image||serverState.isLoading} onClick={handleNinUpload} className="w-full mt-5  text-white">
                 {serverState.isLoading ? <span  className="flex items-center gap-2 "><Loader2 className="size-6 animate-spin"/> Uploading...</span>:' Upload'} 
          </Button>
          </div>
            :

           <NinEmailForm 
           serverState={serverState} 
           setServerState={setServerState}/>
        }
        </CardContent>

      </Card>
    </div>
  );
}
