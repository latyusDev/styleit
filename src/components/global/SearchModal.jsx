import React, { useEffect, useRef, useState } from 'react'
import { Filter, Search, X } from 'lucide-react';
import m_logo from '../../images/m_logo.png'
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/store/useAuth';
import SearchedPosts from '../dashboard/searchItems/SearchedPosts';
import SearchedCreators from '../dashboard/searchItems/SearchedCreators';
import Image from './Image';
import { useGlobalStore } from '@/store/global/useGlobal';
import { Button } from '../ui/button';
import StatesFilter from '../dashboard/searchItems/StatesFilter';
import Paginator from './Paginator';

const PAGES_TO_SHOW = 3;
const SearchModal = ({page}) => {

    const [tabValue,setTabValue] = useState('designers')
    const [isFilter,setIsFilter] = useState(false)
    const [desginerState,setDesignerState] = useState('all')
    const [designerPage,setDesignerPage] = useState(1)
    const [postPage,setPostPage] = useState(1)
    const {user} = useAuth();
    const searchRef = useRef(null)
    const {searchModal,setSearchModal,searchCreators,searchPosts,
        userDashboardSearchData,setUserDashboardSearchData} = useGlobalStore();

  const {data,error,isLoading,isError} = useQuery({
        queryKey:['search-creators',designerPage,userDashboardSearchData],
        queryFn:()=> searchCreators(designerPage),
        staleTime:1000*60*5,
      })
  const {data:searchPostData,error:postError,isError:isPostError,isLoading:isPostLoading} = useQuery({
        queryKey:['search-posts',postPage,userDashboardSearchData],
        queryFn:()=>searchPosts(postPage),
        staleTime:1000*60*5,
        enabled:!!user&&!!userDashboardSearchData
      })
      
      const handleCloseModal= ()=>{
        setSearchModal(false)
        setUserDashboardSearchData()
      }
      useEffect(()=>{
        if(searchRef.current){
            searchRef.current.focus()
        }
      },[])
      useEffect(()=>{
        if(userDashboardSearchData?.length === 0){
            setIsFilter(false)
            setDesignerState('all')
        }
      },[userDashboardSearchData,isFilter,searchModal])

      const handleFilterByState = (state,isMobile)=>{
        if(isMobile){
          setIsFilter(false)
        }
        setDesignerState(state)
      }
      const handlePostTab = ()=>{
        setTabValue('posts')
        setIsFilter(false)

      }

      const filteredDesigners = desginerState === 'all' ? 
      data?.results : data?.results?.filter(designer=>designer.state.toLowerCase() == desginerState.toLowerCase())
      const showFilterButton = !isLoading&&!isError&&userDashboardSearchData
      const showStateFilter = userDashboardSearchData&&isFilter
      const isDesigners = tabValue === 'designers'
  return (
    <>
            {
                searchModal&&
                <div className='px-5 font-lato py-6  flex justify-center  gap-3 bg-[rgba(0,0,0,0.1)]   z-[999]  fixed top-0  bottom-0 left-0 right-0  overflow-hidden transition-all duration-300 '>
            
            <div className="overflow-hidden  bg-white w-[1200px] shadow-md rounded-md relative z-50 p-6">
               
                     <div className="flex justify-between items-center mb-3">
                  <div>
                      <Image src={m_logo} />
                  </div>
                  <X  className="h-8 w-8 scale-[0.8] transition-all duration-300 hover:scale-[1.5] cursor-pointer" onClick={handleCloseModal}/>
                </div>
                {/* search input */}
                        <div className="relative ">
                                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                  <input
                                  ref={searchRef}
                                  onChange={(e)=>setUserDashboardSearchData(e.target.value)}
                                    type="text"
                                    placeholder="search..."
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg outline-none"
                                  />
                                  {
                                   isDesigners&&showFilterButton&&<Button onClick={()=>setIsFilter(!isFilter)} type='button' className='absolute right-3 top-1.5 text-white'><Filter/> Filter</Button>
                                  }
                                </div>
               {
                page === 'user-dashboard'&&<div>
        
                    <div className="flex gap-3 mt-4 font-lato font-[500]">
                        <div className='basis-[15%] '>
                        <button type='button' onClick={()=>setTabValue('designers')} className={`px-9 shadow-md py-4 rounded-md capitalize transition-all duration-300   ${tabValue !== 'designers'?'bg-white text-black hover:bg-primary hover:text-white':'text-white hover:bg-white bg-primary'} hover:text-black text-md`}>designers</button>
                        </div>
                        <div className='basis-[15%] '>
                        <button type='button' onClick={handlePostTab} className={`px-9 shadow-md py-4 rounded-md capitalize transition-all duration-300   ${tabValue !== 'posts'?'bg-white text-black hover:bg-primary hover:text-white':'text-white hover:bg-white bg-primary'}  hover:text-black text-md`}>posts</button>

                        </div>
                    </div>
                   
                  <div className='flex gap-2 items-start '>
                    
                  <div className={`h-[300px] ${isFilter ? 'hidden md:block md:flex-[0.8]': ' flex-1'} overflow-y-auto pt-4 pb-16 md:py-4 mt-4 `}>
                    {
                      isDesigners&& 
                      <div>
                          <SearchedCreators error={{error,isError}} isLoading={isLoading} userDashboardSearchData={userDashboardSearchData} creators={filteredDesigners}/>
                          <Paginator
                                    data={data}
                                    page={designerPage} 
                                    setPage={setDesignerPage} 
                                    PAGES_TO_SHOW={PAGES_TO_SHOW} 
                                />
                      </div>
                    }
                    {
                      tabValue === 'posts'&&  
                      <div>
                        <SearchedPosts error={{isPostError,postError}} userDashboardSearchData={userDashboardSearchData} isLoading={isPostLoading} posts={searchPostData?.results} />
                        <Paginator
                                      data={searchPostData}
                                      page={postPage} 
                                      setPage={setPostPage} 
                                      PAGES_TO_SHOW={PAGES_TO_SHOW} 
                                  />
                      </div>
                    }
                    
                  </div>
                  {
                    showStateFilter&& 
                   <StatesFilter handleFilterByState={handleFilterByState} desginerState={desginerState}/>
                  }
                </div>
                </div>
               }

                {
                page === 'home'&&
                  <div className='flex gap-2 items-start mt-6 '>
                    <div className={`h-[300px] ${isFilter ? 'hidden md:block md:flex-[0.8]': ' flex-1'} overflow-y-auto pt-4 pb-16 md:py-4 mt-4 `}>
                    <SearchedCreators error={{error,isError}}  isLoading={isLoading} userDashboardSearchData={userDashboardSearchData} creators={filteredDesigners}/>
                </div>
                 {
                    showStateFilter&& 
                   <StatesFilter handleFilterByState={handleFilterByState} desginerState={desginerState}/>
                  }
                  </div>
                }
               </div>
               
            </div> 
              }
              
    </>
  )
}

export default SearchModal