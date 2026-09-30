import axios from 'axios';
import Cookies from 'js-cookie';
import {create} from 'zustand';

export const usePost = create((set,get)=>({
    isCommentOpened:false,
    setIsCommentOpened:()=>{
        const {isCommentOpened} = get()
        set({isCommentOpened:!isCommentOpened})
    },
    isShared:false,
    setIsShared:(value)=>{
        set({isShared:value})
    },
    comment:'',
    setComment:(value)=>{
        set({comment:value})
    },
    showReport:false,
    setShowReport:(value)=>{
        set({showReport:value})
    },
     storePost: async (data) => {
      try {
        const response = await axios.post(
          'posting',
          data,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get('token')}`,
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        return { status: response.status, data: response.data };
      } catch (error) {
        throw(error)
      }
  },

viewPostDetails: async (postId) => {
  try {
    const response = await axios.get(
      `post/${postId}/`, 
      {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
          Accept: 'application/json'
        }
      }
    );
    
    return response.data;
  } catch (error) {
    throw error;
  }
},
    deletePost:async(postid)=>{
      const user = JSON.parse(Cookies.get('user'))
      
      const isAdmin = user?.role === 'admin' || user?.role === 'superadmin'
      const deleteRequirement = user?.role === 'admin'?{postid,adminId:user?.id}:{postid,superadminId:user?.id}
      
             try{
                  const response = await axios.post(`trash${isAdmin?'':'it'}/`,deleteRequirement,{
              headers: {
                     Authorization: `Bearer ${Cookies.get('token')}`,
                     'Content-Type': 'application/json',
                     Accept:'application/json'
    
            }
          })
            return response
             }catch(error){
              return error
             }
    },    
    banPost:async(postid)=>{
      const user = JSON.parse(Cookies.get('user'))
      const banRequirement = user?.role === 'admin' ? {postid,adminId:user?.id}:{postid,superadminId:user?.id}

             try{
                  const response = await axios.post(`ban`,banRequirement,{
                    headers: {
                          Authorization: `Bearer ${Cookies.get('token')}`,
                          'Content-Type': 'application/json',
                          Accept:'application/json'
          
                  }
                })
                  return response
                  }catch(e){
                  }
    },    
    likePost:async(id)=>await axios.post(`like/${id}/`,{},{
              headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                    'Content-Type': 'application/json',
                      Accept:'application/json',
            }
          }),
    getTrending:async(role)=> {
          const response =  await axios.get(`${(role === 'admin'||role === 'superadmin')?'admin/alltrend':'trending'}`,{
            headers:{
              Authorization:`Bearer ${Cookies.get('token')}`,
              'Content-Type': 'application/json',
              Accept:'application/json'
            }
          })
          if(response.status === 429){
             toast('too much requests, kindly hold on', {
          action: {
          label: <X size={16} />,
        },
      })
          }
          return response.data
  }

}))