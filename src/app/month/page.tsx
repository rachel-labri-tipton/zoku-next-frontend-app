'use client';

import React, { use, useState } from 'react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  addMonths,
  subMonths,
  isSameDay,
  isSameMonth,
  isToday,
} from 'date-fns';
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react';
import { Button, Paper, Box, Typography } from '@mui/material';
import clsx from 'clsx';
import { useEventHandlers } from '@/app/hooks/useEventHandlers';

// import SketchyButton from "../components/SketchyButton";
import EventModal from '../components/EventModal';
import Breadcrumbs from '../components/Breadcrumbs';
import ArrowButton from '../components/ArrowButton';

// Dummy data for events
const sampleEvents: Record<string, number> = {
  // Format: "YYYY-MM-DD": numberOfEvents
  ['2025-06-01']: 2,
  ['2025-06-04']: 1,
  ['2025-06-15']: 3,
  ['2025-06-19']: 2,
  ['2025-06-25']: 1,
};

const events = useEventHandlers();
console.log(events);




type DayModalProps = {
  date: Date | null;
  onClose: () => void;
};

const DayModal: React.FC<DayModalProps> = ({ date, onClose }) => {
  if (!date) return null;
  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/20">
      <div className="bg-white rounded-xl shadow-lg p-6 min-w-[300px] animate-fade-in relative">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-black" onClick={onClose}>
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-2">{format(date, 'MMMM d, yyyy')}</h2>
        <p className="text-gray-700">Events for this day will go here.</p>
      </div>
    </div>
  );
};

const daysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const MonthView: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [customEvents, setCustomEvents] = useState<{ title: string; date: string }[]>([]);

  // Helper to format YYYY-MM-DD
  const toKey = (date: Date) => format(date, 'yyyy-MM-dd');

  // Get all visible days in the calendar for the given month
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 0 }); // Sunday
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 0 }); // Saturday

  const weeks: Date[][] = [];
  let day = startDate;
  let done = false;
  while (!done) {
    const week: Date[] = [];
    for (let i = 0; i < 7; i++) {
      week.push(day);
      day = addDays(day, 1);
    }
    weeks.push(week);
    if (day > endDate) {
      done = true;
    }
  }

  function handlePrevMonth() {
    setCurrentMonth(addMonths(currentMonth, -1));
  }
  function handleNextMonth() {
    setCurrentMonth(addMonths(currentMonth, 1));
  }

  function handleDayClick(date: Date) {
    setSelectedDay(date);
  }

  function handleCloseModal() {
    setSelectedDay(null);
  }

  // combine normal and custom sample events for display
  function eventsCountForDate(date: Date) {
    const k = toKey(date);
    const hardcoded = sampleEvents[k] ?? 0;
    const custom = customEvents.filter(ev => ev.date === k).length;
    return hardcoded + custom;
  }

  function handleSaveEvent(ev: {
    title: string;
    date: string;
    time: string;
    desc: string;
    recurring: boolean;
  }) {
    setCustomEvents(prev => [...prev, { title: ev.title, date: ev.date }]);
    setShowEventModal(false);
  }

  return (
    <div className="w-full max-w-3xl mx-auto my-10 px-2">
      <Breadcrumbs />
      {/* Month navigation */}
      <div className="flex items center justify-between">
        <ArrowButton direction="left" onClick={handlePrevMonth} ariaLabel="Previous Period" />

        <div className="flex flex-col items-center">
          <Calendar className="mb-1 opacity-60" />
          <span className="text-2xl font-bold mb-1 tracking-tight">
            {format(currentMonth, 'MMMM yyyy')}
          </span>
        </div>
        <ArrowButton direction="right" onClick={handleNextMonth} ariaLabel="Next Period" />
      </div>
      <Paper
        elevation={0}
        sx={{
          border: 2,
          borderColor: 'black',
          borderRadius: 4,
          overflow: 'hidden',
          marginTop: 3,
        }}
      >
        {/* Day headers */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            bgcolor: 'grey.100',
            borderBottom: 2,
            borderColor: 'black',
          }}
        >
          {daysShort.map(d => (
            <Box
              key={d}
              sx={{
                py: 2,
                textAlign: 'center',
                fontWeight: 600,
                fontSize: { xs: '0.75rem', sm: '1rem' },
                color: 'grey.700',
                borderRight: 1,
                borderColor: 'grey.300',
                '&:last-child': {
                  borderRight: 0,
                },
              }}
            >
              {d}
            </Box>
          ))}
        </Box>

        {/* Calendar days */}
        <Box>
          {weeks.map((week, i) => (
            <Box
              key={i}
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                borderBottom: i < weeks.length - 1 ? 2 : 0,
                borderColor: 'black',
              }}
            >
              {week.map((date, idx) => {
                const dayKey = toKey(date);
                const isCurrent = isToday(date);
                const isThisMonth = isSameMonth(date, currentMonth);
                const hasEvents = eventsCountForDate(date);

                return (
                  <Box
                    key={idx}
                    onClick={() => handleDayClick(date)}
                    component="button"
                    sx={{
                      position: 'relative',
                      aspectRatio: '1/1',
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      pt: 1,
                      gap: 0.5,
                      borderRight: idx < 6 ? 2 : 0,
                      borderColor: 'black',
                      bgcolor: isThisMonth ? 'white' : 'grey.50',
                      '&:hover': {
                        bgcolor: 'grey.100',
                      },
                      ...(isCurrent && {
                        bgcolor: 'black',
                        '&:hover': {
                          bgcolor: '#333',
                        },
                      }),
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: { xs: '1rem', sm: '1.25rem' },
                        color: isThisMonth ? 'text.primary' : 'text.disabled',
                        ...(isCurrent && {
                          color: 'white',
                          fontWeight: 'bold',
                        }),
                      }}
                    >
                      {date.getDate()}
                    </Typography>

                    {/* Event dots */}
                    <Box sx={{ display: 'flex', gap: 0.5, mt: 0.5, height: 8 }}>
                      {Array.from({ length: Math.min(3, hasEvents) }).map((_, dotIdx) => (
                        <Box
                          key={dotIdx}
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            bgcolor:
                              dotIdx === 0
                                ? 'pink.400'
                                : dotIdx === 1
                                  ? 'warning.main'
                                  : 'success.main',
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          ))}
        </Box>
      </Paper>
      <DayModal date={selectedDay} onClose={handleCloseModal} />
      <EventModal
        open={showEventModal}
        onClose={() => setShowEventModal(true)}
        onSave={handleSaveEvent}
      />
    </div>
  );
};

export default MonthView;
