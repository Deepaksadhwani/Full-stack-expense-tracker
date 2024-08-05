import { RootState } from "@/store/appStore";
import { useSelector } from "react-redux";
import {
  ChartContainer,
  type ChartConfig,
  ChartTooltip,
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

interface ExpenseItem {
  id: number;
  amount: number;
  description: string;
  category: string;
  date: string;
}

export function ExpenseBarChart() {
  const expenseData = useSelector((state: RootState) => state.expense.data) as ExpenseItem[];
  console.log(expenseData);

  return (
    <ChartContainer config={chartConfig} className="">
      <BarChart data={expenseData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={true}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 10)}
        />
        <Tooltip content={<ChartTooltipContent nameKey="amount" />} />
        <Bar dataKey="amount" fill={chartConfig.desktop.color} radius={4} />
        <Bar dataKey="category" fill={chartConfig.desktop.color} radius={4} />
       
      </BarChart>
    </ChartContainer>
  );
}
