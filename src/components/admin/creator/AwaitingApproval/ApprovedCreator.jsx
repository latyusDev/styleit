import { useAdminStore } from '@/store/admin/useAdmin';
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import m_logo from '@/images/m_logo.png'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Image from '@/components/global/Image';
import { toast } from 'sonner';
import { Loader2, X } from 'lucide-react';
import { safeDate } from '@/static/data';

const ApprovedCreator = () => {
  const navigate = useNavigate()
  const { approveCreator,sendFund } = useAdminStore()
  const [uiState,setUiState] = useState({isFinalized:false,isLoading:false,transferCode:null})
  const { refNumber } = useParams()

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['awaiting-approval', refNumber],
    queryFn: () => approveCreator(refNumber),
    refetchOnWindowFocus:false,
    staleTime: 1000*60*10,
  })

const handleSendFund = async()=>{
  setUiState({...uiState,isLoading:true})
  try{
    const result = await sendFund(data?.transaction?.trans_ref);
    localStorage.setItem('transferCode',result?.transfer_code)
    if(result?.status === 200){

      toast('Fund sent successfully', {
               action: {
               label: <X size={16} />,
             },
         })
    }
        setUiState({...uiState,isFinalized:true})
  }catch(error){
     toast(error?.response?.data?.message||'something went wrong, try again', {
            action: {
            label: <X size={16} />,
          },
      })
  }finally{
  setUiState({...uiState,isLoading:false,isFinalized:true})

  }
}

  const formatDate = (iso) => {
    if (!iso) return '—'
    return new Date(safeDate(iso)).toLocaleString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    })
  }

  const recipientRows = [
    { label: 'Account name',   value: data?.recipient?.account_name },
    { label: 'Account number', value: data?.recipient?.account_number, mono: true },
    { label: 'Bank',           value: data?.recipient?.bank_name },
    { label: 'Recipient code', value: data?.transfer_data?.recipient_code, mono: true },
  ]

  const transactionRows = [
    { label: 'Transaction ID', value: data?.transaction?.trans_id, mono: true },
    { label: 'Reference',      value: data?.transaction?.trans_ref, mono: true },
    { label: 'Integration',    value: data?.transfer_data?.integration, mono: true },
    { label: 'Currency',       value: data?.transfer_data?.currency },
    { label: 'Type',           value: data?.transfer_data?.type },
    { label: 'Date',           value: formatDate(data?.transfer_data?.createdAt) },
    { label: 'Email',          value: data?.transfer_data?.email, highlight: true },
  ]

  const amount = data?.transaction?.amount/1.12

  if (isLoading) return (
    <div className="min-h-screen flex flex-col items-center py-10 px-4 gap-4" style={{ background: '#27213c' }}>
      <Skeleton className="w-16 h-16 rounded-full" />
      <Skeleton className="w-40 h-5 rounded-lg" />
      <Skeleton className="w-56 h-4 rounded-lg" />
      <Skeleton className="w-32 h-10 rounded-lg mt-2" />
      <Skeleton className="w-full max-w-sm h-40 rounded-xl mt-4" />
      <Skeleton className="w-full max-w-sm h-52 rounded-xl" />
    </div>
  )

  if (isError) return (
    <div className='text-center shadow-md border rounded-md py-16 mt-16 px-5'>
        <Image src={m_logo} className='mx-auto size-8'/>
        <p className='text-lg font-semibold mt-4'>{error?.response?.data?.error}</p>
        <p>message: {error?.response?.data?.details?.message}</p>
    
  </div>
  )

  return (
    <div className="min-h-screen flex flex-col items-center py-10 rounded-md px-4" style={{ background: '#27213c' }}>

      {/* Success icon */}
      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
        style={{ background: '#FF617C' }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
          stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <h2 className="text-xl font-medium text-white text-center mb-1">
        Transfer initialized successfully
      </h2>
      <p className="text-sm text-center mb-4" style={{ color: 'rgba(255,255,255,0.45)' }}>
        {data?.transfer_data?.description ?? 'Payment completed'}
      </p>

      {/* Status badge */}
      <Badge
        className="mb-5 rounded-full px-4 py-1 text-sm border font-normal"
        style={{
          background: 'rgba(255,97,124,0.15)',
          borderColor: 'rgba(255,97,124,0.4)',
          color: '#FF617C'
        }}
      >
        <span className="w-2 h-2 rounded-full mr-2 inline-block" style={{ background: '#FF617C' }} />
        Completed
      </Badge>

      {/* Amount */}
      <p className="text-4xl font-medium text-white mb-1">
        ₦{Number(amount).toLocaleString()}
      </p>
      <p className="text-xs mb-6" style={{ color: 'rgba(255,255,255,0.4)' }}>
        Amount to transfer
      </p>

      {/* Recipient card */}
      <SectionLabel>Account details</SectionLabel>
      <InfoCard rows={recipientRows} />

      <Separator className="w-full max-w-sm my-5" style={{ background: 'rgba(255,255,255,0.08)' }} />

      {/* Transaction card */}
      <SectionLabel>Transaction details</SectionLabel>
      <InfoCard rows={transactionRows} />

      {/* Actions */}
      <div className="flex flex-col gap-3 w-full max-w-sm mt-6">
       
        <Button
          onClick={handleSendFund}
          className="flex-1 rounded-lg text-sm w-full font-medium text-white border-0"
          style={{ background: '#FF617C' }}
        >

          {
            uiState.isLoading ? <span className='flex gap-2'>
                <Loader2 className="h-4 w-4 animate-spin" />
                    Initializing
            </span>:
            'Initialize Transfer'
          }
        </Button>

      

        {
            uiState.isFinalized &&
            <div>
              <p className="text-xs my-4 text-center font-mono text-white">
       click the link below to finalize transfer
      </p>
          <Link to={`finalize`} className='block w-full'>
              <Button
           
                className="flex-1 rounded-lg text-sm w-full font-medium text-white border-0"
                style={{ background: '#FF617C' }}
              >
                Finalize Transfer
            </Button>
          </Link>
            </div>
          }
        
      </div>

    </div>
  )
}

const SectionLabel = ({ children }) => (
  <p className="w-full text-white max-w-sm text-xs font-medium mb-3 tracking-widest uppercase"
    style={{ color: 'rgba(255,255,255,0.35)' }}>
    {children}
  </p>
)

const InfoCard = ({ rows }) => (
  <Card className=" text-white w-full max-w-sm rounded-xl border-gray-100 shadow-none">
    <CardContent className="p-0">
      {rows.map(({ label, value, mono, highlight }, i) => (
        <div
          key={label}
          className={`flex justify-between items-start px-4 py-3 gap-3 ${
            i !== rows.length - 1 ? 'border-b border-gray-100' : ''
          }`}
        >
          <span className="text-xs text-muted-foreground shrink-0">{label}</span>
          <span
            className={`text-xs text-right break-all ${mono ? 'font-mono' : ''}`}
            style={{ color: highlight ? '#FF617C' : undefined }}
          >
            {value ?? '—'}
          </span>
        </div>
      ))}
    </CardContent>
  </Card>
)

export default ApprovedCreator