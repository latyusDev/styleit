import axios from 'axios';
import Cookies from 'js-cookie';
import {create} from 'zustand';

export const useComment = create((set,get)=>({
    isCommentOpened:false,
    setIsCommentOpened:()=>{
        const {isCommentOpened} = get()
        set({isCommentOpened:!isCommentOpened})
    },
    comment:'',
    setComment:(comment)=>{
        set({comment})
    },

    
    storeComment: async(post)=>{
       return await axios.post(`comment/${post.postId||post.id}/`,{comment:post.commentText},{
          headers: {
                 Authorization: `Bearer ${Cookies.get('token')}`,
                 'Content-Type': 'application/json',
                },

            })
    },
    storeReply: async(data)=>{
       const response = await axios.post(`reply/${data.postId}/${data.commentId}/`,{comrep:data.reply},{
          headers: {
                 Authorization: `Bearer ${Cookies.get('token')}`,
                 'Content-Type': 'application/json',
                },

            })

            return response?.data
    },
    deleteComment:async(data)=>{
             try{
                  const response = await axios.post(`trash/`,data,{
                    headers: {
                          Authorization: `Bearer ${Cookies.get('token')}`,
                          'Content-Type': 'application/json',
                          Accept:'application/json'
          
                  }
                })
                  return response
                  }catch(error){
                      throw(error)
                  }
    }, 
      banComment:async(data)=> {
        const response = await axios.post('ban',data,{
            headers:{
              Authorization:`Bearer ${Cookies.get('token')}`,
              'Content-Type': 'application/json',
              Accept:'application/json'
            }
          })
          return response?.data
    },

}))