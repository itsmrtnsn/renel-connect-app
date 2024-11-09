'use client';

import * as React from 'react';
import { Label, Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartConfig: ChartConfig = {
  sales: {
    label: 'Sales',
  },
  room: {
    label: 'Room',
    color: 'hsl(var(--chart-3))',
  },
  drink: {
    label: 'Drink',
    color: 'hsl(var(--chart-1))',
  },
  food: {
    label: 'Food',
    color: 'hsl(var(--chart-2))',
  },
  other: {
    label: 'Other',
    color: 'hsl(var(--chart-4))',
  },
};

interface Props {
  food: number;
  drink: number;
  room: number;
  other: number;
}

export default function SalesCategoryDistribution({
  food,
  drink,
  room,
  other,
}: Props) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const chartData = [
    { category: 'Chambre ', sales: room, fill: chartConfig.room.color },
    { category: 'Boissons ', sales: drink, fill: chartConfig.drink.color },
    { category: 'Nouriture ', sales: food, fill: chartConfig.food.color },
    { category: 'Autre ', sales: other, fill: chartConfig.other.color },
  ];

  const totalSales = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.sales, 0);
  }, [chartData]);

  return (
    <Card className='flex flex-col w-full  border-2 shadow-none '>
      <CardHeader className='items-center pb-0'>
        <CardTitle>Répartition des ventes par catégorie</CardTitle>
      </CardHeader>
      <CardContent className='flex-1 pb-0'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square max-h-[250px]'
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey='sales'
              nameKey='category'
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor='middle'
                        dominantBaseline='middle'
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className='fill-foreground text-xl font-bold'
                        >
                          {totalSales.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className='fill-muted-foreground'
                        >
                          Ventes totales
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col gap-2 text-sm'>
        <div className='leading-none text-muted-foreground'>
          Affichage des ventes totales par catégorie
        </div>
      </CardFooter>
    </Card>
  );
}
