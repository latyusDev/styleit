import axios from "axios";
import Cookies from "js-cookie";
import { create } from "zustand";



export const useProfileStore = create((set,get)=>({


    getProfileDetails:async(user)=>{
        try{
            const response = await axios.get(`${user.role==='designer'?'designer':'customer'}/profile`,{
            headers:{
              Authorization:`Bearer ${Cookies.get('token')}`,
              'Content-Type': 'application/json',
              Accept:'application/json'
            },
            withCredentials:true
          })
          return response
        }catch(e){

            throw(e)
        }
    },
    updateProfileDetails:async({user,data})=>{
       try{
         const response =  await axios.put(`${user?.role==='designer'?'designer':'customer'}/profile`,data,{
         headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
       })
       return response
       }catch(e){
        throw(e)
       }
       
      },
    updateBankDetails:async(data)=>{
       try{
         const response = await axios.post('designer/bankdetail/',data,{
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                }
            })
            return response;
       }catch(e){
        throw(e)
       }
       
      },
}))