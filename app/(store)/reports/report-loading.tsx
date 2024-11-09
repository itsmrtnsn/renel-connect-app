import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function POSSalesReportLoading() {
  return (
    <div className='container mx-auto p-4 space-y-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-4xl font-bold'>
          Rapport de ventes de Renel Connect
        </h1>
        <div className='flex items-center space-x-2'>
          <Skeleton className='h-10 w-[300px]' />
          <Skeleton className='h-10 w-[180px]' />
        </div>
      </div>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                <Skeleton className='h-4 w-[100px]' />
              </CardTitle>
              <Skeleton className='h-4 w-4 rounded-full' />
            </CardHeader>
            <CardContent>
              <Skeleton className='h-7 w-[100px] mb-1' />
              <Skeleton className='h-4 w-[120px]' />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className='h-6 w-[200px]' />
          </CardTitle>
          <Skeleton className='h-4 w-[300px]' />
        </CardHeader>
        <CardContent>
          <Skeleton className='h-[350px] w-full' />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className='h-6 w-[200px]' />
          </CardTitle>
          <Skeleton className='h-4 w-[300px]' />
        </CardHeader>
        <CardContent>
          <div className='space-y-2'>
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className='h-12 w-full' />
            ))}
          </div>
        </CardContent>
      </Card>

      <div className='fixed inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm'>
        <div className='text-center'>
          <Loader2 className='h-16 w-16 animate-spin text-primary mx-auto' />
          <p className='mt-4 text-lg font-semibold'>
            Chargement du rapport des ventes...
          </p>
          <p className='text-sm text-muted-foreground'>
            Cela peut prendre quelques instants{' '}
          </p>
        </div>
      </div>
    </div>
  );
}
