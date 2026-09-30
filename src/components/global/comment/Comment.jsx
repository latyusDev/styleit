import React, { useState } from 'react'
import profileImage from '../../../images/bobby.png'
import Image from '../Image'
import { Input } from '@/components/ui/input'
import send from '../../../images/send.png'
import axios from 'axios'
import Cookies from 'js-cookie'

const Comment = ({comment,commentId,setCommentId,commentReplies,post}) => {
    const [reply,setReply] = useState('')

    const handleReply = async(postId,comment_id)=>{
        const data = {comrep:reply}
        const response = await axios.post(`reply/${postId}/${comment_id}/`,data,{
                  headers: {
                         Authorization: `Bearer ${Cookies.get('token')}`,
                         'Content-Type': 'application/json',
                         Accept:'application/json'
                }
              });
        console.log(response)
    }

   
  return (
    <div>
          <div className='mt-3 bg-lPinkl w-[fit-content] flex gap-2 '>
                            <div className='basis-[25%]'>
                            <Image src={profileImage} className='w-[40px] h-[40px] rounded-full '/>

                            </div>
                            {/* comment */}
                           <div>
                                <div className='py-2 px-3 rounded-2xl bg-lPink'> 
                                    <h1 className='capitalize font-[500] text-sm md:text-md '>{comment.client_username}</h1>
                                    <p className='text-md'>{comment.body} </p>
                                </div>
                                        <div className='flex gap-3'>
                            <span>21m</span>
                            <button className='text-primary' onClick={()=>setCommentId(comment.comment_id)}>reply</button>
                          </div>
                          <p>view <span className='text-primary'>{commentReplies.length} replies</span></p>
                           </div>
                        </div>


                {
                  comment.client_reply&&<div className="ml-auto py-2 px-4 max-w-[200px] rounded-2xl bg-lPink w-[fit-content]">
                <p>{comment.client_reply} </p>
        </div>
                }
                {
                   commentId == comment.comment_id&&commentReplies.length>0&& <div>

                    {
                      commentReplies.map(_reply=>{
                        return (
                          <div className='mt-3 bg-lPinkl max-w-[400px] flex items-start gap-2 ml-auto'>
                            
                            {/* comment */}
                           <div>
                                <div className='py-2 px-3 rounded-2xl bg-lPink'> 
                                    <h1 className='capitalize font-[500] text-right text-sm md:text-md '>{comment.client_username}</h1>
                                    <p className='text-md'>{_reply.body} Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, quam explicabo, ea provident cumque placeat ut dicta neque totam iusto modi ipsum suscipit eos accusantium quod voluptate vitae iste tempora excepturi aliquid dolorum deserunt officiis autem? Vel inventore laudantium dicta nam quam optio iste delectus. Eaque corrupti odit laboriosam quibusdam.</p>
                                </div>
                                        
                           </div>
                                <div className='basis-[90%] md:basis-[65%] border border-red-600'>
                            <Image  src={profileImage} className='w-s[60pxa] md: w-[40px] h-[40px] rounded-full '/>

                            </div>
                        </div>
                        )
                      })
                    }
                   </div>
                }
                {
                commentId == comment.comment_id &&  <div className='my-2 relative'>
                <Input onChange={(e)=>setReply(e.target.value)} type="text" className="ml-auto h-16 max-w-[600px] rounded-2xl border border-gray-200  focus-visible:ring-0"/>
                <Image src={send} className='absolute top-3.5 md:top-4 right-2.5 w-5 h-5 md:w-7 md:h-7 cursor-pointer ' onClick={()=>handleReply(post.id,comment.com_id)} /> 
                </div>
                }
        

    </div>
  )
}

export default Comment