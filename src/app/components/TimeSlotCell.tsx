import React, { useState } from 'react';
import EventModal from './EventModal';


export interface TimeSlotEvent {
  id?: string;
  title: string;
  date: string;
  time: string;
  desc?: string;
  recurring?: boolean;
  [key: string]: any; // for any extra fields
}

export interface TimeSlotCellProps {
  date: string;
  time: string;
  events: TimeSlotEvent[];
  onSave: (event: TimeSlotEvent) => void;
  onDelete: (id: string) => void;
  cellStyle?: React.CSSProperties;
}

const TimeSlotCell: React.FC<TimeSlotCellProps> = ({
  date,
  time,
  events,
  onSave,
  onDelete,
  cellStyle = {},
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<TimeSlotEvent | null>(null);

  const handleCellClick = (e: { target: any; currentTarget: any }) => {
    // Only open modal for creating if not clicking on an event
    if (e.target === e.currentTarget) {
      setEditingEvent(null);
      setModalOpen(true);
    }
  };

  const handleEventClick = (
    event: TimeSlotEvent,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setEditingEvent(event);
    setModalOpen(true);
  };

  const handleSave = (eventData: TimeSlotEvent) => {
    onSave(eventData);
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    onDelete(id);
    setModalOpen(false);
  };

  return (
    <>
      <button
        onClick={handleCellClick}
        style={cellStyle}
        className="w-full h-16 rounded-lg transition-all duration-200 relative group flex items-center justify-center hover:bg-gray-50 border-b border-r border-gray-300"
      >
        {events &&
          events.length > 0 &&
          events.map(ev => (
            <div
              key={ev.id || ev.title + ev.time}
              onClick={e => handleEventClick(ev, e)}
              className="absolute inset-x-1 top-1 bottom-1 bg-blue-50 border-2 border-blue-300 rounded-md px-2 py-1 text-xs text-blue-700 font-medium truncate cursor-pointer"
            >
              {ev.title}
            </div>
          ))}
      </button>
      <EventModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        onDelete={
          editingEvent && editingEvent.id
            ? () => handleDelete(editingEvent.id as string)
            : undefined
        }
        initialDate={date}
        initialEvent={
          editingEvent
            ? {
                ...editingEvent,
                desc: editingEvent.desc ?? '',
                startDate: editingEvent.startDate ?? date,
                endDate: editingEvent.endDate ?? date,
                recurring: editingEvent.recurring ?? false,
                time: editingEvent.time ?? time,
              }
            : { title: '', desc: '', recurring: false, startDate: date, endDate: date, time }
        }
      />
    </>
  );
};

export default TimeSlotCell;
