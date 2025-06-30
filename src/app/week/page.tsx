'use client';

import React, { useMemo, useState } from 'react';
import { format, addDays, subDays, parse, startOfWeek } from 'date-fns';
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import Breadcrumbs from '@/app/components/Breadcrumbs';
import ArrowButton from '../components/ArrowButton';


function getTimeSlots(start = 8, end = 20) {
  const slots = [];
  for (let h = start; h <= end; h++) {
    const hourString = `${h < 10 ? '0' : ''}${h}:00`;
    slots.push(hourString);
  }
  return slots;
}

// / Dummy weekly event data: each day gets a 0–2 events for demonstration
const sampleWeeklyEvents: Record<string, { time: string; title: string }[]> = {
  // Format: "YYYY-MM-DD": [{ time, title }]
  ['2025-06-16']: [
    { time: '09:00', title: 'Team Sync' },
    { time: '14:00', title: 'Design Review' },
  ],
  ['2025-06-17']: [{ time: '10:00', title: 'Client Call' }],
  ['2025-06-18']: [
    { time: '13:30', title: 'Code Review' },
    { time: '16:00', title: 'Yoga Class' },
  ],
  ['2025-06-19']: [{ time: '12:00', title: 'Lunch with Alex' }],
  ['2025-06-20']: [{ time: '09:30', title: 'Sprint Planning' }],
  ['2025-06-21']: [{ time: 'All Day', title: 'Weekend Hike' }],
  ['2025-06-22']: [{ time: '19:00', title: 'Concert' }],
};

const WeekViewPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dateStr = searchParams.get('date') || format(new Date(), 'yyyy-MM-dd');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ date: '', time: '', event: null });

  const dateObj = useMemo(() => {
    const parsed = parse(dateStr, 'yyyy-MM-dd', new Date());
    return isNaN(parsed.getTime()) ? new Date() : parsed;
  }, [dateStr]);

  const weekStart = useMemo(() => startOfWeek(dateObj, { weekStartsOn: 0 }), [dateObj]);

  function handlePrevWeek() {
    const prev = subDays(weekStart, 7);
    router.push(`/week?date=${format(prev, 'yyyy-MM-dd')}`);
  }

  function handleNextWeek() {
    const next = addDays(weekStart, 7);
    router.push(`/week?date=${format(next, 'yyyy-MM-dd')}`);
  }

  const timeSlots = getTimeSlots();
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const eventsByDay = days.reduce(
    (acc, day) => {
      const key = format(day, 'yyyy-MM-dd');
      acc[key] = sampleWeeklyEvents[key] || [];
      return acc;
    },
    {} as Record<string, { time: string; title: string }[]>
  );
  return (
    <div className="min-h-screen flex justify-center">
      <div className="w-full max-w-[1400px] px-4 py-6 flex flex-col gap-8">
        <Breadcrumbs />

        {/* Date Navigation */}

        <div className="flex items-center justify-between mb-6">
          <ArrowButton direction="left" onClick={handlePrevWeek} ariaLabel="Previous Period" />

          <div className="flex flex-col items-center">
            <Calendar className="mb-1 opacity-60" />
            <span className="text-2xl font-bold mb-1 tracking-tight">
              {format(days[0], 'MMM d')} - {format(days[6], 'MMM d, yyyy')}
            </span>
          </div>
          <ArrowButton direction="right" onClick={handleNextWeek} ariaLabel="Next Period" />
        </div>

        {/* Calendar Grid */}
        <div className="bg-white w-full border-2 border-black rounded-xl p-6 shadow-[4px_4px_0_0_black]">
          <div
            className="grid rounded-lg overflow-hidden min-w-[1100px]"
            style={{
              gridTemplateColumns: '80px repeat(7, minmax(50px, 1fr))',
              borderBottom: '1px solid #d1d5db',
            }}
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
                    style={{
                      borderBottom: '1px solid #d1d5db',
                      borderRight: '1px solid #d1d5db',
                    }}
                    className="w-full h-16 rounded-lg transition-all duration-200 relative group flex items-center justify-center"
                  >
                    {/* Event placeholder */}
                    {(eventsByDay[format(day, 'yyyy-MM-dd')] || []).some(
                      ev => ev.time === time
                    ) && (
                      <div className="absolute inset-x-1 top-1 bottom-1 bg-blue-50 border-2 border-blue-300 rounded-md px-2 py-1 text-xs text-blue-700 font-medium truncate">
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
    </div>
  );
};

export default WeekViewPage;
