import React, { useState } from 'react';
import EventModal from './EventModal';

const TimeSlotCell = ({ date, time, events, onSave, onDelete, cellStyle = {} }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const handleCellClick = e => {
    // Only open modal for creating if not clicking on an event
    if (e.target === e.currentTarget) {
      setEditingEvent(null);
      setModalOpen(true);
    }
  };

  const handleEventClick = (event, e) => {
    e.stopPropagation();
    setEditingEvent(event);
    setModalOpen(true);
  };

  const handleSave = eventData => {
    onSave(eventData);
    setModalOpen(false);
  };

  const handleDelete = id => {
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
        onDelete={editingEvent ? () => handleDelete(editingEvent.id) : undefined}
        initialDate={date}
        initialEvent={
          editingEvent
            ? { ...editingEvent, date, time }
            : { date, time, title: '', desc: '', recurring: false }
        }
      />
    </>
  );
};

export default TimeSlotCell;
