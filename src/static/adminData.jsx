import React from 'react'
import ActiveUsers from '@/components/admin/dashboard/user/ActiveUsers'
import NewUsers from '@/components/admin/dashboard/user/NewUsers'
import UserRetentionRate from '@/components/admin/dashboard/user/UserRetentionRate'
import profile from '@/images/profile_i.png'

const adminLinks = [
    {
        id:8,
        name:'dashboard',
        links:null
    },
    {
        id:1,
        name:'creators',
        links:['subscriptions','payments']
    },
    {
        id:2,
        name:'clients',
        links:['bookings','transaction payments','complaints & disputes']
    },
    {
        id:4,
        name:'platform management',
        links:['subscriptions','payments']
    },
    {
        id:5,
        name:'analytics & reports',
        links:['subscriptions','payments']
    },
    {
        id:6,
        name:'supports & notifications',
        links:['subscriptions','payments']
    },
    {
        id:9,
        name:'my profile',
        links:null
    },
    {
        id:10,
        name:'representatives',
        links:null
    },
    {
        id:11,
        name:'all transfer',
        links:null
    },
    
]

const period = [
    {
        id:1,
        name:'daily',
        times:7
    },
    {
        id:2,
        name:'weekly',
        times:3
    },
    {
        id:3,
        name:'monthly',
        times:14
    },
    {
        id:4,
        name:'yearly',
        times:44
    }
]

const admins = [
    {
        id:1,
        name:'uthman fatai',
        activities:[
            {
                id:1,
                activityName:'active times',
                activity:6,
            },
            {
                id:2,
                activityName:'banned users',
                activity:13,
            },
            {
                id:4,
                activityName:'suspended users',
                activity:12
            },
            {
                id:3,
                activityName:'reset password',
                activity:16,

            }
        ]
    },
    {
        id:2,
        name:'abdullahi fatai',
        activities:[
            {
                id:1,
                activityName:'active times',
                activity:4,
            },
            {
                id:2,
                activityName:'banned users',
                activity:5,
            },
            {
                id:4,
                activityName:'suspended users',
                activity:20
            },
            {
                id:3,
                activityName:'reset password',
                activity:20,

            }
        ]
    },
    {
        id:3,
        name:'Faruq Sulaiman',
        activities:[
            {
                id:1,
                activityName:'active times',
                activity:9,
            },
            {
                id:2,
                activityName:'banned users',
                activity:130,
            },
            {
                id:4,
                activityName:'suspended users',
                activity:43
            },
            {
                id:3,
                activityName:'reset password',
                activity:60,

            }
        ]
    },
    {
        id:4,
        name:'salam Yusuf',
        activities:[
            {
                id:1,
                activityName:'active times',
                activity:6,
            },
            {
                id:2,
                activityName:'banned users',
                activity:13,
            },
            {
                id:4,
                activityName:'suspended users',
                activity:2
            },
            {
                id:3,
                activityName:'reset password',
                activity:16,

            }
        ]
    },
    {
        id:5,
        name:'fatai Yusrat ',
        activities:[
            {
                id:1,
                activityName:'active times',
                activity:6,
            },
            {
                id:2,
                activityName:'banned users',
                activity:13,
            },
            {
                id:4,
                activityName:'suspended users',
                activity:1
            },
            {
                id:3,
                activityName:'reset password',
                activity:16,

            }
        ]
    },
    {
        id:6,
        name:'Adeleke Muminat',
        activities:[
            {
                id:1,
                activityName:'active times',
                activity:6,
            },
            {
                id:2,
                activityName:'banned users',
                activity:13,
            },
            {
                id:4,
                activityName:'suspended users',
                activity:12
            },
            {
                id:3,
                activityName:'reset password',
                activity:16,
            }
        ]
    }
]


const dadmins = [
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

const creators = [
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
]
const ratingData = [
  { label: "ONE", stars: 1, value: 12, percentage: 2 },
  { label: "TWO", stars: 2, value: 28, percentage: 5 },
  { label: "THREE", stars: 3, value: 156, percentage: 12 },
  { label: "FOUR", stars: 4, value: "4.5K", percentage: 75 },
  { label: "FIVE", stars: 5, value: 969, percentage: 95 }
];


const reviews = [
  {
    id: 1,
    image:profile,
    name: "Alex Chen",
    rating: 5,
    comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam animi unde maiores explicabo deserunt accusamus dolore praesentium earum modi eveniet? Excellent service and quality!",
    date: "2024-06-15"
  },
  {
    id: 2,
    image:profile,
    name: "Maria Garcia",
    rating: 4,
    comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam animi unde maiores explicabo deserunt accusamus dolore praesentium earum modi eveniet? Very good, will order again.",
    date: "2024-06-14"
  },
  {
    id: 3,
    image:profile,
    name: "David Brown",
    rating: 3,
    comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam animi unde maiores explicabo deserunt accusamus dolore praesentium earum modi eveniet? It's okay, nothing special.",
    date: "2024-06-13"
  },
  {
    id: 4,
    image:'',
    name: "Sarah Johnson",
    rating: 5,
    comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam animi unde maiores explicabo deserunt accusamus dolore praesentium earum modi eveniet? Amazing product! Exceeded my expectations completely.",
    date: "2024-06-12"
  },
  {
    id: 5,
    image:profile,
    name: "Michael Wilson",
    rating: 2,
    comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam animi unde maiores explicabo deserunt accusamus dolore praesentium earum modi eveniet? Not what I expected. Quality could be better.",
    date: "2024-06-11"
  },
  {
    id: 6,
    image:profile,
    name: "Emily Davis",
    rating: 4,
    comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam animi unde maiores explicabo deserunt accusamus dolore praesentium earum modi eveniet? Good value for money. Fast delivery too.",
    date: "2024-06-10"
  },
  {
    id: 7,
    image:'',
    name: "James Rodriguez",
    rating: 5,
    comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam animi unde maiores explicabo deserunt accusamus dolore praesentium earum modi eveniet? Perfect! Exactly what I was looking for.",
    date: "2024-06-09"
  },
  {
    id: 8,
    image:profile,
    name: "Lisa Thompson",
    rating: 3,
    comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam animi unde maiores explicabo deserunt accusamus dolore praesentium earum modi eveniet? Average product. Works but nothing outstanding.",
    date: "2024-06-08"
  },
  {
    id: 9,
    image:profile,
    name: "Robert Lee",
    rating: 4,
    comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam animi unde maiores explicabo deserunt accusamus dolore praesentium earum modi eveniet? Solid purchase. Would recommend to others.",
    date: "2024-06-07"
  },
  {
    id: 10,
    image:profile,
    name: "Jennifer White",
    rating: 5,
    comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam animi unde maiores explicabo deserunt accusamus dolore praesentium earum modi eveniet? Outstanding quality and customer service!",
    date: "2024-06-06"
  },
  {
    id: 11,
    image:profile,
    name: "Kevin Martinez",
    rating: 1,
    comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam animi unde maiores explicabo deserunt accusamus dolore praesentium earum modi eveniet? Very disappointed. Product broke after one day.",
    date: "2024-06-05"
  },
  {
    id: 12,
    image:profile,
    name: "Amanda Clark",
    rating: 4,
    comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam animi unde maiores explicabo deserunt accusamus dolore praesentium earum modi eveniet? Really nice! Minor issues but overall satisfied.",
    date: "2024-06-04"
  },
  {
    id: 13,
    image:profile,
    name: "Daniel Anderson",
    rating: 5,
    comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam animi unde maiores explicabo deserunt accusamus dolore praesentium earum modi eveniet? Best purchase I've made this year!",
    date: "2024-06-03"
  },
  {
    id: 14,
    image:profile,
    name: "Michelle Taylor",
    rating: 3,
    comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam animi unde maiores explicabo deserunt accusamus dolore praesentium earum modi eveniet? It's decent. Does what it's supposed to do.",
    date: "2024-06-02"
  },
  {
    id: 15,
    image:profile,
    name: "Christopher Moore",
    rating: 4,
    comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam animi unde maiores explicabo deserunt accusamus dolore praesentium earum modi eveniet? Great product with quick shipping!",
    date: "2024-06-01"
  },
  {
    id: 16,
    image:profile,
    name: "Ashley Harris",
    rating: 2,
    comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam animi unde maiores explicabo deserunt accusamus dolore praesentium earum modi eveniet? Overpriced for what you get. Expected more.",
    date: "2024-05-31"
  },
  {
    id: 17,
    image:profile,
    name: "Ryan Jackson",
    rating: 5,
    comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam animi unde maiores explicabo deserunt accusamus dolore praesentium earum modi eveniet? Incredible! Will definitely buy again.",
    date: "2024-05-30"
  },
  {
    id: 18,
    image:profile,
    name: "Nicole Lewis",
    rating: 4,
    comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam animi unde maiores explicabo deserunt accusamus dolore praesentium earum modi eveniet? Good product, easy to use and reliable.",
    date: "2024-05-29"
  },
  {
    id: 19,
    image:profile,
    name: "Brandon Walker",
    rating: 3,
    comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam animi unde maiores explicabo deserunt accusamus dolore praesentium earum modi eveniet? Fair quality. Could use some improvements.",
    date: "2024-05-28"
  },
  {
    id: 20,
    image:profile,
    name: "Stephanie Young",
    rating: 5,
    comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam animi unde maiores explicabo deserunt accusamus dolore praesentium earum modi eveniet? Love it! Fantastic quality and great price.",
    date: "2024-05-27"
  }
];


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

// dashboard

const bookingDashboardTabs = ['all','in progress','pending','completed','cancelled']
const clientDashboardTabs = ['all','approved','banned','suspended']
const paymentDashboardTabs = ['all','successful','pending','declined']
const dashboardSubscriptionTabs = ['all','free subscribers','paid subscribers','active','expired']

const creatorDashboardTabs = ['all','active subscribers','pending','suspended/banned','top performance','most booked']
const adminDashboardTabs = ['all','leader board','banned','suspended']

const userDashboardTabs = [
    {
        id:1,
        name:'active users',
        component:<ActiveUsers />,
        tabs:[
            {
                id:1,
                name:'weekly'
            },
            {
                id:2,
                name:'monthly'
            }
        ]
    },
    {
        id:2,
        name:'new users',
        component:<NewUsers />,
        tabs:[
            {
                id:1,
                name:'weekly'
            },
            {
                id:2,
                name:'monthly'
            }
        ]
    },
    {
        id:3,
        name:'retention rate',
        component:<UserRetentionRate />,
        tabs:[
            {
                id:1,
                name:'weekly'
            },
            {
                id:2,
                name:'monthly'
            }
        ]
    },
]





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


const bgColors = [
    'bg-red-500', 'bg-purple-500', 
    'bg-blue-500', 'bg-yellow-500', 
    'bg-indigo-500', 'bg-green-500', 
    'bg-violet-500', 'bg-black-500', 
    'bg-cyan-500', 'bg-teal-500', 
]

const randomIndex = ()=>Math.floor(Math.random()*bgColors.length)

const loginDetails =  [
        {
            id:1,
            name:'daily',
            value:3
        },
        {
            id:2,
            name:'weekly',
            value:15
        },
        {
            id:3,
            name:'montly',
            value:18
        }
    ]
const months = [
  'Jan','Feb','Match','April','May','June','July',
  'August','September','October','November','December'
];



export {
    adminLinks,creators,creatorSubscriptions,bgColors,loginDetails,ratingData,
    months,userDashboardTabs,bookingDashboardTabs,adminDashboardTabs,clientDashboardTabs,
    bookings,creatorPayments,complaints,randomIndex,dadmins,paymentDashboardTabs,
    admins,period,reviews,creatorDashboardTabs,dashboardSubscriptionTabs
}