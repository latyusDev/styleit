import React, { useState } from 'react'

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  // ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import RevenueTabs from './RevenueTabs'
import  ChartPieLabelList  from './RevenuePieChart'
import RevenuePieChart from './RevenuePieChart'
import RevenueBarChart from './RevenueBarChart'


const monthlyData = [
  { month: "January", users: 1860 },
  { month: "February", users: 3058 },
  { month: "March", users: 2375 },
  { month: "April", users: 7673 },
  { month: "May", users: 2009 },
  { month: "June", users: 6214 },
  { month: "July", users: 1886 },
  { month: "August", users: 3005 },
  { month: "September", users: 5237 },
  { month: "October", users: 7366 },
  { month: "November", users: 2109 },
  { month: "December", users: 2194 },
]
const weeklyData = [
  { month: "week 1", users: 1860 },
  { month: "week 2", users: 3058 },
  { month: "week 3", users: 2375 },
  { month: "week 4", users: 7673 },
 
]

const chartConfig = {
  users: {
    label: "Users",
    // color: "#faf7f799",
    color: "#FF617C",
  },
}  



const Revenue = () => {
    const [currentIndex,setCurrentIndex] = useState(0)

  return (
    <div>
        <RevenueTabs 
        currentIndex={currentIndex}
         setCurrentIndex={setCurrentIndex} />
        <div className='mt-7 pb-5 text-lightGray  to-b[35%]'>
        {
            currentIndex === 0 ? <RevenuePieChart/>:<RevenueBarChart/>
        }

    </div>
    </div>
  )
}

export default Revenue
