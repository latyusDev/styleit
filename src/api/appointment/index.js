import axios from 'axios'
import Cookies from 'js-cookie'
  
const makeAppointment = async (data) => {
    const response =  await axios.post('bookappointment', data, {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
        Accept: 'application/json'
      }
    })
    return response
  }

const getAppointments = async(page)=>{
    const response = await axios.get(`customer/profile?page=${page}`,{
        headers: {
                Authorization: `Bearer ${Cookies.get('token')}`,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
    })
    return response.data
}  

const confirmDelivery = async(appointment)=>{
       try{
         const response = await axios.post(`confirm_delivery/${appointment.bookingId}/`,
            { custstatus: "collected",desiid:appointment.creatorId},//body
            {
          headers:{
            Authorization:`Bearer ${Cookies.get('token')}`,
            Accept:'application/json'
          },
          withCredentials:true  
        });
        return response;
       }catch(error){
            return error
       }
    }

     const acceptAppointment = async(appointment)=>{
        const response = await axios.post(`appointment/status/${appointment.bookingId}`,{action:'accept'},{
          headers:{
            Authorization:`Bearer ${Cookies.get('token')}`,
            Accept:'application/json'
          },
          withCredentials:true  
        });
        return response;
    }

    const declineAppointment = async(data)=>{
        const response = await axios.post(`appointment/status/${data.appointment.bookingId}`,
            {action:'decline',reason:data.reason.reason},//body
            {
          headers:{
            Authorization:`Bearer ${Cookies.get('token')}`,
            Accept:'application/json'
          },
          withCredentials:true  
        });
        return response;
    }
    const uploadTask =  async(data,bookingId)=>{
       try{
         const response = await axios.post(`complete_task/${bookingId}/`,data,//body
            {
          headers:{
            Authorization:`Bearer ${Cookies.get('token')}`,
            Accept:'multipart/form-data'
          },
          withCredentials:true  
        });
        return response;
       }catch(error){
            return error
       }
    }

export {makeAppointment,getAppointments,acceptAppointment,
    confirmDelivery,uploadTask,declineAppointment}