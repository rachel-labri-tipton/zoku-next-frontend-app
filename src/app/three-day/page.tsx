'use client'

import React, { useMemo } from 'react'
import { format, addDays, subDays, parse } from 'date-fns'
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import Breadcrumbs from '@/app/components/Breadcrumbs'

function getTimeSlots(start = 8, end = 20) {
  const slots = []
  for (let h = start; h <= end; h++) {
    const hourString = `${h < 10 ? "0" : ""}${h}:00`
    slots.push(hourString)
  }
  return slots
}

const ThreeDayViewPage: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const dateStr = searchParams.get("date") || format(new Date(), "yyyy-MM-dd")
  
  const dateObj = useMemo(() => {
    const parsed = parse(dateStr, "yyyy-MM-dd", new Date())
    return isNaN(parsed.getTime()) ? new Date() : parsed
  }, [dateStr])

  function handlePrevDays() {
    const prev = subDays(dateObj, 3)
    router.push(`/three-day?date=${format(prev, "yyyy-MM-dd")}`)
  }

  function handleNextDays() {
    const next = addDays(dateObj, 3)
    router.push(`/three-day?date=${format(next, "yyyy-MM-dd")}`)
  }

  const timeSlots = getTimeSlots()
  const days = [dateObj, addDays(dateObj, 1), addDays(dateObj, 2)]

  return (
    <div className="w-full max-w-5xl mx-auto px-2 py-6 flex flex-col gap-8">
      <Breadcrumbs />
      
      {/* Date Header and Navigation */}
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={handlePrevDays}
          aria-label="Previous Three Days"
          className="rounded-full border-2 border-black w-11 h-11 flex items-center justify-center text-xl bg-white hover:bg-black hover:text-white transition-all shadow-[2px_2px_0_0_black]"
        >
          <ArrowLeft />
        </button>
        <div className="flex flex-col items-center">
          <Calendar className="mb-1 opacity-60" />
          <span className="text-2xl font-bold mb-1 tracking-tight">
            {format(days[0], "MMM d")} - {format(days[2], "MMM d, yyyy")}
          </span>
        </div>
        <button
          onClick={handleNextDays}
          aria-label="Next Three Days"
          className="rounded-full border-2 border-black w-11 h-11 flex items-center justify-center text-xl bg-white hover:bg-black hover:text-white transition-all shadow-[2px_2px_0_0_black]"
        >
          <ArrowRight />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-[auto_1fr_1fr_1fr] gap-x-4 border-2 border-black rounded-xl p-4 bg-white">
        {/* Time Labels */}
        <div className="space-y-8 pt-8">
          {timeSlots.map((time) => (
            <div key={time} className="text-sm text-gray-500">
              {time}
            </div>
          ))}
        </div>

        {/* Day Columns */}
        {days.map((day) => (
          <div key={format(day, 'yyyy-MM-dd')} className="relative">
            <div className="text-center pb-4 font-medium">
              {format(day, 'EEEE, MMM d')}
            </div>
            {timeSlots.map((time) => (
              <div
                key={time}
                className="h-8 border-t border-gray-100 relative group"
              >
                <button
                  className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 bg-black/5 transition-opacity"
                  onClick={() => alert(`Add event at ${time}`)}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ThreeDayViewPage