import api from '@/utils/axios';
import { Event } from '@/types';
import { get } from 'http';

export const eventService = {
  getAll: async () => {
    const { data } = await api.get<Event[]>('/events');
    return data;
  },

  getById: async (id: string) => {
    const { data } = await api.get<Event>(`/events/${id}`);
    return data;
  },

  create: async (event: Omit<Event, 'id'>) => {
    const { data } = await api.post<Event>('/events', event);
    return data;
  },

  update: async (id: string, event: Partial<Event>) => {
    const { data } = await api.patch<Event>(`/events/${id}`, event);
    return data;
  },

  delete: async (id: string) => {
    await api.delete(`/events/${id}`);
  },
};

export default eventService;