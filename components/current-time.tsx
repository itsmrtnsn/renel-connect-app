'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function CurrentTime() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  return (
    <Button
      variant='outline'
      className='text-lg transition-all duration-300 ease-in-out transform hover:scale-105 min-w-[160px] shadow-none'
    >
      {formattedTime}
    </Button>
  );
}
