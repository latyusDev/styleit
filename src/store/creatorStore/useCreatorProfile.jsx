import {create} from 'zustand';
import { useGlobalStore } from './global/useGlobal';
import { changeDateFormat, sortItems } from '@/lib/utils';


export const useCreatorStore = create((set,get)=>({
   
    setCreatorPayments:(creatorPayments)=>{
        const {searchData} = useGlobalStore.getState();
        set(state=>({
            ...state,creatorPayments:searchData==''?changeDateFormat(creatorPayments,'payments'):creatorPayments
        }))
    }
     
}))