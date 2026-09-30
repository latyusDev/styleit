import { useAuth } from '@/store/useAuth'
import { useProfileStore } from '@/store/useProfile'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useCallback, useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import { toast } from 'sonner'
import { X } from 'lucide-react'
import ErrorMessage from '../ErrorMessage'
import PostNotification from './PostNotification'
import CommentNotification from './CommentNotification'
import PaymentNotification from './PaymentNotification'
import SubscriptionNotification from './SubscriptionNotification'
import LikeNotification from './LikeNotification'
import BookingNotification from './BookingNotification'
import ShareNotification from './ShareNotification'
import NotificationLoader from '../loaders/NotificationLoader'

const  Notifications = () => {
  const {getProfileDetails} = useProfileStore();
  const {user} = useAuth()
  const [itemId,setItemId] = useState(null)
  const creatorId = user?.designer_id;
  const clientId = user?.id
  const queryClient = useQueryClient()
     
    const  updateLike = async(likeId)=>{
       try{
         const response =  await axios.put(`postlike/${likeId}/`,{},{
         headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
       })
       return response
       }catch(e){
        throw(e)
       }

    }
     const {mutate:likeMutation,isPending:isLiking} = useMutation({
        mutationFn:updateLike,
        onSuccess:(response)=>{
            if(response?.status == 200){
        toast("Mark successfully", {
                action: {
                label: <X size={16} />,
              },
            })
       }
            if(response?.status == 404){
        toast("Like not found for this designer", {
                action: {
                label: <X size={16} />,
              },
            })
       }
      queryClient.invalidateQueries(['notifications'])
            
        },
        onError: () => {
            // Rollback on error
             toast('something went wrong, try again', {
                    action: {
                    label: <X size={16} />,
                  },
              })
          }
      })
       const handleLikeNotification = useCallback((data)=>{
        setItemId(data.id)
        likeMutation(data.likeId)
      },[likeMutation])
      
     
    const  updateShare = async(shareId)=>{
       try{
         const response =  await axios.put(`postshare/${shareId}/`,{},{
         headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
       })
       return response
       }catch(e){
        throw(e)
       }

    }
     const {mutate:shareMutation,isPending:isSharing} = useMutation({
        mutationFn:updateShare,
        onSuccess:(response)=>{
          queryClient.invalidateQueries(['notifications'])
            if(response?.status == 200){
        toast("Marked succesfully", {
                action: {
                label: <X size={16} />,
              },
            })
       }
            
        },
        onError: () => {
            // Rollback on error
             toast('something went wrong, try again', {
                    action: {
                    label: <X size={16} />,
                  },
              })
          }
      })
      const handleShareNotification = useCallback((data)=>{
        setItemId(data.id)
        shareMutation(data.shareId)
      },[shareMutation])
        const  updateBooking = async(bookingId)=>{
       try{
         const response =  await axios.put(`bookapp/${bookingId}/`,{},{
         headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
       })
       return response
       }catch(e){
        throw(e)
       }

    }
     const {mutate:bookingMutation,isPending:isBooking} = useMutation({
        mutationFn:updateBooking,
        onSuccess:(response)=>{
            if(response?.status == 200){
        toast("marked successfully", {
                action: {
                label: <X size={16} />,
              },
            })
       }
      queryClient.invalidateQueries(['notifications'])
            
        },
        onError: () => {
            // Rollback on error
             toast('something went wrong, try again', {
                    action: {
                    label: <X size={16} />,
                  },
              })
          }
      })
      const handleBookingNotification = useCallback((data)=>{
        setItemId(data.id)
        bookingMutation(data.bookingId)
      },[bookingMutation])
     

      const  updatePost = async(postId)=>{
       try{
         const response =  await axios.put(`posti/${postId}/`,{},{
         headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
       })
       return response
       }catch(e){
        throw(e)
       }

    }
     const {mutate:postMutation,isPending:isPosting} = useMutation({
        mutationFn:updatePost,
        onSuccess:(response)=>{
            if(response?.status == 200){
        toast("marked successfully", {
                action: {
                label: <X size={16} />,
              },
            })
       }
      queryClient.invalidateQueries(['notifications'])
            
        },
        onError: () => {
            // Rollback on error
             toast('something went wrong, try again', {
                    action: {
                    label: <X size={16} />,
                  },
              })
          }
      })
      const handlePostNotification = useCallback((data)=>{
        setItemId(data.id)
        postMutation(data.postId)
      },[postMutation])

      const  updatePayment = async(paymentId)=>{
       try{
         const response =  await axios.put(`notepay/${paymentId}/`,{},{
         headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
       })
       return response
       }catch(e){
        throw(e)
       }

    }
     const {mutate:paymentMutation,isPending:isPaying} = useMutation({
        mutationFn:updatePayment,
        onSuccess:(response)=>{
            if(response?.status == 200){
        toast("marked successfully", {
                action: {
                label: <X size={16} />,
              },
            })
       }
      queryClient.invalidateQueries(['notifications'])
            
        },
        onError: () => {
            // Rollback on error
             toast('something went wrong, try again', {
                    action: {
                    label: <X size={16} />,
                  },
              })
          }
      })
      const handlePaymentNotification = useCallback((data)=>{
        setItemId(data.id)
         paymentMutation(data?.paymentId)
      },[paymentMutation])
      const  updateReply = async(replyId)=>{
       try{
         const response =  await axios.put(`notepay/${replyId}/`,{},{
         headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
       })
       return response
       }catch(e){
        throw(e)
       }

    }

     const {mutate:replyMutation,isPending:isReplying} = useMutation({
        mutationFn:updateReply,
        onSuccess:(response)=>{
            if(response?.status == 200){
        toast("marked successfully", {
                action: {
                label: <X size={16} />,
              },
            })
       }
      queryClient.invalidateQueries(['notifications'])
            
        },
        onError: () => {
            // Rollback on error
             toast('something went wrong, try again', {
                    action: {
                    label: <X size={16} />,
                  },
              })
          }
      })

  const handleReplyNotification = useCallback((data)=>{
        setItemId(data.id)
        replyMutation(data.commentId)
      },[replyMutation])

     

       const  updateSubscription = async(subId)=>{
       try{
         const response =  await axios.put(`notesub/${subId}/`,{},{
         headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
       })
       return response
       }catch(e){
        throw(e)
       }

    }
     const {mutate:suscriptionMutation,isPending:isSubscribing} = useMutation({
        mutationFn:updateSubscription,
        onSuccess:(response)=>{
            if(response?.status == 200){
        toast("marked successfully", {
                action: {
                label: <X size={16} />,
              },
            })
       }
      queryClient.invalidateQueries(['notifications'])
            
        },
        onError: () => {
            // Rollback on error
             toast('something went wrong, try again', {
                    action: {
                    label: <X size={16} />,
                  },
              })
          }
      })
       const handleSubscriptionNotification = useCallback((data)=>{
        setItemId(data.id)
        suscriptionMutation(data.subscriptionId)    
      },[suscriptionMutation])
    

      const { data, isLoading, error,isError } = useQuery({
          queryKey: ['notifications', user?.role],
          queryFn:()=>getProfileDetails(user),
          staleTime:1000*60,
          enabled:!!(user&&user?.role !=='admin'),
          refetchOnWindowFocus:false,
          select:(data)=>{
            const notifications = data?.data?.notification;
            const isMatch = (notification)=>notification.noti_clientid === clientId || notification.noti_creatorid === creatorId
            return {
                hasNotifications:notifications.length > 0,
                postNotifications: notifications?.filter(notification=>notification.noti_postid &&  isMatch(notification)),
                postComments: notifications?.filter(notification=>notification.noti_commentid &&  isMatch(notification)), 
                paymentNotifications: notifications?.filter(notification=>notification.noti_paymentid && notification.noti_payment_status && isMatch(notification)), 
                bookingNotifications: notifications?.filter(notification=>notification.noti_bookappointmentid &&  isMatch(notification)), 
                likeNotifications: notifications?.filter(notification=>notification.noti_likeid &&  isMatch(notification)), 
                shareNotifications: notifications?.filter(notification=>notification.noti_shareid &&  isMatch(notification)), 
                subscriptionNotifications: notifications?.filter(notification=>notification.noti_subscriptionid && notification.noti_sub_status &&  isMatch(notification))
          }
        }
      })

  
      return (
    <section>
    {
      isLoading ? 
      <NotificationLoader/>:
       <>

        {
          isError ? <div className='mb-5'>
              <ErrorMessage error={error}/>
          </div>: 
          
          <>
          {
            !data?.hasNotifications ? <div className='max-w-500 mx-auto text-center shadow-md rounded-md py-32 mt-6 border'>
              <p>You currently have no notifications</p>
            </div>:
            <div>

              
      
    
      {/* subscription */}
      {
        data?.subscriptionNotifications?.length > 0 && data?.subscriptionNotifications.map(content=>{
          return <SubscriptionNotification key={content?.id} content={content}
           isSubscribing={isSubscribing} itemId={itemId}
                   handleSubscriptionNotification={handleSubscriptionNotification} />
        })
      }
              
                    {/* share */}
          {
            data?.shareNotifications?.length > 0 && data?.shareNotifications.map(content=>{
              return <ShareNotification key={content?.id} content={content} isSharing={isSharing} 
                        handleShareNotification={handleShareNotification} itemId={itemId}  />
            })
          }

                {/* Like */}
              {
                data?.likeNotifications?.length > 0 && data?.likeNotifications.map(content=>{
                  return <LikeNotification key={content?.id} content={content} isLiking={isLiking} 
                            handleLikeNotification={handleLikeNotification} itemId={itemId}  />
                })
              }
                        {/* comment */}
      {
        data?.postComments?.length > 0 && data?.postComments.map(content=>{
          return <CommentNotification key={content?.id} content={content} isReplying={isReplying} 
                   handleReplyNotification={handleReplyNotification} itemId={itemId} />
        })
      }
               {/* bookings */}
      {
        data?.bookingNotifications?.length > 0 && data?.bookingNotifications.map(content=>{
          return <BookingNotification key={content?.id} content={content} isBooking={isBooking} 
                   handleBookingNotification={handleBookingNotification} itemId={itemId} />
        })
      }
   
          {/* post */}
        {
        data?.postNotifications?.length > 0 && data?.postNotifications.map(content=>{
          return <PostNotification key={content?.id} content={content} isPosting={isPosting} title={'Post Notification'}
                    handlePostNotification={handlePostNotification} itemId={itemId} setItemId={setItemId} text={'You created a Post'} />
        })
      }
 
        {/* payments */}

      {
        data?.paymentNotifications?.length > 0 && data?.paymentNotifications.map(content=>{
          return <PaymentNotification key={content?.id} content={content} itemId={itemId}  isPaying={isPaying} 
                   handlePaymentNotification={handlePaymentNotification} />
        })
      }
      
     
      


    
      
    </div>
          }
          </>
        }
       </>
    }
    </section>
  )
}

export default  Notifications