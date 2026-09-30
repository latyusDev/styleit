import React from 'react'
import UserProfile from '../profile/UserProfile'
import LoginDetails from '../LoginDetails';
import RatingAndReviews from '../RatingAndReviews';
import { useQuery } from '@tanstack/react-query';
import { useAdminClientStore } from '@/store/admin/clientStore/useAdminClient';
import { useAdminCreatorStore } from '@/store/admin/creatoreStore/useAdminCreator';
import { useLocation, useParams } from 'react-router-dom';
import EditBankDetails from '../../creator/EditBankDetails';


const CurrentInformation = ({currentTab})=>{
        const {pathname} = useLocation();
        const {id} = useParams();
        const {getClientDetails} = useAdminClientStore();
        const {getCreatorDetails} = useAdminCreatorStore()
        const isClient = pathname.includes('clients') 
        
        const {data,isLoading,error,isError} = useQuery({
        queryKey:[isClient?'single-client':'single-creator',id],
        queryFn:()=>isClient?getClientDetails(id):getCreatorDetails(id),
        staleTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false
     })
     

     switch (currentTab) {
        case 'profile':
            return  <UserProfile data={data} isClient={isClient}
                    isLoading={isLoading} isError={isError} error={error}/>
        case 'loginDetails':
            return <LoginDetails  creator={data?.Creator}
             isLoading={isLoading} isError={isError} error={error} />
        case 'bankDetails':
            return <EditBankDetails creator={data?.Creator}
             _isLoading={isLoading} _isError={isError} _error={error}  />
        default:
            return <RatingAndReviews 
             creator={data?.Creator}
             ratings={data?.Creator?.rating} isError={isError} error={error}
             isLoading={isLoading}/>
     }
}


export default CurrentInformation