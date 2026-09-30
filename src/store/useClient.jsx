import {create} from 'zustand';
import { useGlobalStore } from './global/useGlobal';
import { sortItems } from '@/lib/utils';
import profile from '@/images/profile_i.png'
import axios from 'axios';
import Cookies from 'js-cookie';

const complaints = [
    {
        id:1,
        userId:2,
        name:'uthman Bello',
        image:profile,
        message:' Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde omnis cumque, itaque, corporis nam, praesentium iure neque alias dolorum nostrum earum dolor est dignissimos necessitatibus cum. Molestias quaerat ullam repudiandae.',
        replies:[
            {
                id:1,
                userId:3,
                name:'Yusuf ibrahim',
                response:' Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde omnis cumque, itaque, corporis nam, praesentium iure neque alias dolorum nostrum earum dolor est dignissimos necessitatibus cum. Molestias quaerat ullam repudiandae.',
            },
            {
                id:2,
                userId:3,
                name:'Yusuf ibrahim',
                response:' Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde omnis cumque, itaque, corporis nam, praesentium iure neque alias dolorum nostrum earum dolor est dignissimos necessitatibus cum. Molestias quaerat ullam repudiandae.',
            },
            {
                id:3,
                userId:3,
                name:'Yusuf ibrahim',
                response:' Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde omnis cumque, itaque, corporis nam, praesentium iure neque alias dolorum nostrum earum dolor est dignissimos necessitatibus cum. Molestias quaerat ullam repudiandae.',
            },
            {
                id:4,
                userId:3,
                name:'Yusuf ibrahim',
                response:' Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde omnis cumque, itaque, corporis nam, praesentium iure neque alias dolorum nostrum earum dolor est dignissimos necessitatibus cum. Molestias quaerat ullam repudiandae.',
            },
       ],
    },
    {
        id:2,
        userId:2,
        name:'fatai sulaiman',
        image:'',
        message:' Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde omnis cumque, itaque, corporis nam, praesentium iure neque alias dolorum nostrum earum dolor est dignissimos necessitatibus cum. Molestias quaerat ullam repudiandae.',
        replies:[
            {
                id:3,
                userId:3,
                name:'Yusuf ibrahim',
                response:' Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde omnis cumque, itaque, corporis nam, praesentium iure neque alias dolorum nostrum earum dolor est dignissimos necessitatibus cum. Molestias quaerat ullam repudiandae.',
            },
            {
                id:4,
                userId:3,
                name:'Yusuf ibrahim',
                response:' Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde omnis cumque, itaque, corporis nam, praesentium iure neque alias dolorum nostrum earum dolor est dignissimos necessitatibus cum. Molestias quaerat ullam repudiandae.',
            },
       ],
    },
    {
        id:3,
        userId:2,
        name:'dele Japa',
        image:'',
        message:' Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde omnis cumque, itaque, corporis nam, praesentium iure neque alias dolorum nostrum earum dolor est dignissimos necessitatibus cum. Molestias quaerat ullam repudiandae.',
        replies:[
            {
                id:5,
                userId:3,
                name:'Yusuf ibrahim',
                response:' Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde omnis cumque, itaque, corporis nam, praesentium iure neque alias dolorum nostrum earum dolor est dignissimos necessitatibus cum. Molestias quaerat ullam repudiandae.',
            },
            {
                id:6,
                userId:3,
                name:'Yusuf ibrahim',
                response:' Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde omnis cumque, itaque, corporis nam, praesentium iure neque alias dolorum nostrum earum dolor est dignissimos necessitatibus cum. Molestias quaerat ullam repudiandae.',
            },
       ],
    },
    {
        id:4,
        userId:2,
        name:'Salman Yusuf',
        image:profile,
        message:' Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde omnis cumque, itaque, corporis nam, praesentium iure neque alias dolorum nostrum earum dolor est dignissimos necessitatibus cum. Molestias quaerat ullam repudiandae.',
        replies:[
            {
                id:7,
                userId:3,
                name:'Yusuf ibrahim',
                response:' Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde omnis cumque, itaque, corporis nam, praesentium iure neque alias dolorum nostrum earum dolor est dignissimos necessitatibus cum. Molestias quaerat ullam repudiandae.',
            },
            {
                id:8,
                userId:3,
                name:'Yusuf ibrahim',
                response:' Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde omnis cumque, itaque, corporis nam, praesentium iure neque alias dolorum nostrum earum dolor est dignissimos necessitatibus cum. Molestias quaerat ullam repudiandae.',
            },
       ],
    },
    {
        id:5,
        userId:2,
        name:'uthman Bello',
        image:'',
        message:' Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde omnis cumque, itaque, corporis nam, praesentium iure neque alias dolorum nostrum earum dolor est dignissimos necessitatibus cum. Molestias quaerat ullam repudiandae.',
        replies:[
            {
                id:9,
                userId:3,
                name:'Yusuf ibrahim',
                response:' Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde omnis cumque, itaque, corporis nam, praesentium iure neque alias dolorum nostrum earum dolor est dignissimos necessitatibus cum. Molestias quaerat ullam repudiandae.',
            },
            {
                id:10,
                userId:3,
                name:'Yusuf ibrahim',
                response:' Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde omnis cumque, itaque, corporis nam, praesentium iure neque alias dolorum nostrum earum dolor est dignissimos necessitatibus cum. Molestias quaerat ullam repudiandae.',
            },
       ],
    },
    {
        id:6,
        userId:2,
        name:'Ademola Hakeem',
        image:'',
        message:' Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde omnis cumque, itaque, corporis nam, praesentium iure neque alias dolorum nostrum earum dolor est dignissimos necessitatibus cum. Molestias quaerat ullam repudiandae.',
        replies:[
            {
                id:11,
                userId:3,
                name:'Yusuf ibrahim',
                response:' Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde omnis cumque, itaque, corporis nam, praesentium iure neque alias dolorum nostrum earum dolor est dignissimos necessitatibus cum. Molestias quaerat ullam repudiandae.',
            },
            {
                id:12,
                userId:3,
                name:'Yusuf ibrahim',
                response:' Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde omnis cumque, itaque, corporis nam, praesentium iure neque alias dolorum nostrum earum dolor est dignissimos necessitatibus cum. Molestias quaerat ullam repudiandae.',
            },
       ],
    },
    {
        id:7,
        userId:2,
        name:'Yunus Abdullateef',
        image:'',
        message:' Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde omnis cumque, itaque, corporis nam, praesentium iure neque alias dolorum nostrum earum dolor est dignissimos necessitatibus cum. Molestias quaerat ullam repudiandae.',
        replies:[
            {
                id:13,
                userId:3,
                name:'Yusuf ibrahim',
                response:' Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde omnis cumque, itaque, corporis nam, praesentium iure neque alias dolorum nostrum earum dolor est dignissimos necessitatibus cum. Molestias quaerat ullam repudiandae.',
            },
            {
                id:14,
                userId:3,
                name:'Yusuf ibrahim',
                response:' Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde omnis cumque, itaque, corporis nam, praesentium iure neque alias dolorum nostrum earum dolor est dignissimos necessitatibus cum. Molestias quaerat ullam repudiandae.',
            },
       ],
    },
    {
        id:8,
        userId:2,
        name:'Bamidele Mutiat',
        image:'',
        message:' Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde omnis cumque, itaque, corporis nam, praesentium iure neque alias dolorum nostrum earum dolor est dignissimos necessitatibus cum. Molestias quaerat ullam repudiandae.',
        replies:[
            {
                id:15,
                userId:3,
                name:'Yusuf ibrahim',
                response:' Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde omnis cumque, itaque, corporis nam, praesentium iure neque alias dolorum nostrum earum dolor est dignissimos necessitatibus cum. Molestias quaerat ullam repudiandae.',
            },
            {
                id:16,
                userId:3,
                name:'Yusuf ibrahim',
                response:' Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde omnis cumque, itaque, corporis nam, praesentium iure neque alias dolorum nostrum earum dolor est dignissimos necessitatibus cum. Molestias quaerat ullam repudiandae.',
            },
       ],
    },
    {
        id:9,
        userId:2,
        name:'uthman Bello',
        image:'',
        message:' Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde omnis cumque, itaque, corporis nam, praesentium iure neque alias dolorum nostrum earum dolor est dignissimos necessitatibus cum. Molestias quaerat ullam repudiandae.',
        replies:[
            {
                id:17,
                userId:3,
                name:'Yusuf ibrahim',
                response:' Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde omnis cumque, itaque, corporis nam, praesentium iure neque alias dolorum nostrum earum dolor est dignissimos necessitatibus cum. Molestias quaerat ullam repudiandae.',
            },
            {
                id:18,
                userId:3,
                name:'Yusuf ibrahim',
                response:' Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde omnis cumque, itaque, corporis nam, praesentium iure neque alias dolorum nostrum earum dolor est dignissimos necessitatibus cum. Molestias quaerat ullam repudiandae.',
            },
       ],
    },
    {
        id:10,
        userId:2,
        name:'uthman Bello',
        image:'',
        message:' Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde omnis cumque, itaque, corporis nam, praesentium iure neque alias dolorum nostrum earum dolor est dignissimos necessitatibus cum. Molestias quaerat ullam repudiandae.',
        replies:[
            {
                id:19,
                userId:3,
                name:'Yusuf ibrahim',
                response:' Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde omnis cumque, itaque, corporis nam, praesentium iure neque alias dolorum nostrum earum dolor est dignissimos necessitatibus cum. Molestias quaerat ullam repudiandae.',
            },
            {
                id:20,
                userId:3,
                name:'Yusuf ibrahim',
                response:' Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde omnis cumque, itaque, corporis nam, praesentium iure neque alias dolorum nostrum earum dolor est dignissimos necessitatibus cum. Molestias quaerat ullam repudiandae.',
            },
       ],
    },
]
const clients = [
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

const bookings = [
    {
        id:1,
        receiver:'ariky stitches',
        name:'Ademola Decode',
        bookingDate:'2024-11-10',
        bookingTime:'12:30',
        collectionDate:'2024-11-15',
        collectionTime:'15:20',
        status:'accepted',
        reason:'Hi, i am sorry i have a tight schedule this month.Kindly book ahead in the coming month if not urgent.I will be available'
    },
    {
        id:2,
        receiver:'ariky stitches',
        name:'Sulaiman fatai',
        bookingDate:'2024-11-10',
        bookingTime:'12:30',
        collectionDate:'2024-11-15',
        collectionTime:'15:20',
        status:'declined',
        reason:'Hi, i am sorry i have a tight schedule this month.Kindly book ahead in the coming month if not urgent.I will be available'
    },
    {
        id:3,
        receiver:'noble stitches',
        name:'Ademola Decode',
        bookingDate:'2024-11-10',
        bookingTime:'12:30',
        collectionDate:'2024-11-15',
        collectionTime:'15:20',
        status:'accepted',
        reason:'Hi, i am sorry i have a tight schedule this month.Kindly book ahead in the coming month if not urgent.I will be available'
    },
    {
        id:4,
        receiver:'ariky stitches',
        name:'Ademola Decode',
        bookingDate:'2024-11-10',
        bookingTime:'12:30',
        collectionDate:'2024-11-15',
        collectionTime:'15:20',
        status:'declined',
        reason:'Hi, i am sorry i have a tight schedule this month.Kindly book ahead in the coming month if not urgent.I will be available'
    },
    {
        id:5,
        receiver:'ariky stitches',
        name:'Ademola Decode',
        bookingDate:'2024-11-10',
        bookingTime:'12:30',
        collectionDate:'2024-11-15',
        collectionTime:'15:20',
        status:'declined',
        reason:'Hi, i am sorry i have a tight schedule this month.Kindly book ahead in the coming month if not urgent.I will be available'
    },
    {
        id:6,
        receiver:'ariky stitches',
        name:'Ademola Decode',
        bookingDate:'2024-11-10',
        bookingTime:'12:30',
        collectionDate:'2024-11-15',
        collectionTime:'12:00',
        status:'pending',
        reason:'Hi, i am sorry i have a tight schedule this month.Kindly book ahead in the coming month if not urgent.I will be available'
    },
    {
        id:7,
        receiver:'ariky stitches',
        name:'Yunus Abdullateef',
        bookingDate:'2025-02-31',
        bookingTime:'03:55',
        collectionDate:'2024-11-15',
        collectionTime:'14:32',
        status:'pending',
        reason:'Hi, i am sorry i have a tight schedule this month.Kindly book ahead in the coming month if not urgent.I will be available'
    },
    {
        id:8,
        receiver:'ariky stitches',
        name:'Yunus Abdullateef',
        bookingDate:'2025-02-31',
        bookingTime:'05:02',
        collectionDate:'2024-11-15',
        collectionTime:'14:32',
        status:'pending',
        reason:'Hi, i am sorry i have a tight schedule this month.Kindly book ahead in the coming month if not urgent.I will be available'
    },
    {
        id:9,
        receiver:'ariky stitches',
        name:'Yunus Abdullateef',
        bookingDate:'2025-03-31',
        bookingTime:'18:22',
        collectionDate:'2025-11-15',
        collectionTime:'14:32',
        status:'pending',
        reason:'Hi, i am sorry i have a tight schedule this month.Kindly book ahead in the coming month if not urgent.I will be available'
    },
    {
        id:10,
        receiver:'noble stitches',
        name:'Yunus Abdullateef',
        bookingDate:'2025-03-31',
        bookingTime:'18:25',
        collectionDate:'2025-11-15',
        collectionTime:'14:32',
        status:'pending',
        reason:'Hi, i am sorry i have a tight schedule this month.Kindly book ahead in the coming month if not urgent.I will be available'
    },
    {
        id:11,
        receiver:'ariky stitches',
        name:'Yunus Abdullateef',
        bookingDate:'2025-03-31',
        bookingTime:'18:26',
        collectionDate:'2025-11-15',
        collectionTime:'14:32',
        status:'pending',
        reason:'Hi, i am sorry i have a tight schedule this month.Kindly book ahead in the coming month if not urgent.I will be available'
    },
    {
        id:12,
        receiver:'the industrous',
        name:'Yunus Abdullateef',
        bookingDate:'2025-04-02',
        bookingTime:'22:10',
        collectionDate:'2025-11-15',
        collectionTime:'14:32',
        status:'pending',
        reason:'Hi, i am sorry i have a tight schedule this month.Kindly book ahead in the coming month if not urgent.I will be available'
    },
    {
        id:13,
        receiver:'elegant one',
        name:'Yunus Abdullateef',
        bookingDate:'2025-03-31',
        bookingTime:'20:38',
        collectionDate:'2025-11-15',
        collectionTime:'14:32',
        status:'accepted',
        reason:'Hi, i am sorry i have a tight schedule this month.Kindly book ahead in the coming month if not urgent.I will be available'
    },
    {
        id:14,
        receiver:'elegant one',
        name:'Yunus Abdullateef',
        bookingDate:'2025-03-31',
        bookingTime:'20:38',
        collectionDate:'2025-11-15',
        collectionTime:'14:32',
        status:'completed',
        reason:'Hi, i am sorry i have a tight schedule this month.Kindly book ahead in the coming month if not urgent.I will be available'
    },
    {
        id:15,
        receiver:'elegant one',
        name:'Yunus Abdullateef',
        bookingDate:'2025-03-31',
        bookingTime:'20:38',
        collectionDate:'2025-11-15',
        collectionTime:'14:32',
        status:'completed',
        reason:'Hi, i am sorry i have a tight schedule this month.Kindly book ahead in the coming month if not urgent.I will be available'
    },
    {
        id:16,
        receiver:'elegant one',
        name:'Yunus Abdullateef',
        bookingDate:'2025-03-31',
        bookingTime:'20:38',
        collectionDate:'2025-11-15',
        collectionTime:'14:32',
        status:'completed',
        reason:'Hi, i am sorry i have a tight schedule this month.Kindly book ahead in the coming month if not urgent.I will be available'
    },
]

export const useClientStore = create((set,get)=>({ 
    currentMessages:complaints[0],
    setCurrentMessages:(index)=>{
        const {complaints} = get();
        set(state=>({
            ...state,currentMessages:complaints[index]
        }))
    },
    complaints,
    clients,
    bookings,
    dashboardBookings:[],
    setClients:(clients)=>{
        set(state=>({
            ...state,clients
        }))
    },
    setBookings:(bookings)=>{
        const {searchData} = useGlobalStore.getState();
        set(state=>({
            ...state,bookings
        }))
    },
    setComplaints:(complaints)=>{
        set(state=>({
            ...state,complaints
        }))
    },
    filterBookings:(data)=>{
      
    },
    filterClients:(data)=>{
        const filterClients = clients.filter(client=>client.status === data);
        set({clients:data === 'all' ? 
            clients :
            filterClients         
        })
    },
    // sort
     sortClients:(sortData)=>{
      const {clients} = get();
      const sortedClients =  sortItems(clients,sortData)
        set({clients:sortedClients})  
    },
     sortBookings:(sortData)=>{
      const {bookings} = get();
      const sortedBookings =  sortItems(bookings,sortData)
        set({bookings:sortedBookings})  
    },
     sortComplainants:(sortData)=>{
      const {complaints} = get();
      const sortedComplainants =  sortItems(complaints,sortData)
        set({complaints:sortedComplainants})  
    },
     confirmDelivery:async(appointment)=>{
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
    },
     likedPosts:async(page)=>{
         const response = await axios.get(`customer/profile?page=${page}`,{
            headers:{
            Authorization:`Bearer ${Cookies.get('token')}`,
            'Content-Type': 'application/json',
            Accept:'application/json'
            },
            withCredentials:true
        })
        return response
     },
     getAppointments:async()=>{
    const response = await axios.get('customer/profile',{
       headers: {
              Authorization: `Bearer ${Cookies.get('token')}`,
              'Content-Type': 'application/json',
              Accept: 'application/json'
            }
    })
    return response.data
  },
     clientPaystackVerification:async()=>{
    const response = await axios.get('user/payverify/?trxref=4757496&reference=4757496');
    return response.data
  }
       
//   calhost:5173/client/payverify?trxref=4757496&%20reference=4757496' because the schem
}))