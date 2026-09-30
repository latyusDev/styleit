import React from 'react'
import FashionDesignerCard from '../creator/fashionDesigners/FashionDesignerCard'
import ErrorMessage from '@/components/global/ErrorMessage'
import PostListLoader from '@/components/global/loaders/PostListLoader'

const SearchedCreators = ({isLoading,error,creators=[],userDashboardSearchData}) => {
  return (
   
    <div>
      {
        isLoading?<PostListLoader/>:<>
          <div>
                {
                  error.isError?<ErrorMessage error={error.error}/>:
                  <div>
                               {
        creators?.length === 0 && userDashboardSearchData ? <div>
          <h1 className='text-center mt-6 text-xl'>No creator found</h1>
        </div>:
         <div className="flex flex-wrap justify-center gap-6 mb-12 ">
            {creators.map((designer) => (
            <FashionDesignerCard key={designer.id} designer={designer}/>
            ))}
        </div>
       }
                  </div>
                }
          </div>
        </>
      }
    </div>
  )
}

export default SearchedCreators