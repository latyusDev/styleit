import axios from 'axios'
import Cookies from 'js-cookie'
import {create} from 'zustand'

export const useAuthService = create((set)=>({
    isLoginForm:false,
    isSignUpForm:false,
    role:'Client',
    setIsLoginForm:(isLoginForm)=>{

        set((state)=>({...state,isLoginForm}))
    },
    setIsSignUpForm:(isSignUpForm)=>{
        set((state)=>({...state,isSignUpForm}))
    },
    setRole:(role)=>{
        set((state)=>({...state,role}))
    },
    getCountries:async()=>{
       try{
         const response = await axios.get('countrycheck',
            {
          headers:{
            Authorization:`Bearer ${Cookies.get('token')}`,
            Accept:'application/json'
          },
          withCredentials:true  
        });
        return response?.data;
       }catch(error){
            return error
       }
    },
     getStates:async()=>{
       try{
         const response = await axios.get('listofstate',
            {
          headers:{
            Authorization:`Bearer ${Cookies.get('token')}`,
            Accept:'application/json'
          },
          withCredentials:true  
        });
        return response?.data;
       }catch(error){
            return error
       }
    },
     getLocalGovernment:async(id)=>{
       try{
         const response = await axios.get(`lga/${id}`,
            {
          headers:{
            Authorization:`Bearer ${Cookies.get('token')}`,
            Accept:'application/json'
          },
          withCredentials:true  
        });
        return response?.data;
       }catch(error){
            return error
       }
    },
     uploadNin:async(pic)=>{
       try{
         const response = await axios.put(`/user_verification`,{pic},
            {
          headers:{
            Authorization:`Bearer ${Cookies.get('ninToken')}`,
            'Content-Type':'multipart/form-data'
          },
          withCredentials:true  
        });
        return response;
       }catch(error){
            return error
       }
    }

}))