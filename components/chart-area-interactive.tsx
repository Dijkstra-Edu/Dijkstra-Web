"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export const description = "An interactive area chart"

const chartData = [
  { date: "2024-04-01", Github: 222, Leetcode: 150, LinkedIn: 7, Projects: 102, Learning: 15, Resume: 3 },
  { date: "2024-04-02", Github: 97, Leetcode: 180, LinkedIn: 5, Projects: 87, Learning: 22, Resume: 2 },
  { date: "2024-04-03", Github: 167, Leetcode: 120, LinkedIn: 8, Projects: 45, Learning: 18, Resume: 4 },
  { date: "2024-04-04", Github: 242, Leetcode: 260, LinkedIn: 6, Projects: 132, Learning: 25, Resume: 1 },
  { date: "2024-04-05", Github: 373, Leetcode: 290, LinkedIn: 9, Projects: 148, Learning: 12, Resume: 5 },
  { date: "2024-04-06", Github: 301, Leetcode: 340, LinkedIn: 4, Projects: 92, Learning: 28, Resume: 3 },
  { date: "2024-04-07", Github: 245, Leetcode: 180, LinkedIn: 7, Projects: 67, Learning: 14, Resume: 2 },
  { date: "2024-04-08", Github: 409, Leetcode: 320, LinkedIn: 10, Projects: 143, Learning: 19, Resume: 6 },
  { date: "2024-04-09", Github: 59, Leetcode: 110, LinkedIn: 3, Projects: 38, Learning: 8, Resume: 1 },
  { date: "2024-04-10", Github: 261, Leetcode: 190, LinkedIn: 6, Projects: 121, Learning: 17, Resume: 4 },
  { date: "2024-04-11", Github: 327, Leetcode: 350, LinkedIn: 8, Projects: 149, Learning: 23, Resume: 2 },
  { date: "2024-04-12", Github: 292, Leetcode: 210, LinkedIn: 5, Projects: 88, Learning: 11, Resume: 3 },
  { date: "2024-04-13", Github: 342, Leetcode: 380, LinkedIn: 7, Projects: 137, Learning: 27, Resume: 5 },
  { date: "2024-04-14", Github: 137, Leetcode: 220, LinkedIn: 4, Projects: 52, Learning: 9, Resume: 2 },
  { date: "2024-04-15", Github: 120, Leetcode: 170, LinkedIn: 6, Projects: 43, Learning: 13, Resume: 1 },
  { date: "2024-04-16", Github: 138, Leetcode: 190, LinkedIn: 9, Projects: 76, Learning: 21, Resume: 4 },
  { date: "2024-04-17", Github: 446, Leetcode: 360, LinkedIn: 7, Projects: 142, Learning: 29, Resume: 3 },
  { date: "2024-04-18", Github: 364, Leetcode: 410, LinkedIn: 5, Projects: 128, Learning: 16, Resume: 2 },
  { date: "2024-04-19", Github: 243, Leetcode: 180, LinkedIn: 8, Projects: 94, Learning: 24, Resume: 6 },
  { date: "2024-04-20", Github: 89, Leetcode: 150, LinkedIn: 3, Projects: 37, Learning: 7, Resume: 1 },
  { date: "2024-04-21", Github: 137, Leetcode: 200, LinkedIn: 6, Projects: 83, Learning: 20, Resume: 3 },
  { date: "2024-04-22", Github: 224, Leetcode: 170, LinkedIn: 9, Projects: 116, Learning: 14, Resume: 5 },
  { date: "2024-04-23", Github: 138, Leetcode: 230, LinkedIn: 4, Projects: 49, Learning: 10, Resume: 2 },
  { date: "2024-04-24", Github: 387, Leetcode: 290, LinkedIn: 7, Projects: 139, Learning: 26, Resume: 4 },
  { date: "2024-04-25", Github: 215, Leetcode: 250, LinkedIn: 10, Projects: 107, Learning: 18, Resume: 1 },
  { date: "2024-04-26", Github: 75, Leetcode: 130, LinkedIn: 2, Projects: 29, Learning: 5, Resume: 3 },
  { date: "2024-04-27", Github: 383, Leetcode: 420, LinkedIn: 8, Projects: 146, Learning: 30, Resume: 6 },
  { date: "2024-04-28", Github: 122, Leetcode: 180, LinkedIn: 5, Projects: 63, Learning: 12, Resume: 2 },
  { date: "2024-04-29", Github: 315, Leetcode: 240, LinkedIn: 7, Projects: 118, Learning: 22, Resume: 4 },
  { date: "2024-04-30", Github: 454, Leetcode: 380, LinkedIn: 9, Projects: 147, Learning: 17, Resume: 3 },
  { date: "2024-05-01", Github: 165, Leetcode: 220, LinkedIn: 4, Projects: 71, Learning: 11, Resume: 1 },
  { date: "2024-05-02", Github: 293, Leetcode: 310, LinkedIn: 6, Projects: 124, Learning: 25, Resume: 5 },
  { date: "2024-05-03", Github: 247, Leetcode: 190, LinkedIn: 8, Projects: 97, Learning: 19, Resume: 2 },
  { date: "2024-05-04", Github: 385, Leetcode: 420, LinkedIn: 7, Projects: 141, Learning: 28, Resume: 4 },
  { date: "2024-05-05", Github: 481, Leetcode: 390, LinkedIn: 10, Projects: 149, Learning: 15, Resume: 3 },
  { date: "2024-05-06", Github: 498, Leetcode: 520, LinkedIn: 6, Projects: 135, Learning: 23, Resume: 1 },
  { date: "2024-05-07", Github: 388, Leetcode: 300, LinkedIn: 9, Projects: 112, Learning: 16, Resume: 5 },
  { date: "2024-05-08", Github: 149, Leetcode: 210, LinkedIn: 3, Projects: 58, Learning: 8, Resume: 2 },
  { date: "2024-05-09", Github: 227, Leetcode: 180, LinkedIn: 7, Projects: 103, Learning: 21, Resume: 4 },
  { date: "2024-05-10", Github: 293, Leetcode: 330, LinkedIn: 5, Projects: 126, Learning: 14, Resume: 3 },
  { date: "2024-05-11", Github: 335, Leetcode: 270, LinkedIn: 8, Projects: 91, Learning: 27, Resume: 6 },
  { date: "2024-05-12", Github: 197, Leetcode: 240, LinkedIn: 4, Projects: 64, Learning: 10, Resume: 2 },
  { date: "2024-05-13", Github: 197, Leetcode: 160, LinkedIn: 6, Projects: 42, Learning: 13, Resume: 1 },
  { date: "2024-05-14", Github: 448, Leetcode: 490, LinkedIn: 9, Projects: 148, Learning: 29, Resume: 5 },
  { date: "2024-05-15", Github: 473, Leetcode: 380, LinkedIn: 7, Projects: 133, Learning: 18, Resume: 3 },
  { date: "2024-05-16", Github: 338, Leetcode: 400, LinkedIn: 10, Projects: 122, Learning: 24, Resume: 4 },
  { date: "2024-05-17", Github: 499, Leetcode: 420, LinkedIn: 5, Projects: 145, Learning: 16, Resume: 2 },
  { date: "2024-05-18", Github: 315, Leetcode: 350, LinkedIn: 8, Projects: 108, Learning: 20, Resume: 6 },
  { date: "2024-05-19", Github: 235, Leetcode: 180, LinkedIn: 3, Projects: 76, Learning: 9, Resume: 1 },
  { date: "2024-05-20", Github: 177, Leetcode: 230, LinkedIn: 7, Projects: 95, Learning: 22, Resume: 4 },
  { date: "2024-05-21", Github: 82, Leetcode: 140, LinkedIn: 2, Projects: 31, Learning: 6, Resume: 3 },
  { date: "2024-05-22", Github: 81, Leetcode: 120, LinkedIn: 5, Projects: 47, Learning: 11, Resume: 2 },
  { date: "2024-05-23", Github: 252, Leetcode: 290, LinkedIn: 9, Projects: 119, Learning: 25, Resume: 5 },
  { date: "2024-05-24", Github: 294, Leetcode: 220, LinkedIn: 6, Projects: 104, Learning: 17, Resume: 1 },
  { date: "2024-05-25", Github: 201, Leetcode: 250, LinkedIn: 8, Projects: 93, Learning: 19, Resume: 3 },
  { date: "2024-05-26", Github: 213, Leetcode: 170, LinkedIn: 4, Projects: 56, Learning: 12, Resume: 2 },
  { date: "2024-05-27", Github: 420, Leetcode: 460, LinkedIn: 10, Projects: 144, Learning: 30, Resume: 6 },
  { date: "2024-05-28", Github: 233, Leetcode: 190, LinkedIn: 7, Projects: 101, Learning: 21, Resume: 4 },
  { date: "2024-05-29", Github: 78, Leetcode: 130, LinkedIn: 3, Projects: 39, Learning: 7, Resume: 1 },
  { date: "2024-05-30", Github: 340, Leetcode: 280, LinkedIn: 9, Projects: 127, Learning: 26, Resume: 5 },
  { date: "2024-05-31", Github: 178, Leetcode: 230, LinkedIn: 5, Projects: 82, Learning: 14, Resume: 3 },
  { date: "2024-06-01", Github: 178, Leetcode: 200, LinkedIn: 8, Projects: 109, Learning: 23, Resume: 2 },
  { date: "2024-06-02", Github: 470, Leetcode: 410, LinkedIn: 6, Projects: 136, Learning: 18, Resume: 4 },
  { date: "2024-06-03", Github: 103, Leetcode: 160, LinkedIn: 4, Projects: 44, Learning: 9, Resume: 1 },
  { date: "2024-06-04", Github: 439, Leetcode: 380, LinkedIn: 7, Projects: 131, Learning: 27, Resume: 5 },
  { date: "2024-06-05", Github: 88, Leetcode: 140, LinkedIn: 2, Projects: 33, Learning: 5, Resume: 3 },
  { date: "2024-06-06", Github: 294, Leetcode: 250, LinkedIn: 9, Projects: 117, Learning: 20, Resume: 2 },
  { date: "2024-06-07", Github: 323, Leetcode: 370, LinkedIn: 5, Projects: 125, Learning: 15, Resume: 4 },
  { date: "2024-06-08", Github: 385, Leetcode: 320, LinkedIn: 10, Projects: 142, Learning: 28, Resume: 6 },
  { date: "2024-06-09", Github: 438, Leetcode: 480, LinkedIn: 7, Projects: 147, Learning: 19, Resume: 3 },
  { date: "2024-06-10", Github: 155, Leetcode: 200, LinkedIn: 4, Projects: 68, Learning: 11, Resume: 1 },
  { date: "2024-06-11", Github: 92, Leetcode: 150, LinkedIn: 6, Projects: 51, Learning: 16, Resume: 5 },
  { date: "2024-06-12", Github: 492, Leetcode: 420, LinkedIn: 8, Projects: 149, Learning: 29, Resume: 2 },
  { date: "2024-06-13", Github: 81, Leetcode: 130, LinkedIn: 3, Projects: 36, Learning: 8, Resume: 4 },
  { date: "2024-06-14", Github: 426, Leetcode: 380, LinkedIn: 9, Projects: 138, Learning: 24, Resume: 3 },
  { date: "2024-06-15", Github: 307, Leetcode: 350, LinkedIn: 5, Projects: 113, Learning: 17, Resume: 1 },
  { date: "2024-06-16", Github: 371, Leetcode: 310, LinkedIn: 7, Projects: 106, Learning: 22, Resume: 5 },
  { date: "2024-06-17", Github: 475, Leetcode: 520, LinkedIn: 10, Projects: 150, Learning: 30, Resume: 6 },
  { date: "2024-06-18", Github: 107, Leetcode: 170, LinkedIn: 4, Projects: 53, Learning: 10, Resume: 2 },
  { date: "2024-06-19", Github: 341, Leetcode: 290, LinkedIn: 8, Projects: 121, Learning: 25, Resume: 4 },
  { date: "2024-06-20", Github: 408, Leetcode: 450, LinkedIn: 6, Projects: 134, Learning: 16, Resume: 3 },
  { date: "2024-06-21", Github: 169, Leetcode: 210, LinkedIn: 9, Projects: 98, Learning: 21, Resume: 1 },
  { date: "2024-06-22", Github: 317, Leetcode: 270, LinkedIn: 5, Projects: 111, Learning: 13, Resume: 5 },
  { date: "2024-06-23", Github: 480, Leetcode: 530, LinkedIn: 7, Projects: 146, Learning: 27, Resume: 2 },
  { date: "2024-06-24", Github: 132, Leetcode: 180, LinkedIn: 3, Projects: 62, Learning: 9, Resume: 4 },
  { date: "2024-06-25", Github: 141, Leetcode: 190, LinkedIn: 6, Projects: 84, Learning: 20, Resume: 3 },
  { date: "2024-06-26", Github: 434, Leetcode: 380, LinkedIn: 8, Projects: 129, Learning: 23, Resume: 1 },
  { date: "2024-06-27", Github: 448, Leetcode: 490, LinkedIn: 10, Projects: 148, Learning: 28, Resume: 6 },
  { date: "2024-06-28", Github: 149, Leetcode: 200, LinkedIn: 5, Projects: 77, Learning: 12, Resume: 2 },
  { date: "2024-06-29", Github: 103, Leetcode: 160, LinkedIn: 7, Projects: 54, Learning: 18, Resume: 4 },
  { date: "2024-06-30", Github: 446, Leetcode: 400, LinkedIn: 9, Projects: 139, Learning: 26, Resume: 3 }
];
const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  Github: {
    label: "Github",
    color: "var(--primary)",
  },
  Leetcode: {
    label: "Leetcode",
    color: "var(--primary)",
  },
  LinkedIn: {
    label: "LinkedIn",
    color: "var(--secondary)",
  },
  Projects: {
    label: "Projects",
    color: "var(--accent)",
  },
  Learning: {
    label: "Learning",
    color: "var(--muted)",
  },
  Resume: {
    label: "Resume",
    color: "var(--destructive)",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>All Activity</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total for the last 3 months
          </span>
          <span className="@[540px]/card:hidden">Last 3 months</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillGithub" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-github)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-github)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillLeetcode" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-leetcode)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-leetcode)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillLinkedIn" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-linkedin)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-linkedin)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillProjects" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-projects)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-projects)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              defaultIndex={isMobile ? -1 : 10}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="Leetcode"
              type="natural"
              fill="url(#fillLeetcode)"
              stroke="var(--color-leetcode)"
              stackId="a"
            />
            <Area
              dataKey="Github"
              type="natural"
              fill="url(#fillGithub)"
              stroke="var(--color-github)"
              stackId="a"
            />
            <Area
              dataKey="LinkedIn"
              type="natural"
              fill="url(#fillLinkedIn)"
              stroke="var(--color-linkedin)"
              stackId="a"
            />
            <Area
              dataKey="Projects"
              type="natural"
              fill="url(#fillProjects)"
              stroke="var(--color-projects)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}