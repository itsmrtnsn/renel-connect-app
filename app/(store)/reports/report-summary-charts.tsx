// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Tooltip } from '@/components/ui/tooltip';
// import React from 'react';
// import {
//   Bar,
//   BarChart,
//   Cell,
//   Line,
//   Pie,
//   PieChart,
//   ResponsiveContainer,
//   XAxis,
//   YAxis,
// } from 'recharts';

// const ReportSummaryCharts = () => {
//   return (
//     <Tabs defaultValue='sales' className='space-y-4'>
//       <TabsList>
//         <TabsTrigger value='sales'>Sales Overview</TabsTrigger>
//         <TabsTrigger value='categories'>Sales by Category</TabsTrigger>
//       </TabsList>
//       <TabsContent value='sales' className='space-y-4'>
//         <Card>
//           <CardHeader>
//             <CardTitle>Sales and Transactions</CardTitle>
//             <CardDescription>
//               Daily sales amount and number of transactions
//             </CardDescription>
//           </CardHeader>
//           <CardContent className='pl-2'>
//             <ResponsiveContainer width='100%' height={350}>
//               <BarChart data={salesData}>
//                 <XAxis
//                   dataKey='date'
//                   stroke='#888888'
//                   fontSize={12}
//                   tickLine={false}
//                   axisLine={false}
//                 />
//                 <YAxis
//                   yAxisId='left'
//                   stroke='#888888'
//                   fontSize={12}
//                   tickLine={false}
//                   axisLine={false}
//                   tickFormatter={(value) => `$${value}`}
//                 />
//                 <YAxis
//                   yAxisId='right'
//                   orientation='right'
//                   stroke='#888888'
//                   fontSize={12}
//                   tickLine={false}
//                   axisLine={false}
//                 />
//                 <Tooltip />
//                 <Bar
//                   yAxisId='left'
//                   dataKey='amount'
//                   fill='#8884d8'
//                   radius={[4, 4, 0, 0]}
//                 />
//                 <Line
//                   yAxisId='right'
//                   type='monotone'
//                   dataKey='transactions'
//                   stroke='#82ca9d'
//                 />
//               </BarChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//       </TabsContent>
//       <TabsContent value='categories' className='space-y-4'>
//         <Card>
//           <CardHeader>
//             <CardTitle>Sales by Category</CardTitle>
//             <CardDescription>
//               Distribution of sales across product categories
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width='100%' height={350}>
//               <PieChart>
//                 <Pie
//                   data={categoryData}
//                   cx='50%'
//                   cy='50%'
//                   labelLine={false}
//                   outerRadius={80}
//                   fill='#8884d8'
//                   dataKey='value'
//                   label={({ name, percent }) =>
//                     `${name} ${(percent * 100).toFixed(0)}%`
//                   }
//                 >
//                   {categoryData.map((entry, index) => (
//                     <Cell
//                       key={`cell-${index}`}
//                       fill={COLORS[index % COLORS.length]}
//                     />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//       </TabsContent>
//     </Tabs>
//   );
// };

// export default ReportSummaryCharts;
