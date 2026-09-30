import {create} from 'zustand';
import { useGlobalStore } from './global/useGlobal';
import { changeDateFormat, sortItems } from '@/lib/utils';
import axios from 'axios';
import Cookies from 'js-cookie';


const creators =[
    {
        id:1,
        name:'uthman fatai',
        email:'u@gmail.com',
        status:'suspended',
        gender:'male',
        phoneNumber:'07040834109',
        businessName:'Noble stiches',
        street:'49,Suraju Orile Iganmu',
        state:'Lagos',
        lga:'Surulere',
        role:'admin',
        country:'Nigeria',
    },
    {
        id:2,
        name:'abdullahi fatai',
        email:'u@gmail.com',
        status:'banned',
        gender:'male',
        phoneNumber:'07040834109',
        businessName:'The neatly done',
        street:'49,Suraju Orile Iganmu',
        state:'Lagos',
        lga:'Surulere',
        role:'admin',
        country:'Nigeria',
    },
    {
        id:3,
        name:'Faruq Sulaiman',
        email:'u@gmail.com',
        status:'approved',
        gender:'female',
        phoneNumber:'07040834109',
        businessName:'stitching lord',
        street:'49,Suraju Orile Iganmu',
        state:'Lagos',
        lga:'Surulere',
        role:'creator',
        country:'Nigeria',
    },
    {
        id:4,
        name:'salam Yusuf',
        email:'a@gmail.com',
        status:'banned',
        gender:'male',
        phoneNumber:'07040834109',
        businessName:'stitching lord',
        street:'49,Suraju Orile Iganmu',
        state:'Lagos',
        lga:'Surulere',
        role:'client',
        country:'Nigeria',
    },
    {
        id:5,
        name:'fatai Yusrat ',
        email:'c@gmail.com',
        status:'banned',
        gender:'female',
        phoneNumber:'07040834109',
        businessName:'stitching lord',
        street:'49,Suraju Orile Iganmu',
        state:'Lagos',
        lga:'Surulere',
        role:'creator',
        country:'Nigeria',
    },
    {
        id:6,
        name:'Adeleke Muminat',
        email:'b@gmail.com',
        status:'suspended',
        gender:'male',
        phoneNumber:'07040834109',
        businessName:'stitching lord',
        street:'49,Suraju Orile Iganmu',
        state:'Lagos',
        lga:'Surulere',
        role:'client',
        country:'Nigeria',
    },
    {
        id:7,
        name:'uthman fatai',
        email:'o@gmail.com',
        status:'approved',
        gender:'male',
        phoneNumber:'07040834109',
        businessName:'stitching lord',
        street:'49,Suraju Orile Iganmu',
        state:'Lagos',
        lga:'Surulere',
        role:'admin',
        country:'Nigeria',
    },
    {
        id:8,
        name:'uthman fatai',
        email:'p@gmail.com',
        status:'banned',
        gender:'male',
        phoneNumber:'07040834109',
        businessName:'stitching lord',
        street:'49,Suraju Orile Iganmu',
        state:'Lagos',
        lga:'Surulere',
        role:'admin',
        country:'Nigeria',
    },
    {
        id:9,
        name:'uthman fatai',
        email:'u@gmail.com',
        status:'active',
        gender:'male',
        phoneNumber:'07040834109',
        businessName:'stitching lord',
        street:'49,Suraju Orile Iganmu',
        state:'Lagos',
        lga:'Surulere',
        role:'client',
        country:'Nigeria',
    },
    {
        id:10,
        name:'uthman fatai',
        email:'u@gmail.com',
        status:'pending',
        gender:'male',
        phoneNumber:'07040834109',
        businessName:'stitching lord',
        street:'49,Suraju Orile Iganmu',
        state:'Lagos',
        lga:'Surulere',
        role:'client',
        country:'Nigeria',
    },
    {
        id:11,
        name:'uthman fatai',
        email:'u@gmail.com',
        status:'active',
        gender:'male',
        phoneNumber:'07040834109',
        businessName:'stitching lord',
        street:'49,Suraju Orile Iganmu',
        state:'Lagos',
        lga:'Surulere',
        role:'client',
        country:'Nigeria',
    },
    {
        id:12,
        name:'uthman fatai',
        email:'u@gmail.com',
        status:'pending',
        gender:'male',
        phoneNumber:'07040834109',
        businessName:'stitching lord',
        street:'49,Suraju Orile Iganmu',
        state:'Lagos',
        lga:'Surulere',
        role:'client',
        country:'Nigeria',
    },
    {
        id:13,
        name:'uthman fatai',
        email:'u@gmail.com',
        status:'suspended',
        gender:'male',
        phoneNumber:'07040834109',
        businessName:'stitching lord',
        street:'49,Suraju Orile Iganmu',
        state:'Lagos',
        lga:'Surulere',
        role:'client',
        country:'Nigeria',
    },
    {
        id:14,
        name:'uthman fatai',
        email:'u@gmail.com',
        status:'pending',
        gender:'male',
        phoneNumber:'07040834109',
        businessName:'stitching lord',
        street:'49,Suraju Orile Iganmu',
        state:'Lagos',
        lga:'Surulere',
        role:'client',
        country:'Nigeria',
    },
]

const creatorSubscriptions = [

    {
        id:1,
        name:'uthman fatai',
        plan:'4 months ',
        status:'expired',
        from:'2025-05-01',
        to:'2025-08-01',
        type:'free',
        lastSubscriptions:[
                {
        id:5,
        name:'fatai Yusrat ',
        plan:'4 months ',
        status:'expired',
        from:'2025-05-01',
        to:'2025-08-01',
        type:'free'
    },
    {
        id:5,
        name:'fatai Yusrat ',
        plan:'4 months ',
        status:'expired',
        from:'2025-05-01',
        to:'2025-08-01',
        type:'free'
    },
    {
        id:5,
        name:'fatai Yusrat ',
        plan:'4 months ',
        status:'expired',
        from:'2025-05-01',
        to:'2025-08-01',
        type:'free'
    }
        ]
    },
    {
        id:2,
        name:'abdullahi fatai',
        plan:'4 months ',
        status:'expired',
        from:'2025-03-01',
        to:'2025-08-01',
        type:'free',
        lastSubscriptions:[
                {
        id:5,
        name:'fatai Yusrat ',
        plan:'4 months ',
        status:'expired',
        from:'2025-05-01',
        to:'2025-08-01',
        type:'free'
    },
    {
        id:5,
        name:'fatai Yusrat ',
        plan:'4 months ',
        status:'expired',
        from:'2025-05-01',
        to:'2025-08-01',
        type:'free'
    },
    {
        id:5,
        name:'fatai Yusrat ',
        plan:'4 months ',
        status:'expired',
        from:'2025-05-01',
        to:'2025-08-01',
        type:'free'
    }
        ]
    },
    {
        id:3,
        name:'Faruq Sulaiman',
        plan:'4 months ',
        status:'active',
        from:'2025-05-01',
        to:'2025-08-01',
        type:'free',
        lastSubscriptions:[
                {
        id:5,
        name:'fatai Yusrat ',
        plan:'4 months ',
        status:'expired',
        from:'2025-05-01',
        to:'2025-08-01',
        type:'free'
    },
    {
        id:5,
        name:'fatai Yusrat ',
        plan:'4 months ',
        status:'expired',
        from:'2025-05-01',
        to:'2025-08-01',
        type:'free'
    },
    {
        id:5,
        name:'fatai Yusrat ',
        plan:'4 months ',
        status:'expired',
        from:'2025-05-01',
        to:'2025-08-01',
        type:'free'
    }
        ]
    },
    {
        id:4,
        name:'salam Yusuf',
        plan:'4 months ',
        status:'active',
        from:'2025-03-01',
        to:'2026-08-01',
        type:'paid',
        lastSubscriptions:[
                {
        id:5,
        name:'fatai Yusrat ',
        plan:'4 months ',
        status:'expired',
        from:'2025-05-01',
        to:'2025-08-01',
        type:'paid',
    },
    {
        id:5,
        name:'fatai Yusrat ',
        plan:'4 months ',
        status:'expired',
        from:'2025-05-01',
        to:'2025-08-01',
        type:'paid',
    },
    {
        id:5,
        name:'fatai Yusrat ',
        plan:'4 months ',
        status:'expired',
        from:'2025-05-01',
        to:'2025-08-01',
        type:'paid',
    }
        ]
    },
    {
        id:5,
        name:'fatai Yusrat ',
        plan:'4 months ',
        status:'expired',
        from:'2025-05-01',
        to:'2025-08-01',
        type:'paid',
        lastSubscriptions:[
                {
        id:5,
        name:'fatai Yusrat ',
        plan:'4 months ',
        status:'expired',
        from:'2025-05-01',
        to:'2025-08-01',
        type:'paid',
    },
    {
        id:5,
        name:'fatai Yusrat ',
        plan:'4 months ',
        status:'expired',
        from:'2025-05-01',
        to:'2025-08-01',
        type:'paid',
    },
    {
        id:5,
        name:'fatai Yusrat ',
        plan:'4 months ',
        status:'expired',
        from:'2025-05-01',
        to:'2025-08-01',
        type:'paid',
    }
        ]
    },
    {
        id:6,
        name:'Adeleke Muminat',
        plan:'4 months ',
        status:'active',
        from:'2025-05-01',
        to:'2027-08-01',
        type:'paid',
        lastSubscriptions:[
                {
        id:5,
        name:'fatai Yusrat ',
        plan:'4 months ',
        status:'expired',
        from:'2025-05-01',
        to:'2025-08-01',
        type:'paid',
    },
    {
        id:5,
        name:'fatai Yusrat ',
        plan:'4 months ',
        status:'expired',
        from:'2025-05-01',
        to:'2025-08-01',
        type:'paid',
    },
    {
        id:5,
        name:'fatai Yusrat ',
        plan:'4 months ',
        status:'expired',
        from:'2025-05-01',
        to:'2025-08-01',
        type:'paid',
    }
        ]
    },
    {
        id:7,
        name:'uthman fatai',
        plan:'4 months ',
        status:'active',
        from:'2025-02-01',
        to:'2025-08-01',
        type:'paid',
        lastSubscriptions:[
                {
        id:5,
        name:'fatai Yusrat ',
        plan:'4 months ',
        status:'expired',
        from:'2025-05-01',
        to:'2025-08-01',
        type:'paid',
    },
    {
        id:5,
        name:'fatai Yusrat ',
        plan:'4 months ',
        status:'expired',
        from:'2025-05-01',
        to:'2025-08-01',
        type:'paid',
    },
    {
        id:5,
        name:'fatai Yusrat ',
        plan:'4 months ',
        status:'expired',
        from:'2025-05-01',
        to:'2025-08-01',
        type:'paid',
    }
        ]
    },
    {
        id:8,
        name:'uthman fatai',
        plan:'4 months ',
        status:'active',
        from:'2025-05-01',
        to:'2025-08-01',
        type:'paid',
        lastSubscriptions:[
                {
        id:5,
        name:'fatai Yusrat ',
        plan:'4 months ',
        status:'expired',
        from:'2025-05-01',
        to:'2025-08-01',
        type:'paid',
    },
    {
        id:5,
        name:'fatai Yusrat ',
        plan:'4 months ',
        status:'expired',
        from:'2025-05-01',
        to:'2025-08-01',
        type:'paid',
    },
    {
        id:5,
        name:'fatai Yusrat ',
        plan:'4 months ',
        status:'expired',
        from:'2025-05-01',
        to:'2025-08-01',
        type:'paid',
    }
        ]
    },
    {
        id:9,
        name:'uthman fatai',
        plan:'4 months ',
        status:'expired',
        from:'2025-05-01',
        to:'2025-08-01',
        type:'paid',
        lastSubscriptions:[
                {
        id:5,
        name:'fatai Yusrat ',
        plan:'4 months ',
        status:'expired',
        from:'2025-05-01',
        to:'2025-08-01',
        type:'paid',
    },
    {
        id:5,
        name:'fatai Yusrat ',
        plan:'4 months ',
        status:'expired',
        from:'2025-05-01',
        to:'2025-08-01',
        type:'paid',
    },
    {
        id:5,
        name:'fatai Yusrat ',
        plan:'4 months ',
        status:'expired',
        from:'2025-05-01',
        to:'2025-08-01',
        type:'paid',
    }
        ]
    }
]
const creatorPayments = [

    {
        id:1,
        
        name:'uthman fatai',
        date:'2025-05-01',
        email:'sulaiman@gmail.com ',
        ref:'12646456289',
        amount:1000,
        status:'pending',
        lastPayments:[
                        {
                id:1,
                name:'fatai Yusrat ',
                date:'2025-05-01',
                email:'sulaiman@gmail.com ',
                ref:'12246456289',
                amount:1000,
                status:'declined',
                to:'2025-08-01',
            },
            {
                id:2,
                name:'fatai Yusrat ',
                date:'2025-05-01',
                email:'sulaiman@gmail.com ',
                ref:'123446456289',
                amount:1000,
                status:'successful',
                to:'2025-08-01',
            },
            {
                id:3,
                name:'fatai Yusrat ',
                date:'2025-05-01',
                email:'sulaiman@gmail.com ',
                ref:'12346456289',
                amount:1000,
                status:'declined',
                to:'2025-08-01',
            }
        ]
    },
    {
        id:2,
        name:'abdullahi fatai',
        date:'2025-03-01',
        email:'sulaiman@gmail.com ',
        ref:'12546456289',
        amount:1000,
        status:'declined',
        to:'2025-08-01',
        lastPayments:[
                        {
                id:1,
                name:'fatai Yusrat ',
                date:'2025-05-01',
                email:'sulaiman@gmail.com ',
                ref:'12346456289',
                amount:1000,
                status:'declined',
                to:'2025-08-01',
            },
            {
                id:2,
                name:'fatai Yusrat ',
                date:'2025-05-01',
                email:'sulaiman@gmail.com ',
                ref:'12346456289',
                amount:1000,
                status:'successful',
                to:'2025-08-01',
            },
            {
                id:3,
                name:'fatai Yusrat ',
                date:'2025-05-01',
                email:'sulaiman@gmail.com ',
                ref:'12346456289',
                amount:1000,
                status:'declined',
                to:'2025-08-01',
            }
        ]
    },
    {
        id:3,
        name:'Faruq Sulaiman',
        date:'2025-05-01',
        email:'sulaiman@gmail.com ',
        ref:'12846456289',
        amount:1000,
        status:'successful',
        to:'2025-08-01',
        lastPayments:[
                        {
                id:1,
                name:'fatai Yusrat ',
                date:'2025-05-01',
                email:'sulaiman@gmail.com ',
                ref:'12346456289',
                amount:1000,
                status:'declined',
                to:'2025-08-01',
            },
            {
                id:2,
                name:'fatai Yusrat ',
                date:'2025-05-01',
                email:'sulaiman@gmail.com ',
                ref:'12346456289',
                amount:1000,
                status:'successful',
                to:'2025-08-01',
            },
            {
                id:3,
                name:'fatai Yusrat ',
                date:'2025-05-01',
                email:'sulaiman@gmail.com ',
                ref:'12346456289',
                amount:1000,
                status:'declined',
                to:'2025-08-01',
            }
        ]
    },
    {
        id:4,
        name:'salam Yusuf',
        date:'2025-03-01',
        email:'sulaiman@gmail.com ',
        ref:'12746456289',
        amount:1000,
        status:'successful',
        to:'2026-08-01',
        lastPayments:[
                        {
                id:1,
                name:'fatai Yusrat ',
                date:'2025-05-01',
                email:'sulaiman@gmail.com ',
                ref:'12346456289',
                amount:1000,
                status:'declined',
                to:'2025-08-01',
            },
            {
                id:2,
                name:'fatai Yusrat ',
                date:'2025-05-01',
                email:'sulaiman@gmail.com ',
                ref:'12346456289',
                amount:1000,
                status:'successful',
                to:'2025-08-01',
            },
            {
                id:3,
                name:'fatai Yusrat ',
                date:'2025-05-01',
                email:'sulaiman@gmail.com ',
                ref:'12346456289',
                amount:1000,
                status:'declined',
                to:'2025-08-01',
            }
        ]
    },
    {
        id:5,
        name:'fatai Yusrat ',
        date:'2025-05-01',
        email:'sulaiman@gmail.com ',
        ref:'12846456289',
        amount:1000,
        status:'pending',
        to:'2025-08-01',
        lastPayments:[
                        {
                id:1,
                name:'fatai Yusrat ',
                date:'2025-05-01',
                email:'sulaiman@gmail.com ',
                ref:'12346456289',
                amount:1000,
                status:'declined',
                to:'2025-08-01',
            },
            {
                id:2,
                name:'fatai Yusrat ',
                date:'2025-05-01',
                email:'sulaiman@gmail.com ',
                ref:'12346456289',
                amount:1000,
                status:'successful',
                to:'2025-08-01',
            },
            {
                id:3,
                name:'fatai Yusrat ',
                date:'2025-05-01',
                email:'sulaiman@gmail.com ',
                ref:'12346456289',
                amount:1000,
                status:'declined',
                to:'2025-08-01',
            }
        ]
    },
    {
        id:6,
        name:'Adeleke Muminat',
        date:'2025-05-01',
        email:'sulaiman@gmail.com ',
        ref:'12346456289',
        amount:1000,
        status:'successful',
        to:'2027-08-01',
        lastPayments:[
                        {
                id:1,
                name:'fatai Yusrat ',
                date:'2025-05-01',
                email:'sulaiman@gmail.com ',
                ref:'12346456289',
                amount:1000,
                status:'declined',
                to:'2025-08-01',
            },
            {
                id:2,
                name:'fatai Yusrat ',
                date:'2025-05-01',
                email:'sulaiman@gmail.com ',
                ref:'12346456289',
                amount:1000,
                status:'successful',
                to:'2025-08-01',
            },
            {
                id:3,
                name:'fatai Yusrat ',
                date:'2025-05-01',
                email:'sulaiman@gmail.com ',
                ref:'12346456289',
                amount:1000,
                status:'declined',
                to:'2025-08-01',
            }
        ]
    },
    {
        id:7,
        name:'uthman fatai',
        date:'2025-02-01',
        email:'sulaiman@gmail.com ',
        ref:'12346456289',
        amount:1000,
        status:'successful',
        to:'2025-08-01',
        lastPayments:[
                        {
                id:1,
                name:'fatai Yusrat ',
                date:'2025-05-01',
                email:'sulaiman@gmail.com ',
                ref:'12346456289',
                amount:1000,
                status:'declined',
                to:'2025-08-01',
            },
            {
                id:2,
                name:'fatai Yusrat ',
                date:'2025-05-01',
                email:'sulaiman@gmail.com ',
                ref:'12346456289',
                amount:1000,
                status:'successful',
                to:'2025-08-01',
            },
            {
                id:3,
                name:'fatai Yusrat ',
                date:'2025-05-01',
                email:'sulaiman@gmail.com ',
                ref:'12346456289',
                amount:1000,
                status:'declined',
                to:'2025-08-01',
            }
        ]
    },
    {
        id:8,
        name:'uthman fatai',
        date:'2025-05-01',
        email:'sulaiman@gmail.com ',
        ref:'12346456289',
        amount:1000,
        status:'successful',
        to:'2025-08-01',
        lastPayments:[
                        {
                id:1,
                name:'fatai Yusrat ',
                date:'2025-05-01',
                email:'sulaiman@gmail.com ',
                ref:'12346456289',
                amount:1000,
                status:'declined',
                to:'2025-08-01',
            },
            {
                id:2,
                name:'fatai Yusrat ',
                date:'2025-05-01',
                email:'sulaiman@gmail.com ',
                ref:'12346456289',
                amount:1000,
                status:'successful',
                to:'2025-08-01',
            },
            {
                id:3,
                name:'fatai Yusrat ',
                date:'2025-05-01',
                email:'sulaiman@gmail.com ',
                ref:'12346456289',
                amount:1000,
                status:'declined',
                to:'2025-08-01',
            }
        ]
    },
    {
        id:9,
        name:'uthman fatai',
        date:'2025-05-01',
        email:'sulaiman@gmail.com ',
        ref:'12346456289',
        amount:1000,
        status:'pending',
        to:'2025-08-01',
        lastPayments:[
                        {
                id:1,
                name:'fatai Yusrat ',
                date:'2025-05-01',
                email:'sulaiman@gmail.com ',
                ref:'12346456289',
                amount:1000,
                status:'declined',
                to:'2025-08-01',
            },
            {
                id:2,
                name:'fatai Yusrat ',
                date:'2025-05-01',
                email:'sulaiman@gmail.com ',
                ref:'12346456289',
                amount:1000,
                status:'successful',
                to:'2025-08-01',
            },
            {
                id:3,
                name:'fatai Yusrat ',
                date:'2025-05-01',
                email:'sulaiman@gmail.com ',
                ref:'12346456289',
                amount:1000,
                status:'declined',
                to:'2025-08-01',
            }
        ]
    }
]

export const useCreatorStore = create((set,get)=>({
    creators,
    creatorSubscriptions:changeDateFormat(creatorSubscriptions,'subscriptions'),
    creatorPayments:changeDateFormat(creatorPayments,'payments'),

    setCreatorPayments:(creatorPayments)=>{
        const {searchData} = useGlobalStore.getState();
        set(state=>({
            ...state,creatorPayments:searchData==''?changeDateFormat(creatorPayments,'payments'):creatorPayments
        }))
    },
    setCreatorSubscriptions:(creatorSubscriptions)=>{
        const {searchData} = useGlobalStore.getState();
        set(state=>({
            ...state,creatorSubscriptions:searchData==''?changeDateFormat(creatorSubscriptions,'subscriptions'):creatorSubscriptions
        }))
    },
    sortCreatorSubscriptions:(sortData)=>{
      const {creatorSubscriptions} = get();
      const sortedCreatorSubscriptions = sortItems(creatorSubscriptions,sortData)
          set({sortedCreatorSubscriptions:sortedCreatorSubscriptions})
        
    },
    setCreators:(creators)=>{
        set(state=>({
            ...state,creators
        }))
    },
    filterCreators:(data)=>{
          
        switch(data){
            case 'active subscribers':
                const activePerformance = creators.filter(creator=>creator.status == 'active')
                set({creators:activePerformance})
            break;
            case 'top performance':
                const topPerformance = creators.filter(creator=>creator.status == 'active')
                set({creators:topPerformance})
            break;
            case 'suspended/banned':
                const bannedOrSuspendedCreators = creators.filter(creator=>creator.status === 'suspended'||creator.status === 'banned')
                set({creators:bannedOrSuspendedCreators})
                break;
            case 'pending':
                const pendingCreators = creators.filter(creator=>creator.status == 'pending')
                set({creators:pendingCreators})
            break;
            case 'most booked':
                set({creators:creators.slice(0,3)})
            break;
            default:
                set({creators:creators})
        }
    },
    sortCreators:(sortData)=>{
      const {creators} = get();
      const sortedCreators =  sortItems(creators,sortData)
          set({creators:sortedCreators})
    },
    sortPayments:(sortData)=>{
      const {creatorPayments} = get();
      const sortedPayments = sortItems(creatorPayments,sortData)
          set({creatorPayments:sortedPayments})
    },
    filterPayments:(status)=>{
        const filterPayments = changeDateFormat(creatorPayments,'payments').filter(payment=>payment.status === status)
        set({creatorPayments:status == 'all'?changeDateFormat(creatorPayments,'payments'):filterPayments})
    },
    filterSubscriptions:(status)=>{
        const filterSubscription = status.endsWith('subscribers') ?  
        changeDateFormat(creatorSubscriptions,'subscriptions').filter(subscription=>subscription.type === status.split(' ')[0]) : 
        changeDateFormat(creatorSubscriptions,'subscriptions').filter(subscription=>subscription.status === status)
        set({creatorSubscriptions:status === 'all'?changeDateFormat(creatorSubscriptions,'subscriptions'):filterSubscription})
    },
    getDesigners:async(page = 1)=>{
       const response =  await axios.get(`designers?page=${page}`,{
            headers:{
              Authorization:`Bearer ${Cookies.get('token')}`,
              'Content-Type': 'application/json',
              Accept:'application/json'
              
            }
          })
    return response.data
  },
    storeFollow:async(creator)=>{
         try{
               const response = await axios.post(`follow/${creator.creator_id}/`,{},{
              headers: {
                     Authorization: `Bearer ${Cookies.get('token')}`,
                     'Content-Type': 'application/json',
                     Accept:'application/json'
            },
            withCredentials:true
          })
          return response
             }catch(e){
             }
    },
    storeUnFollow:async(creator)=>{
         try{
               const response = await axios.post(`unfollow/${creator.creator_id}/`, {}, {
        headers: {
                Authorization: `Bearer ${Cookies.get('token')}`,
                'Content-Type': 'application/json',
                Accept: 'application/json'
                },
                withCredentials: true
            })
                return response
            } catch (error) {
            throw Error(error)
    }
    },
    acceptAppointment:async(appointment)=>{
        const response = await axios.post(`appointment/status/${appointment.bookingId}`,{action:'accept'},{
          headers:{
            Authorization:`Bearer ${Cookies.get('token')}`,
            Accept:'application/json'
          },
          withCredentials:true  
        });
        return response;
    },
     declineAppointment:async(data)=>{
        const response = await axios.post(`appointment/status/${data.appointment.bookingId}`,
            {action:'decline',reason:data.reason},//body
            {
          headers:{
            Authorization:`Bearer ${Cookies.get('token')}`,
            Accept:'application/json'
          },
          withCredentials:true  
        });
        return response;
    },
    uploadTask:async(data,bookingId)=>{
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
    },
    getCreatorDetails:async(id)=>{
       try{
         const response = await axios.get(`designer/${id}/`,
            {
          headers:{
            Authorization:`Bearer ${Cookies.get('token')}`,
            Accept:'application/json'
          },
          withCredentials:true  
        });
        return response?.data;
       }catch(error){
            return error
       }
    },
      getBookings:async(page=1)=>{
         const response = axios.get(`designer/profile?page=${page}`,{
           headers: {
                  Authorization: `Bearer ${Cookies.get('token')}`,
                  'Content-Type': 'application/json',
                  Accept: 'application/json'
                }
        })
        return response;
      }
  
}))