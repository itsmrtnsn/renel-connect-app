'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

import sideBarLinks from '@/lib/side-bar-links';
import Link from 'next/link';
import { CgMenuGridR } from 'react-icons/cg';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';

const SideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState<string | null>('Dashboard');

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMenu = (menuName: string) => {
    setActiveMenu(menuName);
  };

  return (
    <Card className='h-[calc(100vh-3rem)] overflow-hidden border-2  shadow-none border-slate-300  bg-white '>
      <CardContent className='p-0 h-full'>
        <motion.div
          initial={false}
          animate={{ width: isSidebarOpen ? '17rem' : '5rem' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className='h-full flex-shrink-0 overflow-hidden'
        >
          <div className='p-4 h-full flex flex-col'>
            <div className='flex items-center justify-between mb-6'>
              <AnimatePresence>
                {isSidebarOpen && (
                  <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className='text-xl font-bold '
                  >
                    Renel Connect
                  </motion.h2>
                )}
              </AnimatePresence>
              <Button
                variant='ghost'
                size='icon'
                className={cn('h-6 w-6 text-primary ml-3')}
                onClick={toggleSidebar}
              >
                <CgMenuGridR className='h-6 w-6' />
              </Button>
            </div>
            <ScrollArea className='flex-grow -mr-4 pr-4'>
              <nav className='space-y-2'>
                {sideBarLinks.map((item, index) => (
                  <div key={index}>
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size='lg'
                            disabled={item.disabled}
                            variant='outline'
                            className={cn(
                              'w-full justify-between outline-none  transition-all duration-300 ease-in-out shadow-none border-2 border-blue-300',
                              isSidebarOpen ? 'px-4' : 'px-2',
                              activeMenu === item.name &&
                                'bg-blue-500 hover:text-blue-600',
                              activeMenu === item.name && 'rounded-lg'
                            )}
                            onClick={() => {
                              toggleMenu(item.name);
                              if (activeMenu === item.name) {
                                setActiveMenu(null);
                              } else {
                                toggleMenu(item.name);
                              }
                            }}
                          >
                            <motion.div
                              className='flex items-center'
                              initial={false}
                              animate={{
                                justifyContent: isSidebarOpen
                                  ? 'flex-start'
                                  : 'center',
                                width: isSidebarOpen ? '100%' : 'auto',
                              }}
                              transition={{ duration: 0.3, ease: 'easeIn' }}
                            >
                              <motion.div
                                initial={false}
                                animate={{
                                  marginRight: isSidebarOpen ? '0.9rem' : '0',
                                  scale: isSidebarOpen ? 1 : 1.2,
                                }}
                                transition={{
                                  duration: 0.3,
                                  ease: 'easeInOut',
                                }}
                              >
                                {/* {item.icon} */}
                                <item.icon
                                  className={cn('h-5 w-5  text-blue-600', {
                                    'ml-1.5 w-4 h-4': !isSidebarOpen,
                                    'text-white hover:text-blue-600':
                                      activeMenu === item.name,
                                  })}
                                />
                              </motion.div>
                              <AnimatePresence>
                                {isSidebarOpen && (
                                  <motion.span
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{
                                      duration: 0.3,
                                      ease: 'easeInOut',
                                    }}
                                  >
                                    {item.name}
                                  </motion.span>
                                )}
                              </AnimatePresence>
                            </motion.div>
                            {isSidebarOpen && (
                              <ChevronDown
                                className={cn(
                                  'h-4 w-4 transition-transform duration-200',
                                  activeMenu === item.name && 'rotate-180'
                                )}
                              />
                            )}
                          </Button>
                        </TooltipTrigger>
                        {!isSidebarOpen && (
                          <TooltipContent side='right'>
                            <p>{item.name}</p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                    <AnimatePresence>
                      {activeMenu === item.name && isSidebarOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                          {item.subitems.map((subitem, subIndex) => (
                            <motion.div
                              key={subIndex}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -10 }}
                              transition={{
                                duration: 0.3,
                                delay: subIndex * 0.1,
                              }}
                            >
                              <Link
                                href={`${subitem.path}`}
                                className={cn(
                                  buttonVariants({ variant: 'ghost' }),
                                  'w-full my-1.5 block   transition-all duration-300'
                                )}
                              >
                                <p className='flex items-center  gap-2'>
                                  <subitem.icon />
                                  <span>{subitem.name}</span>
                                </p>
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </nav>
            </ScrollArea>

            <Card
              className={cn(
                'mt-4 bg-slate-50  border-none transition-all duration-300',
                isSidebarOpen ? 'p-4' : 'p-2'
              )}
            >
              <CardContent
                className={cn(
                  'flex flex-col items-center justify-center',
                  isSidebarOpen ? 'p-0' : 'p-0 h-20'
                )}
              >
                {/* {isSidebarOpen ? (
                  <>
                    <h3 className='font-semibold mb-2'>Upgrade your plan</h3>
                    <p className='text-sm mb-4 text-center'>
                      Get more features and benefits
                    </p>
                    <Button className='w-full bg-white text-blue-700 hover:bg-gray-100'>
                      <Zap className='mr-2 h-4 w-4 text-blue-700' />
                      Upgrade Now
                    </Button>
                  </>
                ) : (
                  <Button className='w-full h-full bg-blue-700 text-primary0 p-0'>
                    <Zap className='h-6 w-6' />
                  </Button>
                )} */}
                <SignedOut>
                  <SignInButton />
                </SignedOut>
                <SignedIn>
                  <UserButton showName={isSidebarOpen} />
                </SignedIn>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default SideBar;
