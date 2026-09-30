import axios from "axios";
import Cookies from "js-cookie";
import { create } from "zustand";
import { useAuth } from "../useAuth";
  

export const useGlobalStore = create((set,get)=>({
    headerHeight:null,
    currentTab:1,
    searchData:'',
    isNavbarOpened:false,
    setIsNavbarOpened:()=>{
      const {isNavbarOpened} = get();
      set({isNavbarOpened:!isNavbarOpened})
    },
    userDashboardSearchData:'',
    setCreators:(creators)=>{
        set({creators})
    },
    setPosts:(posts)=>{
        set({posts})
    },
    setUserDashboardSearchData:(userDashboardSearchData)=>{
        set({userDashboardSearchData})
    },
    searchCreators:async(page = 1, debouncedSearch = '')=>{

      const {token} = useAuth.getState()
        const {userDashboardSearchData} = get();
     try{
      const response = await axios.post(`search_creator/?page=${page}`,{
    search:userDashboardSearchData||debouncedSearch
  },{
            headers:{
              ...(token&&{Authorization:`Bearer ${Cookies.get('token')}`}),
              'Content-Type': 'application/json',
              Accept:'application/json'
            }
      })
      return response?.data
     }catch(error){
        throw(error)
     }
  },
   
    searchPosts:async(page = 1)=>{
        const {userDashboardSearchData} = get();
        const {token} = useAuth.getState()

     try{
      const response = await axios.post(`postsearch/?page=${page}`,{
    search:userDashboardSearchData
  },{
            headers:{
              ...(token&&{Authorization:`Bearer ${Cookies.get('token')}`}),
              'Content-Type': 'application/json',
              Accept:'application/json'
            }
      })
      return response?.data
     }catch(error){
        throw(error)
     }
  },
  
    postModal:false,
    isShared:false,
    searchModal:false,
    setSearchModal:(searchModal)=>set({searchModal}),
    setIsShared:()=>set({isShared:true}),
    setPostModal:()=>set((state)=>({postModal:!state.postModal})),
    currentDashboardTab:0,
    setCurrentDashboardTab:(currentDashboardTab)=>{
        set({currentDashboardTab})
    },
    setSearchData:(searchData)=>set(state=>({
        ...state,searchData
    })),
    setCurrentTab:(currentTab)=>set(state=>({...state,currentTab})),
    getHeaderHeight:(headerHeight)=>set((state)=>({...state,headerHeight})),
    isSidebarOpened:false,
    setIsSidebarOpened:()=>set((state)=>({
        ...state,isSidebarOpened:!state.isSidebarOpened
    })),
    isAdminOpened:false,
    setIsAdminOpened:()=>set((state)=>({
        ...state,isAdminOpened:!state.isAdminOpened
    })),
}))

