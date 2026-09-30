import React, {  useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, CreditCard, FileText } from 'lucide-react';
import PostListLoader from '@/components/global/loaders/PostListLoader';
import { useQuery } from '@tanstack/react-query';
import Paginator from '@/components/global/Paginator';
import ErrorMessage from '@/components/global/ErrorMessage';
import { safeDate } from '@/static/data';

const PAGES_TO_SHOW = 3
const SubscriptionHistory = () => {
    const [page,setPage] = useState(1)

const getSubscriptionHistories = async(page) => {
    try {
        const response = await axios.get(`designer/subplan?page=${page}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`,
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        })
        return response?.data  
    } catch(error) {
        return error 
    }
}
  
    const { data, isLoading,isError,error} = useQuery({
        queryKey: ['subscription-histories', page||1],
        queryFn:() => getSubscriptionHistories(page)
    })

    const formatDate = (dateString) => {
        return new Date(safeDate(dateString)).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (status) => {
        return status === 'active' 
            ? 'bg-green-500 text-white hover:bg-green-600' 
            : 'bg-red-400 text-white hover:bg-red-500';
    };
return (
    <div className="">
        <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Subscription History</h1>
        </div>
        
        {isLoading ? <PostListLoader /> : 
            <>
                {
                    isError ? <ErrorMessage error={error}/> :
                    data && data.subscriptions ? (  
                        <div>
                            {data.subscriptions.length === 0 ? (
                                <Card>
                                    <CardContent className="flex flex-col items-center justify-center py-12">
                                        <CreditCard className="w-12 h-12 text-slate-300 mb-4" />
                                        <p className="text-slate-500">No subscriptions found</p>
                                    </CardContent>
                                </Card>
                            ) : (
                                <div className="flex flex-col md:flex-row flex-wrap gap-4">
                                    {data.subscriptions.map((sub) => (
                                        <Card key={sub.id} className="md:basis-[40%] lg:basis-[30%] border-gray-200 hover:shadow-lg transition-shadow">
                                            <CardHeader>
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <CardTitle className="flex items-center gap-2">
                                                            <CreditCard className="w-5 h-5 text-slate-600" />
                                                            Plan ₦{sub.plan}
                                                        </CardTitle>
                                                    </div>
                                                    <Badge className={getStatusColor(sub.status)}>
                                                        {sub.status}
                                                    </Badge>
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="flex items-start gap-3">
                                                        <Calendar className="w-4 h-4 text-slate-500 mt-1" />
                                                        <div>
                                                            <p className="text-sm font-medium text-slate-700">Start Date</p>
                                                            <p className="text-sm text-slate-600">{formatDate(sub.startDate)}</p>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="flex items-start gap-3">
                                                        <Calendar className="w-4 h-4 text-slate-500 mt-1" />
                                                        <div>
                                                            <p className="text-sm font-medium text-slate-700">End Date</p>
                                                            <p className="text-sm text-slate-600">{formatDate(sub.endDate)}</p>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="flex items-start gap-3">
                                                        <FileText className="w-4 h-4 text-slate-500 mt-1" />
                                                        <div>
                                                            <p className="text-sm font-medium text-slate-700">Reference</p>
                                                            <p className="text-sm text-slate-600 font-mono">{sub.refrence}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : null  // Handle case where data is undefined
                }
            </>
        }

        {/* Pagination */}
        {
            !isError && data && ( 
                <Paginator
                    data={data}
                    page={page} 
                    setPage={setPage} 
                    PAGES_TO_SHOW={PAGES_TO_SHOW} 
                />
            )
        }
    </div>
)

}

export default SubscriptionHistory;
