import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { format, addDays, subDays, parse } from 'date-fns';
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react';
import Button from '@mui/material/Button';
import TodoListSidebar from '../components/TodoListSidebar';
import Breadcrumbs from '../components/Breadcrumbs';
import ArrowButton from './ArrowButton';

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
    let hourString = `${h < 10 ? '0' : ''}${h}:00`;
    slots.push(hourString);
  }
  return slots;
}

const DailyViewPage: React.FC = () => {
  const router = useRouter();
  const urlParams = new URLSearchParams(location.search);
  const dateStr = urlParams.get('date') || format(new Date(), 'yyyy-MM-dd');
  const dateObj = useMemo(() => {
    const parsed = parse(dateStr, 'yyyy-MM-dd', new Date());
    return isNaN(parsed.getTime()) ? new Date() : parsed;
  }, [dateStr]);

  const timeSlots = getTimeSlots(8, 20);

  const eventsByTime = Object.fromEntries(
    timeSlots.map(
      slot => [slot, sampleEvents.filter(ev => ev.time === slot)] as [string, typeof sampleEvents]
    )
  );

  function handlePrevDay() {
    const prev = subDays(dateObj, 1);
    router.push(`/day?date=${format(prev, 'yyyy-MM-dd')}`);
  }
  function handleNextDay() {
    const next = addDays(dateObj, 1);
    router.push(`/day?date=${format(next, 'yyyy-MM-dd')}`);
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-2 py-6 flex flex-col gap-8 font-karla">
      <Breadcrumbs />
      {/* Daily Tasks Sidebar (Slide-out Panel) Trigger */}
      <TodoListSidebar />

      {/* Date Header and Navigation */}
      <div className="flex items-center justify-between mb-6">
          <ArrowButton direction="left" onClick={handlePrevDay} ariaLabel="Previous Period" />

          <div className="flex flex-col items-center">
            <Calendar className="mb-1 opacity-60" />
            <span className="text-2xl font-bold mb-1 tracking-tight">
              {format(dateObj, 'MMMM d, yyyy')}
            </span>
          </div>
          <ArrowButton direction="right" onClick={handleNextDay} ariaLabel="Next Period" />
      </div>

      {/* Time slots and Events */}
      <div className="bg-white rounded-xl border border-black shadow-[4px_4px_0_0_black] flex flex-col gap-0 p-0 mb-2 overflow-x-auto">
        <div className="flex flex-col divide-y">
          {timeSlots.map(slot => (
            <div
              key={slot}
              className="flex items-center px-4 py-3 min-h-[32px] border-2 border-blue-300"
            >
              <div className="text-xs sm:text-sm font-mono w-[54px] flex-shrink-0 text-gray-400 border-black">
                {slot}
              </div>
              <div className="flex-1 pl-4 border-black">
                {eventsByTime[slot] && eventsByTime[slot].length > 0 ? (
                  eventsByTime[slot].map((ev, idx) => (
                    <div
                      key={idx}
                      className="inline-block bg-blue-50 border-2 border-blue-300 rounded-lg px-3 py-1 font-semibold text-blue-700 shadow-[1px_1px_0_0_rgba(30,30,120,0.13)] mb-1"
                    >
                      {ev.title}
                    </div>
                  ))
                ) : (
                  <span className="text-gray-300 text-xs italic">—</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Switch to Week View Button */}
    </div>
  );
};

export default DailyViewPage;
