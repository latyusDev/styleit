import axios from "axios";
import Cookies from "js-cookie";
import { create } from "zustand";

export const useAdminStore = create((set,get)=>({
    getAdminProfileDetails: async()=> {
       const response = await axios.get('admin/dashboard/',{
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
    allTransfer:async(page)=> {
        const response = await axios.get(`admin/alltransfers/?page=${page}`,{
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
    getReports:async(page)=> {

        const response = await axios.get(`admin/report?page=${page}`,{
            headers:{
              Authorization:`Bearer ${Cookies.get('token')}`,
              'Content-Type': 'application/json',
              Accept:'application/json'
            }
          })
          return response?.data
    },
    getAwaitingAproval:async()=> {

        const response = await axios.get('awaiting_approval',{
            headers:{
              Authorization:`Bearer ${Cookies.get('token')}`,
              'Content-Type': 'application/json',
              Accept:'application/json'
            }
          })
          return response?.data
    },
    searchAwaitingAprovals:async(search,page)=> {

        const response = await axios.post('admin/search_awaiting/',{search},{
            headers:{
              Authorization:`Bearer ${Cookies.get('token')}`,
              'Content-Type': 'application/json',
              Accept:'application/json'
            }
          })
          return response?.data
    },
    approveCreator:async(refNumber)=> {

        const response = await axios.get(`approve/${refNumber}/`,{
            headers:{
              Authorization:`Bearer ${Cookies.get('token')}`,
              'Content-Type': 'application/json',
              Accept:'application/json'
            }
          })
          return response?.data
    },
    sendFund:async(refno)=> {

        const response = await axios.post('sendfund/',{refno},{
            headers:{
              Authorization:`Bearer ${Cookies.get('token')}`,
              'Content-Type': 'application/json',
              Accept:'application/json'
            }
          })
          return response?.data
    },
     updateProfileImage:async(pic)=> {

        const response = await axios.put(`admin/update/profilepic`,{pic},{
            headers:{
              Authorization:`Bearer ${Cookies.get('token')}`,
              'Content-Type': 'multipart/form-data',
              Accept:'multipart/form-data'
            }
          })
          return response?.data
    },
     adminViewTrendingPost:async(id = 241 )=> {

        const response = await axios.get(`adminpost/${id}/`,{
            headers:{
              Authorization:`Bearer ${Cookies.get('token')}`,
              'Content-Type': 'multipart/form-data',
              Accept:'multipart/form-data'
            }
          })
          return response?.data
    },
     deactivateUser:async(data)=> {
            const response = await axios.post(`deactivat/`,data,{
                headers:{
                  Authorization:`Bearer ${Cookies.get('token')}`,
                  'Content-Type': 'application/json',
                  Accept:'application/json'
                }
              })
              return response?.data
    },
     activateUser:async(data)=> {
        const response = await axios.post(`activat/`,data,{
            headers:{
              Authorization:`Bearer ${Cookies.get('token')}`,
              'Content-Type': 'application/json',
              Accept:'application/json'
            }
          })
          return response?.data
    },
     deactivateAdmin:async(data)=> {
        const response = await axios.post(`admin_deactivate`,data,{
            headers:{
              Authorization:`Bearer ${Cookies.get('token')}`,
              'Content-Type': 'application/json',
              Accept:'application/json'
            }
          })
          return response?.data
    },
     banUser:async(data)=> {
        const response = await axios.post(`ban/`,data,{
            headers:{
              Authorization:`Bearer ${Cookies.get('token')}`,
              'Content-Type': 'application/json',
              Accept:'application/json'
            }
          })
          return response?.data
    },
    getStaffActivities:async(page)=>{
           const response = await axios.get(`staffactivity?page=${page}`,{
            headers:{
            Authorization:`Bearer ${Cookies.get('token')}`,
            'Content-Type': 'application/json',
            Accept:'application/json'
            },
            withCredentials:true
        })
        return response?.data
       
     }
    
}))