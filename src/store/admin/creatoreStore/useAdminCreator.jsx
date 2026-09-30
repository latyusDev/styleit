import axios from "axios";
import Cookies from "js-cookie";
import { create } from "zustand";

export const useAdminCreatorStore = create((set,get)=>({
    getCreators: async(page)=> {
        const response = await axios.get(`admin/designers/?page=${page}`,{
            headers:{
              Authorization:`Bearer ${Cookies.get('token')}`,
              'Content-Type': 'application/json',
              Accept:'application/json'
            }
          })
          return response?.data
    },
    getCreatorSubscriptions:async(page)=> {
        const response = await axios.get(`admin/subscription?page=${page}`,{
            headers:{
              Authorization:`Bearer ${Cookies.get('token')}`,
              'Content-Type': 'application/json',
              Accept:'application/json'
            }
          })
          return response?.data
    },
    getCreatorDetails:async(id)=> {
        const response = await axios.get(`designers/${id}/`,{
            headers:{
              Authorization:`Bearer ${Cookies.get('token')}`,
              'Content-Type': 'application/json',
              Accept:'application/json'
            }
          })
          return response?.data
    },
    getCreatorPayments:async(page)=> {
        const response = await axios.get(`admin/payment?page=${page}`,{
            headers:{
              Authorization:`Bearer ${Cookies.get('token')}`,
              'Content-Type': 'application/json',
              Accept:'application/json'
            }
          })
          return response?.data
    },
    searchCreators:async(page,debouncedSearch)=> {
        const response = await axios.post(`admin/search_creator/?page=${page}`,{search:debouncedSearch},{
            headers:{
              Authorization:`Bearer ${Cookies.get('token')}`,
              'Content-Type': 'application/json',
              Accept:'application/json'
            }
          })
          return response?.data
    },
    searchSubscriptions:async(page,debouncedSearch)=> {
        const response = await axios.post(`admin/search_subcription/?page${page}`,{search:debouncedSearch},{
            headers:{
              Authorization:`Bearer ${Cookies.get('token')}`,
              'Content-Type': 'application/json',
              Accept:'application/json'
            }
          })
          return response?.data
    },
    updateDesignerDetails:async(data,id)=> {
        const response = await axios.put(`admin/designer/profile_update/${id}`,data,{
            headers:{
              Authorization:`Bearer ${Cookies.get('token')}`,
              'Content-Type': 'application/json',
              Accept:'application/json'
            }
          })
          return response?.data
    },
    getBankCodes:async()=> {
        const response = await axios.get('bankcode/',{
            headers:{
              Authorization:`Bearer ${Cookies.get('token')}`,
              'Content-Type': 'application/json',
              Accept:'application/json'
            }
          })
          
          return response?.data
    },
    updateBankDetails:async(creatorId,data)=> {
        const response = await axios.put(`admin/designer/bankupdate/${creatorId}`,data,{
            headers:{
              Authorization:`Bearer ${Cookies.get('token')}`,
              'Content-Type': 'application/json',
              Accept:'application/json'
            }
          })
          
          return response?.data
    },
    
}))