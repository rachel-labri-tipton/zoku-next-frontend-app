'use client';

import React, { useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { format, addDays, subDays, parse } from 'date-fns';
import { Calendar } from 'lucide-react';
import ArrowButton from '@/app/components/ArrowButton';
import Breadcrumbs from '@/app/components/Breadcrumbs';

const sampleEvents = [
  { date: '2024-07-01', time: '09:00', title: 'Check Emails' },
  { date: '2024-07-01', time: '10:30', title: 'Client Call' },
  { date: '2024-07-02', time: '12:00', title: 'Lunch' },
  { date: '2024-07-03', time: '15:00', title: 'Code Review' },
  { date: '2024-07-03', time: '18:30', title: 'Yoga' },
];

function getTimeSlots(start = 8, end = 20) {
  const slots = [];
  for (let h = start; h <= end; h++) {
    let hourString = `${h < 10 ? '0' : ''}${h}:00`;
    slots.push(hourString);
  }
  return slots;
}

const ThreeDayViewPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dateStr = searchParams.get('date') || format(new Date(), 'yyyy-MM-dd');
  const dateObj = useMemo(() => {
    const parsed = parse(dateStr, 'yyyy-MM-dd', new Date());
    return isNaN(parsed.getTime()) ? new Date() : parsed;
  }, [dateStr]);

  // Days for the 3-day view
  const days = [0, 1, 2].map(offset => addDays(dateObj, offset));
  const timeSlots = getTimeSlots(8, 20);

  const eventsByDay = days.reduce(
    (acc, day) => {
      const key = format(day, 'yyyy-MM-dd');
      acc[key] = sampleEvents[key] || [];
      return acc;
    },
    {} as Record<string, { time: string; title: string }[]>
  );

  function handlePrevPeriod() {
    const prev = subDays(dateObj, 3);
    router.push(`/three-day?date=${format(prev, 'yyyy-MM-dd')}`);
  }
  function handleNextPeriod() {
    const next = addDays(dateObj, 3);
    router.push(`/three-day?date=${format(next, 'yyyy-MM-dd')}`);
  }

  // Helper to get events for a specific day and time
  const getEventsForSlot = (date: Date, slot: string) =>
    sampleEvents.filter(ev => ev.date === format(date, 'yyyy-MM-dd') && ev.time === slot);

  return (
    <div className="w-full max-w-5xl mx-auto px-2 py-6 flex flex-col gap-8 font-karla">
      <Breadcrumbs />

      {/* Date Header and Navigation */}
      <div className="flex items-center justify-between mb-6">
        <ArrowButton direction="left" onClick={handlePrevPeriod} ariaLabel="Previous Period" />
        <div className="flex flex-col items-center">
          <Calendar className="mb-1 opacity-60" />
          <span className="text-2xl font-bold mb-1 tracking-tight">
            {format(days[0], 'MMMM d')} - {format(days[2], 'MMMM d, yyyy')}
          </span>
        </div>
        <ArrowButton direction="right" onClick={handleNextPeriod} ariaLabel="Next Period" />
      </div>

      {/* Time slots and Events */}
      <div className="bg-white border-2 border-black rounded-xl p-6 shadow-[4px_4px_0_0_black]">
        <div
          className="grid rounded-lg overflow-hidden"
          style={{ gridTemplateColumns: '80px repeat(3, 1fr)', borderBottom: '1px solid #d1d5db' }}
        >
          {/* Header Row */}
          <div /> {/* Empty cell for time column */}
          {days.map(day => (
            <div key={day.toISOString()} className="text-center font-bold pb-2">
              {format(day, 'EEE')}
              <div className="text-sm text-gray-500">{format(day, 'd')}</div>
            </div>
          ))}
          {/* Time slots rows */}
          {timeSlots.map(time => (
            <React.Fragment key={time}>
              {/* Time label */}
              <div className="text-sm font-mono text-gray-500 pr-4 h-16 flex items-end justify-end">
                {time}
              </div>
              {/* Time slots for each day */}
              {days.map(day => (
                <button
                  key={format(day, 'yyyy-MM-dd') + time}
                  onClick={() => {
                    const selectedDate = format(day, 'yyyy-MM-dd');
                    // Open event creation modal
                    console.log(`Create event: ${selectedDate} ${time}`);
                  }}
                  style={{ borderBottom: '1px solid #d1d5db', borderRight: '1px solid #d1d5db' }}
                  className="w-full h-16 rounded-lg transition-all duration-200 relative group flex items-center justify-center"
                >
                  {/* Event placeholder */}
                  {(eventsByDay[format(day, 'yyyy-MM-dd')] || []).some(ev => ev.time === time) && (
                    <div className="absolute inset-x-1 top-1 bottom-1 bg-gray border-2 border-blue-300 rounded-md px-2 py-1 text-xs text-black font-medium truncate">
                      {(eventsByDay[format(day, 'yyyy-MM-dd')] || [])
                        .filter(ev => ev.time === time)
                        .map(ev => ev.title)
                        .join(', ')}
                    </div>
                  )}
                </button>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThreeDayViewPage;
