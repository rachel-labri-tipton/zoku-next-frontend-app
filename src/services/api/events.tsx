import api from '@/utils/axios';
import { Event } from '@/types';
import { get } from 'http';

export const eventService = {
  getAll: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    const { data } = await api.get<Event[]>('/events', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  },

  getById: async (id: string) => {
    const token = localStorage.getItem('token');
    const { data } = await api.get<Event>(`/events/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  },

  create: async (event: Omit<Event, 'id'>) => {
    const token = localStorage.getItem('token');
    const { data } = await api.post<Event>('/events', event, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  },

  update: async (id: string, event: Partial<Event>) => {
    const token = localStorage.getItem('token');
    const { data } = await api.patch<Event>(`/events/${id}`, event, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  },

  delete: async (id: string) => {
    const token = localStorage.getItem('token');
    await api.delete(`/events/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default eventService;