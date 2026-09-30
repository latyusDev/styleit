import {create} from 'zustand';
import Cookies from 'js-cookie';
import axios from 'axios';


export const useAuth = create((set,get)=>({
    token:Cookies.get('token')||null,
    resendToken:Cookies.get('resendToken')||null,
    user: Cookies.get('user') === undefined || Cookies.get('user') === 'undefined' 
  ? null 
  : JSON.parse(Cookies.get('user')),
    status:null,
    error:null,
    role:null,
    isLoading:false,
    setIsLoading:(isLoading)=>set({isLoading}),
    setRole:(role)=>{
        set({role})
    },
    handleUserAndToken:(token,refreshToken,user)=>{
         Cookies.set('token',token)
         Cookies.set('refreshToken',refreshToken)
         Cookies.set('user',JSON.stringify(user))
         set({
             token,refreshToken,user,
             isLoading:false,error:null
         })
         
    },
    login:async(data)=>{
        const {role,handleUserAndToken} = get()
        set({isLoading:true})
        let response;
        try{

            switch(role){
                case 'designer':
                    response = await axios.post('designer/login',data);
                        if(response.status == 200){
                        const getToken = response.data.token
                        const getUser = {...response?.data?.designer,role:'designer'}
                        handleUserAndToken(
                            getToken,response?.data.refresh_token,
                            getUser
                        )
                            return response
                    }
                        if(response.status == 401){
                            set({isLoading:false})
                        }
                break;
                case 'client':
                     response = await axios.post('user/customer/login',data)

                      if(response.status == 200){
                    const getToken = response.data.access_token
                    const getUser = {...response?.data?.customer,role:'client'}
                      handleUserAndToken(
                            getToken,response?.data.refresh_token,
                            getUser
                        )
                }
                if(response.status == 401){
                    set({isLoading:false})
                    return response
                }
                break;
                case 'admin':
                     response = await axios.post('admin/login/',data)
                      if(response.status == 200){
                            const getToken = response.data.token
                            const getUser = {...response?.data?.admin,...response?.data?.superadmin}
                             handleUserAndToken(
                            getToken,response?.data.refresh_token,
                            getUser
                        )
                                return response
                        }
                        if(response.status == 401){
                            set({isLoading:false,error:response?.data?.message})
                            return response
                        }
                break;
                case 'representative':
                    response = await axios.post('salesrep/login', data)
                    if (response?.status === 200) {
                        const referCode = response?.data?.redirect?.split('/')[3]
                        const user = {
                        ...response?.data?.salesrep,
                        role: 'representative',
                        referCode,
                        }
                        handleUserAndToken(
                        response?.data?.access_token,
                        response?.data?.refresh_token,
                        user
                        )
                        return response
                    }
                    break;
            }
       
       } catch (e) {
  const status = e?.response?.status || e?.status
  const{error} = get()
  const message =
    e?.response?.data?.message ||
    e?.response?.data?.error ||
    e?.message
        
  if (status === 400 || status === 401 || status === 403) {
    // Only set designer cookie if actually on designer role
    if (role === 'designer') {
      Cookies.set('resendToken', e?.response?.data?.token)
      Cookies.set('user', JSON.stringify(e?.response?.data?.designer))
    }
    set({ isLoading: false, status, error: message })
    return e?.response
  }

  if (e?.message === 'Network Error') {
    set({ isLoading: false, error: 'You are offline' })
    return e?.response
  }

  set({ isLoading: false })
}
    }, 
    signUp:async(data)=>{
        const {role} = get()
        set({isLoading:true})
        const userRole = role === 'designer'?'designer':'customer'
        try{
            const response = await axios.post(`${userRole}/signup`,data,
                  {
               headers: {
                 'Content-Type': 'multipart/form-data',
               },
               withCredentials: false, 
             }
               )
               Cookies.set('resendToken',response?.data?.access_token)
        return response;
       }catch(e){ 
        if(e.status === 400||e.status === 401||e.status===409){
                set({isLoading:false,error:e.response.data.error})
        } 
        if(e.status === 500){
            set({isLoading:false,error:null})
        }
            return e.response
       }

    },
    signUpAdmin:async(data)=>{
         const response = await axios.post(`admin/signup/`,data,{
            headers:{
            Authorization:`Bearer ${Cookies.get('token')}`,
            'Content-Type': 'multipart/form-data',
            },
            withCredentials:true
        })
        return response;
     },
     handleUserLogout:async()=>{
        const {user} = get();
        let response;
        switch (user?.role) {
            case 'client':
                 response = await axios.post('customer/logout',{},{
                               headers:{
                                           Authorization:`Bearer ${Cookies.get('token')}`,
                                           'Content-Type': 'application/json',
                                           Accept:'application/json'
                                         }
                         })
            break;
            case 'designer':
                 response = await axios.post('designer/logout',{},{
              headers:{
                          Authorization:`Bearer ${Cookies.get('token')}`,
                          'Content-Type': 'application/json',
                          Accept:'application/json'
                        }
        })
            break;
            case 'superadmin':
            case 'admin':
                 response = await axios.post('admin/logout/',{},{
              headers:{
                          Authorization:`Bearer ${Cookies.get('token')}`,
                          'Content-Type': 'application/json',
                          Accept:'application/json'
                        }
        })
            break;
            case 'representative':
                 response = await axios.post('salesrep/logout',{},{
              headers:{
                          Authorization:`Bearer ${Cookies.get('token')}`,
                          'Content-Type': 'application/json',
                          Accept:'application/json'
                        }
        })
            break;
        }
        
        return response
     },
    logout:async()=>{
        const {handleUserLogout} = get();
        const response = await handleUserLogout();
        if(response?.status === 200 || response?.status === 201){
            Object.keys(Cookies.get()).forEach(key => Cookies.remove(key))
            set({token:null,user:null,isLoading:false})
            return response?.data
        }

    }
}))