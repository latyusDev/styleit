import { safeDate } from "@/static/data";
import { clsx } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge"

function cn(...inputs) {
  return twMerge(clsx(inputs));
}



const changeDateFormat = (data,id)=>data.map((dataItem)=>{
    if(id ==='subscriptions'){
         return {...dataItem,from:format(safeDate(dataItem.from),'MMMM do, yyyy'),to:format(safeDate(dataItem.to),'MMMM do, yyyy'),
            lastSubscriptions:dataItem.lastSubscriptions.map(subItem=>{
             return {...subItem,from:format(safeDate(dataItem.from),'MMMM do, yyyy'),to:format(safeDate(dataItem.to),'MMMM do, yyyy')}
         })}
    }else if(id ==='payments'){
        return {...dataItem,date:format(safeDate(dataItem.date),'MMMM do, yyyy'),lastPayments:dataItem.lastPayments.map(payItem=>{
            return {...payItem,date:format(safeDate(dataItem.date),'MMMM do, yyyy')}
        })}
    }
    else if(id === 'bookings'){
     return {...dataItem,bookingDate:format(safeDate(dataItem.bookingDate),'MMMM do, yyyy'),
            collectionDate:format(safeDate(dataItem.collectionDate),'MMMM do, yyyy')
     }
    }else{
      return dataItem;
    }
 })

const sortItems = (items,sortData)=>{
    return items?.sort((a,b)=>{
        if(sortData == 'oldest'){
            return a.id - b.id;
        }else if(sortData == 'latest'){
            return b.id - a.id
        }
        return sortData;
    })
 }

 const sortByDate = (items)=>  items?.sort((a,b)=> safeDate(a.date).getTime() - safeDate(b.date).getTime())

 export{sortItems,cn,changeDateFormat,sortByDate}