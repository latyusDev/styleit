import axios from "axios";
import Cookies from "js-cookie";
import { create } from "zustand";

export const useAdminRepresentativeStore = create(()=>({
    getRepresentatives: async(page)=> {
        const response = await axios.get(`getsalesrepresentative/?page=${page}`,{
            headers:{
              Authorization:`Bearer ${Cookies.get('token')}`,
              'Content-Type': 'application/json',
              Accept:'application/json'
            }
          })
          return response?.data
    },
    getSalesRepresentativeList: async(referCode = 4121)=> {
        const response = await axios.get(`admin/salesreplist/${referCode}/`,{
            headers:{
              Authorization:`Bearer ${Cookies.get('token')}`,
              'Content-Type': 'application/json',
              Accept:'application/json'
            }
          })
          return response?.data
    },
    getSalesRepresentativeProfile: async(referCode = 4121)=> {
        const response = await axios.get(`salesreplist/${referCode}/`,{
            headers:{
              Authorization:`Bearer ${Cookies.get('token')}`,
              'Content-Type': 'application/json',
              Accept:'application/json'
            }
          })
          return response?.data
    },
    searchSalesRepresentatives: async(page,search)=> {
        const response = await axios.post(`admin/search_salesrep/?page=${page}`,{search},{
            headers:{
              Authorization:`Bearer ${Cookies.get('token')}`,
              'Content-Type': 'application/json',
              Accept:'application/json'
            }
          })
          return response?.data
    },

  
}))