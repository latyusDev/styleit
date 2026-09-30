import React from 'react'

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


const chartData = [
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

const chartConfig = {
  users: {
    label: "Users",
    // color: "#faf7f799",
    color: "#FF617C",
  },
}  



const UserRetentionRate = () => {
  return (
    <div className='mt-7 pb-5 text-lightGray  to-b[35%]'>
  <Card className='shadow-lg  p-8 pb-2 border-none bg-gradient-to-tr from-primary to-sidebar to-[35%] '>
     
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            {/* <CartesianGrid vertical={false} /> */}
            <XAxis
              dataKey="month"
              tick={{fill:'#E9EBF8',fontSize:16}}
             
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              className='text-lightGray'
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="users" fill="var(--color-users)" radius={8}>
                <LabelList
                position="top"
                offset={12}
                className="fill-lightGray"
                fontSize={16}
                border={5}
              />
              </Bar>

          </BarChart>
        </ChartContainer>
      </CardContent>
    
    </Card>
    </div>
  )
}

export default UserRetentionRate
