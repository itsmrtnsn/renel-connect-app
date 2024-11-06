import MotionProvider from '@/components/motion-provider';

import { Card, CardContent } from '@/components/ui/card';
import SideBar from '@/components/ui/side-bar';
import { cn } from '@/lib/utils';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: 'Renel Connect',
  description: 'Renel Connect',
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='en' suppressHydrationWarning>
        <body className={cn('antialiased bg-gray-100 ', GeistSans.className)}>
          <section className='flex gap-6 p-6 max-h-screen'>
            <aside>
              <SideBar />
            </aside>
            <main className='flex-1'>
              <Card className='h-[calc(100vh-3rem)] w-full  border-[0.1px] border-slate-300  overflow-hidden shadow-none'>
                <CardContent className='p-0 h-full flex flex-col bg-white'>
                  <MotionProvider>{children}</MotionProvider>
                </CardContent>
                <Toaster position='top-right' richColors />
              </Card>
            </main>
          </section>
        </body>
      </html>
    </ClerkProvider>
  );
}
