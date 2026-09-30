import { TrendingUp } from "lucide-react"
import { LabelList, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A pie chart with a label list"

const chartData = [
  { browser: "chrome", revenue: 275, fill: "var(--color-chrome)" },
  { browser: "safari", revenue: 200, fill: "var(--color-safari)" },
  { browser: "firefox", revenue: 187, fill: "var(--color-firefox)" },
  { browser: "edge", revenue: 173, fill: "var(--color-edge)" },
]

// const chartData = [
//   { week: "week 1", revenues: 275, fill: "var(--color-chrome)" },
//   { week: "week 2", revenues: 200, fill: "var(--color-safari)" },
//   { week: "week 3", revenues: 187, fill: "var(--color-firefox)" },
//   { week: "week 4", revenues: 173, fill: "var(--color-edge)" },
// ]

const chartConfig = {
  revenue: {
    label: "Revenues",
  },
  chrome: {
    label: "Week 1",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Week 2",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Week 3",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Week 4",
    color: "var(--chart-4)",
  },
 
} 

const RevenuePieChart =()=>{
  return (
    <div>
      <h1  style={{ fontSize:'1.5rem',paddingBlock:'1rem',textAlign:'center', backgroundImage:'linear-gradient(#27213c,#fd57aa,black)',color:'transparent',backgroundClip:'text'}}>Weekly Revenue</h1>
        <Card className='font-lato flex flex-col shadow-lg  p-8 pb-2 border-none bg-gradient-to-tr from-primary to-sidebar to-[35%] '>
    
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[400px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="revenue"  />}
            />
            <Pie data={chartData} dataKey="revenue">
              <LabelList
                dataKey="browser"
                className="fill-lightGray"
                stroke="none"
                fontSize={16}
                formatter={(value) =>
                  chartConfig[value]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
     
    </Card>
    </div>
  )
}
export default RevenuePieChart
 