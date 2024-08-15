import {
  ChartContainer,
  type ChartConfig,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip } from "recharts";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;



export function ExpenseBarChart({ expenseData }: { expenseData: any }) {

  return (
    <ChartContainer config={chartConfig} className="md:w-[40vw] w-[90vw] mx-auto md:mx-0 shadow-md">
      <BarChart data={expenseData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={true}
          tickMargin={10}
          axisLine={true}
          tickFormatter={(value) => value.slice(0, 10)}
        />
        <Tooltip content={<ChartTooltipContent nameKey="amount" />} />
        <Bar dataKey="amount" fill={chartConfig.desktop.color} radius={4} />
        <Bar dataKey="category" fill={chartConfig.desktop.color} radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
