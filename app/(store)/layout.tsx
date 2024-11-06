import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';

const LayoutPage = async ({ children }: PropsWithChildren) => {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in');
  }
  return <div>{children}</div>;
};

export default LayoutPage;
