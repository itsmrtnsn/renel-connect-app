'use client';

import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

interface Props {
  food: number;
  drink: number;
  room: number;
  other: number;
}

const chartConfig = {
  sales: {
    label: 'Sales',
  },
  boisson: {
    label: 'Boisson',
    color: 'hsl(var(--chart-1))',
  },
  nourriture: {
    label: 'Nourriture',
    color: 'hsl(var(--chart-2))',
  },
  chambre: {
    label: 'Chambre',
    color: 'hsl(var(--chart-3))',
  },
  autre: {
    label: 'Autre',
    color: 'hsl(var(--chart-4))',
  },
};

export const CategorySalesBarCharts = ({ food, drink, other, room }: Props) => {
  const chartData = [
    { category: 'boisson', sales: drink, fill: 'var(--color-boisson)' },
    { category: 'nourriture', sales: food, fill: 'var(--color-nourriture)' },
    { category: 'chambre', sales: room, fill: 'var(--color-chambre)' },
    { category: 'autre', sales: other, fill: 'var(--color-autre)' },
  ];

  return (
    <Card className='shadow-none '>
      <CardHeader>
        <CardTitle>Ventes par Catégorie</CardTitle>
        {/* <CardDescription>Janvier - Juin 2024</CardDescription> */}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='category'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar
              dataKey='sales'
              strokeWidth={2}
              radius={8}
              activeIndex={2}
              activeBar={({ ...props }) => {
                return (
                  <Rectangle
                    {...props}
                    fillOpacity={0.8}
                    stroke={props.payload.fill}
                    strokeDasharray={4}
                    strokeDashoffset={4}
                  />
                );
              }}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className='flex-col items-start gap-2 text-sm'>
        <div className='flex gap-2 font-medium leading-none'>
          Tendance à la hausse de 5.2% ce mois-ci{' '}
          <TrendingUp className='h-4 w-4' />
        </div>
        <div className='leading-none text-muted-foreground'>
          Affichage des ventes totales par catégorie pour les 6 derniers mois
        </div>
      </CardFooter> */}
    </Card>
  );
};
