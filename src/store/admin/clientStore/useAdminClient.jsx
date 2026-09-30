import axios from "axios";
import Cookies from "js-cookie";
import { create } from "zustand";

export const useAdminClientStore = create((set,get)=>({
    getClients: async(page)=> {
        const response = await axios.get(`admin/allcustomers/?page=${page}`,{
            headers:{
              Authorization:`Bearer ${Cookies.get('token')}`,
              'Content-Type': 'application/json',
              Accept:'application/json'
            }
          })
          return response?.data
    },
    getClientDetails:async(id)=> {
        const response = await axios.get(`customers/${id}/`,{
            headers:{
              Authorization:`Bearer ${Cookies.get('token')}`,
              'Content-Type': 'application/json',
              Accept:'application/json'
            }
          })
          return response?.data
    },
    getBookings:async(page)=> {
        const response = await axios.get(`admin/appointments?page=${page}`,{
            headers:{
              Authorization:`Bearer ${Cookies.get('token')}`,
              'Content-Type': 'application/json',
              Accept:'application/json'
            }
          })
          return response?.data
    },
    searchPayment:async(searchref)=> {
        const response = await axios.post('searchref/',{searchref},{
            headers:{
              Authorization:`Bearer ${Cookies.get('token')}`,
              'Content-Type': 'application/json',
              Accept:'application/json'
            }
          })
          return response?.data
    },
    searchClients:async(debouncedSearch,page)=> {
        const response = await axios.post(`admin/search_client?page=${page}/`,{searchref:debouncedSearch},{
            headers:{
              Authorization:`Bearer ${Cookies.get('token')}`,
              'Content-Type': 'application/json',
              Accept:'application/json'
            }
          })
          return response?.data
    },
    searchBookings:async(debouncedSearch,page)=> {
        const response = await axios.post(`admin/search_booking_appointment/?page=${page}/`,{search:debouncedSearch},{
            headers:{
              Authorization:`Bearer ${Cookies.get('token')}`,
              'Content-Type': 'application/json',
              Accept:'application/json'
            }
          })
          return response?.data
    },
    viewAllClientBookings:async(id)=> {
        const response = await axios.post('admin/viewall/',{id},{
            headers:{
              Authorization:`Bearer ${Cookies.get('token')}`,
              'Content-Type': 'application/json',
              Accept:'application/json'
            }
          })
          return response?.data
    },
    updateClientDetails:async(data,id)=> {
        const response = await axios.put(`admin/customer/profile_update/${id}`,data,{
            headers:{
              Authorization:`Bearer ${Cookies.get('token')}`,
              'Content-Type': 'application/json',
              Accept:'application/json'
            }
          })
          return response?.data
    },
    getClientTransactions:async(page)=> {
        const response = await axios.get(`admin/transaction_payment?page=${page}`,{
            headers:{
              Authorization:`Bearer ${Cookies.get('token')}`,
              'Content-Type': 'application/json',
              Accept:'application/json'
            }
          })
          return response?.data
    },
    
}))