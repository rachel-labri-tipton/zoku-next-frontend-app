import { useState, useEffect } from 'react';
import eventService from '@/services/api/events'
import * as api from '../api/events';

export function useEventHandlers() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    eventService.getAll()
      .then(setEvents)
      .catch(console.error);
  }, []);

  const handleSaveEvent = async (eventData: { id: any; }) => {
    try {
      let saved: { id: any; };
      if (eventData.id) {
        saved = await eventService.update(eventData.id, eventData);
        setEvents(prev => prev.map(ev => (ev.id === saved.id ? saved : ev)));
      } else {
        saved = await api.createEvent(eventData);
        setEvents(prev => [...prev, saved]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteEvent = async (id: any) => {
    try {
      await eventService.delete(id);
      setEvents(prev => prev.filter(ev => ev.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return { events, handleSaveEvent, handleDeleteEvent };
}
