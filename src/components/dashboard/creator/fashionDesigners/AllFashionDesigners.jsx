import React, { useState } from 'react';
import {  Search } from 'lucide-react';
import FashionDesignerCard from './FashionDesignerCard';
import { useQuery } from '@tanstack/react-query';
import PostListLoader from '@/components/global/loaders/PostListLoader';
import ErrorMessage from '@/components/global/ErrorMessage';
import Paginator from '@/components/global/Paginator';
import { useCreatorStore } from '@/store/useCreator';
import { useGlobalStore } from '@/store/global/useGlobal';

const PAGES_TO_SHOW = 2;
const AllFashionDesigners = () => {
  const [page, setPage] = useState(1)
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const {getDesigners} = useCreatorStore();
  const {searchCreators} = useGlobalStore();

           const { data, isLoading, error, isError } = useQuery({
                queryKey: ['allDesigners', page, debouncedSearch],
                queryFn: () => {
                    if (debouncedSearch) {
                        return searchCreators(page, debouncedSearch)
                    }
                    return getDesigners(page)
                },
                keepPreviousData: true, // Smooth transitions between pages
                staleTime: 1000*10*60, // Consider data fresh for 1 mins
            });

  
  const designers = data?.designers||data?.results||[]

  return (
    <div className="min-h-screen bg-gradient-to-tl to-pink-50  to-[50%] from-[50%] md:to-[54.2%] from-gray-50 md:from-[54.7%] py-16 px-4 font-lato">
      <div className="container">
            <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">All Fashion Designers</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse our complete collection of  talented fashion designers
          </p>
        </div>

        {/* Search */}
      <div>
          <div className="bg-white rounded-xl shadow-md p-6 mb-8 mx-auto max-w-[1200px]">
            <div className="relative ">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search designers..."
                value={debouncedSearch}
                onChange={(e) => {
                  setDebouncedSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg outline-none"
              />
            </div>
        </div>
      </div>

        {/* Designers Grid */}
       {
        isLoading ? <PostListLoader/>:

          <div>
                {
                  isError ? <ErrorMessage error={error}/>:

                    designers?.length === 0 ? <h1 className='text-center mt-16 text-xl'>No designers found</h1>: <div className="flex flex-wrap justify-center gap-6 mb-12">
                    {designers.map((designer) => (
                      <FashionDesignerCard key={designer.id||designer.creator_id} designer={designer}/>
                    ))}
                </div>
            }

          </div>
       }
       {/* Pagination */}
          {designers?.length > 0 && (
              <Paginator
                  data={data}
                  page={page}
                  setPage={setPage}
                  PAGES_TO_SHOW={PAGES_TO_SHOW}
              />
          )}

      
      </div>
      </div>
    </div>
  );
};

export default AllFashionDesigners;