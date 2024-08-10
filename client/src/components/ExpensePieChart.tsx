import React, { FC } from "react";
import { Label, Pie, PieChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import axios from "axios";
import { SERVER_URL } from "@/utils/constants";

const chartConfig: ChartConfig = {
  food: {
    label: "Food",
    color: "hsl(var(--chart-1))",
  },
  entertainment: {
    label: "Entertainment",
    color: "hsl(var(--chart-2))",
  },
  transportation: {
    label: "Transportation",
    color: "hsl(var(--chart-3))",
  },
  electronic: {
    label: "Electronic item",
    color: "hsl(var(--chart-4))",
  },
  education: {
    label: "Education",
    color: "hsl(var(--chart-5))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-default))",
  },
};

interface DataType {
  id: number;
  amount: number;
  description: string;
  category: string;
  date: string;
}

interface ExpenseChartProps {
  expenseData: DataType[];
}

export const ExpensePieChart: FC<ExpenseChartProps> = ({ expenseData }) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      "user-auth-token": `Bearer ${token}`,
    },
  };
  const categoryData = React.useMemo(() => {
    const result: { [key: string]: number } = {};
    expenseData.forEach((item) => {
      const normalizedCategory = item.category.toLowerCase();
      // Adjust category format

      const categoryKey = Object.keys(chartConfig).includes(normalizedCategory)
        ? normalizedCategory
        : "other";

      if (result[categoryKey]) {
        result[categoryKey] += item.amount;
      } else {
        result[categoryKey] = item.amount;
      }
    });

    return Object.keys(result).map((category) => ({
      category,
      amount: result[category],
      fill: chartConfig[category]?.color || chartConfig.other.color, // Fallback color
    }));
  }, [expenseData]);

  const totalAmount = React.useMemo(() => {
    const total = expenseData.reduce((acc, curr) => acc + curr.amount, 0);
    axios.post(
      `${SERVER_URL}/user/add-totalexpense`,
      { totalExpense: total },
      config,
    );
    return total;
  }, [expenseData]);

  return (
    <Card className="flex flex-col bg-white">
      <CardHeader className="items-center pb-0">
        <CardTitle>Total Expense Chart</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={categoryData}
              dataKey="amount"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalAmount.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Sum of Expenses
                        </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
