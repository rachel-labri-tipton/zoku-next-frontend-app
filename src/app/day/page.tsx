'use client';

import React, { useMemo } from 'react';
import { format, addDays, subDays, parse } from 'date-fns';
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import Breadcrumbs from '@/app/components/Breadcrumbs';
import TodoListSidebar from '../components/TodoListSidebar';
import Greeting from '@/app/components/GreetingComponent';
import DailyViewPage from '../components/DayCalendarComponent';

const sampleEvents = [
  { time: '09:00', title: 'Check Emails' },
  { time: '10:30', title: 'Client Call' },
  { time: '12:00', title: 'Lunch' },
  { time: '15:00', title: 'Code Review' },
  { time: '18:30', title: 'Yoga' },
];

function getTimeSlots(start = 8, end = 20) {
  const slots = [];
  for (let h = start; h <= end; h++) {
    const hourString = `${h < 10 ? '0' : ''}${h}:00`;
    slots.push(hourString);
  }
  return slots;
}

const DayViewPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlParams = new URLSearchParams(location.search);
  const dateStr = urlParams.get('date') || format(new Date(), 'yyyy-MM-dd');
  const dateObj = useMemo(() => {
    const parsed = parse(dateStr, 'yyyy-MM-dd', new Date());
    return isNaN(parsed.getTime()) ? new Date() : parsed;
  }, [dateStr]);

  return (
    <>
      {/* <div className="px-2 py-6 flex flex-col gap-8 font-raleway">
        {/* Breadcrumbs Navigation */}
      {/* <Breadcrumbs />
        {/* Daily Tasks Sidebar (Slide-out Panel) Trigger */}
      <DailyViewPage />

      {/* Right side - Task List */}
      <div className="w-full lg:w-1/4">
        <TodoListSidebar />
      </div>
    </>
  );
};

export default DayViewPage;
