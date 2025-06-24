'use client';
import React, { useState } from "react";
import {
  startOfWeek,
  addDays,
  format,
  isToday,
  subWeeks,
  addWeeks,
  isSameDay,
  isSameWeek,
} from "date-fns";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import { Button } from "@mui/material";
import clsx from "clsx";
// import SketchyButton from "../components/SketchyButton";
// import EventModal from "../components/EventModal";
import Breadcrumbs from "../components/Breadcrumbs";

// Dummy weekly event data: each day gets a 0–2 events for demonstration
const sampleWeeklyEvents: Record<string, { time: string; title: string }[]> = {
  // Format: "YYYY-MM-DD": [{ time, title }]
  ["2025-06-16"]: [
    { time: "09:00", title: "Team Sync" },
    { time: "14:00", title: "Design Review" },
  ],
  ["2025-06-17"]: [{ time: "10:00", title: "Client Call" }],
  ["2025-06-18"]: [
    { time: "13:30", title: "Code Review" },
    { time: "16:00", title: "Yoga Class" },
  ],
  ["2025-06-19"]: [{ time: "12:00", title: "Lunch with Alex" }],
  ["2025-06-20"]: [{ time: "09:30", title: "Sprint Planning" }],
  ["2025-06-21"]: [{ time: "All Day", title: "Weekend Hike" }],
  ["2025-06-22"]: [{ time: "19:00", title: "Concert" }],
};

const daysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const WeeklyViewPage: React.FC = () => {
  // Track current week's anchor: always the Sunday of the week displayed
  const [currentWeekStart, setCurrentWeekStart] = useState(
    startOfWeek(new Date(), { weekStartsOn: 0 })
  );
  // Track selected day for "Daily View" (demo: just highlight button)
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());
  // Track if event modal is open
  const [showEventModal, setShowEventModal] = useState(false);
  // Track custom events for selected day
  // Changed: All customEvents now include .time always
  const [customEvents, setCustomEvents] = useState<
    { title: string; time: string; dateStr: string }[]
  >([]);

  // Build days in week (Sunday - Saturday)
  const weekDays = Array.from({ length: 7 }).map((_, i) =>
    addDays(currentWeekStart, i)
  );

  function handlePrevWeek() {
    setCurrentWeekStart(subWeeks(currentWeekStart, 1));
  }
  function handleNextWeek() {
    setCurrentWeekStart(addWeeks(currentWeekStart, 1));
  }
  function handleDailyView(day: Date) {
    setSelectedDay(day);
    // Next: Could navigate to Daily View page for "day"
    window.location.href = "/day?date=" + format(day, "yyyy-MM-dd");
  }

  // Add dummy event to selected date - ensure 'time' property is provided (default: "All Day")
  function handleSaveEvent(ev: {
    title: string;
    date: string;
    time: string;
    desc: string;
    recurring: boolean;
  }) {
    setCustomEvents((prev) => [
      ...prev,
      {
        title: ev.title,
        // If time is empty, label it All Day for display
        time: ev.time || "All Day",
        dateStr: ev.date,
      },
    ]);
    setShowEventModal(false);
  }

  return (
    <div className="max-w-5xl mx-auto px-2 mt-8 animate-fade-in">
      <Breadcrumbs />
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="text-blue-600" size={26} aria-label="Calendar" />
          <span className="text-xl sm:text-2xl font-bold font-raleway">
            Week of {format(currentWeekStart, "MMMM d, yyyy")}
          </span>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Previous week"
            onClick={handlePrevWeek}
          >
            <ArrowLeft />
          </Button>
          <Button
            variant="primary"
            size="icon"
            aria-label="Next week"
            onClick={handleNextWeek}
          >
            <ArrowRight />
          </Button>
        </div>
      </div>
      {/* Add Create New Event Button */}
      <div className="flex justify-end my-3">
        <Button
          onClick={() => setShowEventModal(true)}
          className="font-semibold text-base"
        >
          + Create New Event
        </Button>
      </div>
      {/* Weekly Grid */}
      <div className="grid grid-cols-7 gap-2 border rounded-xl bg-white shadow-sm p-2 overflow-x-auto">
        {weekDays.map((date, i) => {
          const dateKey = format(date, "yyyy-MM-dd");
          // Custom events for this day
          const customForThisDay = customEvents.filter(ev => ev.dateStr === dateKey);
          const events = sampleWeeklyEvents[dateKey] || [];
          const today = isToday(date);
          const selected = isSameDay(date, selectedDay);
          // Merge events and custom events--both must have .time and .title (by typing, ensured now)
          const dayEvents = [...events, ...customForThisDay];
          return (
            <div
              key={i}
              className={clsx(
                "flex flex-col items-center rounded-lg px-2 pb-2 min-w-0 border transition",
                today
                  ? "border-blue-400 bg-blue-50"
                  : "border-transparent bg-white",
                selected && "ring-2 ring-blue-400"
              )}
              style={{ minWidth: 0 }}
            >
              {/* Day Label and Number */}
              <div className="w-full flex flex-col items-center mt-2 mb-1">
                <span
                  className={clsx(
                    "text-xs font-raleway font-medium uppercase tracking-widest",
                    today ? "text-blue-700" : "text-gray-400"
                  )}
                >
                  {daysShort[date.getDay()]}
                </span>
                <span
                  className={clsx(
                    "text-xl font-bold font-raleway",
                    today ? "text-blue-600" : "text-black"
                  )}
                >
                  {date.getDate()}
                </span>
              </div>
              {/* Mini events schedule */}
              <div className="flex flex-col gap-1 w-full">
                {dayEvents.length > 0 ? (
                  dayEvents.map((event, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1 text-xs rounded bg-accent px-2 py-1 mb-1 truncate"
                    >
                      <span className="font-medium text-gray-700">{event.time ? event.time : ""}</span>
                      <span className="text-gray-900 truncate">{event.title}</span>
                    </div>
                  ))
                ) : (
                  <span className="text-muted-foreground text-xs text-center my-2">
                    No events
                  </span>
                )}
              </div>
              {/* Daily view button */}
              <Button
                variant="outline"
                size="sm"
                className={clsx(
                  "mt-auto w-full text-xs h-7 rounded transition font-semibold",
                  selected
                    ? "bg-blue-100 border-blue-400 text-blue-700"
                    : "bg-white"
                )}
                onClick={() => handleDailyView(date)}
              >
                Daily View
              </Button>
            </div>
          );
        })}
      </div>
      {/* <EventModal
        open={showEventModal}
        onClose={() => setShowEventModal(false)}
        onSave={handleSaveEvent}
      /> */}
    </div>
  );
};

export default WeeklyViewPage;
