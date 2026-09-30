import profile from '../images/profile.png'
import profile_h from '../images/profile_h.png'
import receipt from '../images/receipt-edit.png'
import receipt_h from '../images/receipt-edit_h.png'
import calendar_h from '../images/calendar-edit_h.png'
import calendar from '../images/calendar-edit.png'
import history from '../images/note.png'
import subscription from '../images/cards.png'
import createPost from '../images/edit.png'
import postImage from '../images/post_i.png'
import setting from '../images/setting.png'
import ko from '../images/ko.png'
import bag from '../images/bag-2.png'
import mike from '../images/mike.png'
import jane from '../images/jenifa.png'

import caro from '../images/caro.png';
import cynthia from '../images/cynthia.png';
import esther from '../images/esther.png';
import samuel from '../images/samuel.png';
import isreal from '../images/isreal.png';
import paulina from '../images/paulina.jpeg';



export const postTopImages = [postImage,postImage,postImage,postImage]
export const postImages = [postImage,postImage,profile,postImage,postImage,postImage,postImage]


// mobile routes


  const navItems = [
    { name: 'Home', route: '/' },
    { name: 'trending', route: '/trending' },
    { name: 'fashion designer', route: '/fashionDesigners' },
  ];
 
  const dashboardLinks = [
    { name: 'profile', route: '/creator/profile' },
    { name: 'create post', route: '/creator/create-post' },
    { name: 'history', route: '/creator/history' },
    { name: 'posts', route: '/creator/posts' },
    { name: 'subscriptions', route: '/creator/subscriptions' }
  ];

  const clientDashboardLinks = [
    { name: 'profile', route: '/client/profile' },
    { name: 'Like Posts', route: '/client/LikedPosts' },
    { name: 'notifications', route: '/notifications' },
    { name: 'appointment details', route: '/client/appointmentDetails' },
    { name: 'Book Appointment', route: '/client/bookAppointment' },
    { name: 'settings', route: '/client/settings' },
  ];

const happyClients = [
    {
        name:'Mike.J',
        imageUrl:mike,
        feedback:{
            comment:'"Partnering with styleit africa turned out to be my best choice"'
        }
    },
    {
        name:'Jane.R',
        imageUrl:jane,
        feedback:{
            comment:'"This is one of the best fashionista platform out there that provides high quality service and security"'
        }
    },
    {
        name:'Isreal',
        imageUrl:isreal,
        feedback:{
            comment:'"i have got multiple orders and i am obsessed, this platform is the best!!!"'

        }
    }

]

const countries = [
    { name: "Nigeria", capital: "Abuja" },
    { name: "Ethiopia", capital: "Addis Ababa" },
    { name: "Egypt", capital: "Cairo" },
    { name: "Democratic Republic of the Congo", capital: "Kinshasa" },
    { name: "Tanzania", capital: "Dodoma" },
    { name: "South Africa", capital: "Pretoria" },
    { name: "Kenya", capital: "Nairobi" },
    { name: "Uganda", capital: "Kampala" },
    { name: "Algeria", capital: "Algiers" },
    { name: "Sudan", capital: "Khartoum" },
    { name: "Morocco", capital: "Rabat" },
    { name: "Angola", capital: "Luanda" },
    { name: "Ghana", capital: "Accra" },
    { name: "Mozambique", capital: "Maputo" },
    { name: "Madagascar", capital: "Antananarivo" },
    { name: "Cameroon", capital: "Yaoundé" },
    { name: "Côte d'Ivoire", capital: "Yamoussoukro" },
    { name: "Niger", capital: "Niamey" },
    { name: "Burkina Faso", capital: "Ouagadougou" },
    { name: "Mali", capital: "Bamako" },
    { name: "Zambia", capital: "Lusaka" }
];


const reasons = {
    clientLogin:['Direct contact with Clients','Product showcase on trending','Secure payment mode'],
    fashionLogin:['Direct contact with Creators','Book the service of a fashion designer','Prompt and secure service quality'],
    clientSignUp:['Direct contact with Clients','Product showcase on trending','Secure payment mode'],
    fashionSignUp:['Direct contact with Creators','Book the service of a fashion designer','Prompt and secure service quality'],
}

const dashboardTabs = {
    creatorTabs: [
        {
            id:1,
            name:'profile',
            icon:profile,
            activeIcon:profile_h
        },
        {
            id:2,
            name:'post',
            icon:receipt,
            activeIcon:receipt_h
        },
        {
            id:3,
            name:'bookings',
            icon:calendar,
            activeIcon:calendar_h
        },
    ],
    clientTabs: [
        {
            id:1,
            name:'profile',
            icon:profile,
            activeIcon:profile_h
        },
        {
            id:2,
            name:'liked post',
            icon:receipt,
            activeIcon:receipt_h
        },
        {
            id:3,
            name:'appointment details',
            icon:calendar,
            activeIcon:calendar_h
        },
    ],
}


const userProfile = {
    image:'',
    firstName:'Micheal',
    lastName:'Moses',
    mobile:'09066778876',
    email:'michaelmoses@gmail.com',
    // description:'lorem'
    description:"i'm a fashion designer with 5 years of experience in designing fashionable clothes i'm a fashion designer with 5 years of experience in designing fashionable clothes i'm a fashion designer with 5 years of experience in designing fashionable clothes i'm a fashion designer with 5 years of experience in designing fashionable clothes i'm a fashion designer with 5 years of experience in designing fashionable clothes",
    lga:'ifako-ijaye',
    address:'181, fola Azeez Cresent, Akuko',
    accountNumber:'00192207800',
    bankName:'Guarantee trust bank'
}

const appointments = [
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
        name:'Ademola Decode',
        bookingDate:'2024-11-10',
        bookingTime:'12:30',
        collectionDate:'2024-11-15',
        collectionTime:'15:20',
        status:'declined',
        reason:'Hi, i am sorry i have a tight schedule this month.Kindly book ahead in the coming month if not urgent.I will be available'
    },
    {
        id:3,
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
        status:'paid',
        reason:'Hi, i am sorry i have a tight schedule this month.Kindly book ahead in the coming month if not urgent.I will be available'
    },
]

const sidebarLinks = {
    creator:[
        {
            id:1,
            name:'Profile',
            icon:ko,
            route:'/profile'
        },
        {
            id:2,
            name:'Create a post',
            icon:createPost,
            route:'/create-post'
        },
        {
            id:3,
            name:'Subscription',
            icon:subscription,
            route:'/subscriptions'
        },
        {
            id:4,
            name:'History',
            icon:history,
            route:'/history'
        },
        {
            id:5,
            name:'Notifications',
            icon:null,
            route:'/notifications'
        },
    ],
    client:[
        {
            id:1,
            name:'Profile',
            icon:createPost,
            route:'/profile'
        },
        {
            id:2,
            name:'Liked posts',
            icon:ko,
            route:'/likedPosts'
        },
        {
            id:3,
            name:'Appointment details',
            icon:bag,
            route:'/appointmentDetails'
        },
        {
            id:4,
            name:'Book Appointment',
            icon:bag,
            route:'/bookAppointment'
        },
        {
            id:5,
            name:'Notifications',
            icon:history,
            route:'/notifications'
        },
        {
            id:6,
            name:'Settings',
            icon:setting,
            route:'/settings'
        },
        
    ],
}

const posts = [
    {
        id:1,
        userId:2,
        description:"i started my journey of stylist in the year 2005 with just a come and hair divider. I was managing at my friend's shop at a very extreme com..",
        comments:[
            {
                userId:3,
                name:'kolade',
                description:"incredible jouney!... i'm so glad you made it",
                replies:[
                    {
                        userId:2,
                        name:'kolade',
                        description:"incredible jouney!... i'm so glad you made it",
                    }
                ]
            },
            {
                userId:4,
                name:'james',
                description:"Wow...that's a rough starting point,glad you made it",
                replies:[
                    {
                        userId:2,
                        name:'kolade',
                        description:"incredible jouney!... i'm so glad you made it",
                    }
                ]
            },
        ]
    },
    {
        id:2,
        userId:2,
        description:"i started my journey of stylist in the year 2005 with just a come and hair divider. I was managing at my friend's shop at a very extreme com..",
        comments:[
            {
                userId:3,
                name:'kolade',
                description:"incredible jouney!... i'm so glad you made it",
                replies:[
                    {
                        userId:2,
                        name:'kolade',
                        description:"Thank you",
                    }
                ]
            },
            {
                userId:4,
                name:'james',
                description:"Wow...that's a rough starting point,glad you made it",
                replies:[
                    {
                        userId:2,
                        name:'kolade',
                        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed in tenetur beatae, quasi voluptatibus quisquam quis magni praesentium assumenda molestiae mollitia error repellendus officiis unde cupiditate. Necessitatibus aliquid quos nihil.",
                    }
                ]
            },
            {
                userId:4,
                name:'fatai',
                description:"Wow...that's a rough starting point,glad you made it",
                replies:[
                    {
                        userId:2,
                        name:'kolade',
                        description:"incredible jouney!... i'm so glad you made it",
                    }
                ]
            },
        ]
    },
    {
        id:3,
        userId:2,
        description:"i started my journey of stylist in the year 2005 with just a come and hair divider. I was managing at my friend's shop at a very extreme com..",
        comments:[
            {
                userId:3,
                name:'kolade',
                description:"incredible jouney!... i'm so glad you made it",
                replies:[
                    {
                        userId:2,
                        name:'kolade',
                        description:"Thank you",
                    }
                ]
            },
            {
                userId:4,
                name:'james',
                description:"Wow...that's a rough starting point,glad you made it",
                replies:[
                    {
                        userId:2,
                        name:'kolade',
                        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed in tenetur beatae, quasi voluptatibus quisquam quis magni praesentium assumenda molestiae mollitia error repellendus officiis unde cupiditate. Necessitatibus aliquid quos nihil.",
                    }
                ]
            },
            {
                userId:4,
                name:'fatai',
                description:"Wow...that's a rough starting point,glad you made it",
                replies:[
                    {
                        userId:2,
                        name:'kolade',
                        description:"incredible jouney!... i'm so glad you made it",
                    }
                ]
            },
        ]
    }
]

const myPosts = [
    {
        id:1,
        title:'Crosset',
        description:' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum ducimus molestiae, tenetur tempore eum deleniti?',
        imageUrl:postImage
    },
    {
        id:2,
        title:'Ankara',
        description:' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum ducimus molestiae, tenetur tempore eum deleniti?',
        imageUrl:postImage
    },
    {
        id:3,
        title:'seven star material',
        description:' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum ducimus molestiae, tenetur tempore eum deleniti?',
        imageUrl:postImage
    },
    {
        id:4,
        title:'Crosset',
        description:' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum ducimus molestiae, tenetur tempore eum deleniti?',
        imageUrl:postImage
    },
    {
        id:5,
        title:'Crosset',
        description:' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum ducimus molestiae, tenetur tempore eum deleniti?',
        imageUrl:postImage
    },
    {
        id:6,
        title:'Crosset',
        description:' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum ducimus molestiae, tenetur tempore eum deleniti?',
        imageUrl:postImage
    },
    {
        id:7,
        title:'Crosset',
        description:' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum ducimus molestiae, tenetur tempore eum deleniti?',
        imageUrl:postImage
    },
    {
        id:8,
        title:'Crosset',
        description:' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum ducimus molestiae, tenetur tempore eum deleniti?',
        imageUrl:postImage
    },
    {
        id:9,
        title:'Crosset',
        description:' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum ducimus molestiae, tenetur tempore eum deleniti?',
        imageUrl:postImage
    },
    {
        id:10,
        title:'Crosset',
        description:' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum ducimus molestiae, tenetur tempore eum deleniti?',
        imageUrl:postImage
    },
    {
        id:11,
        title:'Crosset',
        description:' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum ducimus molestiae, tenetur tempore eum deleniti?',
        imageUrl:postImage
    },
    {
        id:12,
        title:'Crosset',
        description:' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum ducimus molestiae, tenetur tempore eum deleniti?',
        imageUrl:postImage
    }
]

const trendingItems = [
  { id: 1, img: caro,    remarkImg: isreal,  alt: "caro"    },
  { id: 2, img: cynthia, remarkImg: esther,  alt: "cynthia" },
  { id: 3, img: paulina, remarkImg: samuel,  alt: "cynthia" },
];

const subscriptions = [
    {
        id:1,
        period:'free',
        discount:'no discount benefits',
        amount:'free',
    },
    {
        id:2,
        period:'monthly',
        discount:'no discount benefits',
        amount:1000,
    },
    {
        id:3,
        period:'quarterly',
        discount:'Enjoy 20% discount',
        amount:3000,
    },
    {
        id:4,
        period:'Bi-annual ',
        discount:'Enjoy 30% discount',
        amount:5000,
    },
    {
        id:5,
        period:'annual',
        discount:'Enjoy 30% discount',
        amount:10000,
    }
]

const subscriptionDetails = [
    {
        id:1,
        date:'18-08-2024',
        time:'12:00pm',
        planType:'monthly',
        startDate:'18-08-2024',
        endDate:'18-08-2024',
        paymentStatus:'pending',
        subStatus:'deactive'
    },
    {
        id:2,
        date:'18-08-2024',
        time:'12:00pm',
        planType:'monthly',
        startDate:'18-08-2024',
        endDate:'18-08-2024',
        paymentStatus:'pending',
        subStatus:'deactive'
    },
    {
        id:3,
        date:'18-08-2024',
        time:'12:00pm',
        planType:'monthly',
        startDate:'18-08-2024',
        endDate:'18-08-2024',
        paymentStatus:'paid',
        subStatus:'active'
    },
    {
        id:4,
        date:'18-08-2024',
        time:'12:00pm',
        planType:'half year',
        startDate:'18-08-2024',
        endDate:'18-08-2024',
        paymentStatus:'paid',
        subStatus:'active'
    },
    {
        id:5,
        date:'18-08-2024',
        time:'12:00pm',
        planType:'yearly',
        startDate:'18-08-2024',
        endDate:'18-08-2024',
        paymentStatus:'paid',
        subStatus:'active'
    },
    {
        id:6,
        date:'18-08-2024',
        time:'12:00pm',
        planType:'monthly',
        startDate:'18-08-2024',
        endDate:'18-08-2024',
        paymentStatus:'paid',
        subStatus:'active'
    },
]

const nonSubscriptionPages = ['','signUp','login'];

const faqs = [
    {
        id:1,
        question:'Why Styleit Africa ?',
        answer:'Styleit Africa is a B2C social networking platforms for professional fashionistas. It is a home where user meet with professional designers in all forms of fashion world such as tailors, hair and hairstyles, cobblers, belt, hat and bags designers including bangles.'
    },
    {
        id:3,
        question:'Who is a Clients?',
        answer:'A client is a user who requested for the services of a creator in exchange for money and quality product design to suit his/her needs.'
    },
    {
        id:4,
        question:'How will I receive payment ?',
        answer:`Payment are made to creators on completion and delivery of services rendered. Ensure to have your client payment reference number handy incase there is a delay in payment.
        Note: For complaint on delayed payment after delivery send email to Admin.`
    },
    {
        id:5,
        question:'Can I pay offline ?',
        answer:'A creator is a professional fashionista who render a professional services to a client who needs personal brand wears for his or her next occasion.'
    },
    {
        id:6,
        question:'Why should I pay online ?',
        answer:'All payments should be carried out online to prevent been scammed by an imposter and fraudsters.'
    },
    {
        id:7,
        question:'How can I get a refund of service not rendered ?',
        answer:'If service not rendered send a mail stating your request in detail to support@styleit.africa.'
    },
    {
        id:8,
        question:'Can I get a refund for a poor service delivery ?',
        answer:'No refund for a service delivery so far your service have been rendered. You are advise to book creators within your locality so you can have accurate measurements, judge creators skills and monitor the progress of your outfits.'
    },
    {
        id:9,
        question:'How can I prevent the scandal of What I order vs what I got ?',
        answer:'Booking creators of fashion wears within your locality will enable you to have access to the office and confirm the genuineness and professionalism of the creators skills.'
    }
]

const userRoles = ['admin','superadmin','designer']
const safeDate = (val) => {
  if (!val) return new Date();
  
  // If already a Date object
  if (val instanceof Date) return isNaN(val.getTime()) ? new Date() : val;
  
  // If string, fix the space issue for iOS
  if (typeof val === 'string') {
    val = val.replace(' ', 'T');
  }

  const d = new Date(val);
  return isNaN(d.getTime()) ? new Date() : d;
};
const confettiNumbers = [1,2,10,20,50,100,500,1000]


export {
    safeDate,confettiNumbers,
    happyClients,reasons,countries,dashboardTabs,posts,subscriptionDetails,faqs, dashboardLinks,navItems,clientDashboardLinks
    ,userProfile,appointments,sidebarLinks,myPosts,subscriptions,nonSubscriptionPages,userRoles,trendingItems
}