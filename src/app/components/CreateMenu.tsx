'use client';

import { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EventModal from './EventModal';
import TodoListModal from './TodoListModal';

const CreateMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [todoModalOpen, setTodoModalOpen] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCreateEvent = async (eventData: {
    title: string;
    date: string;
    time: string;
    desc: string;
    recurring: boolean;
  }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(eventData)
      });

      if (!response.ok) {
        throw new Error('Failed to create event');
      }

      const data = await response.json();
      setEventModalOpen(false);
      // Trigger refresh of calendar view
      window.dispatchEvent(new CustomEvent('eventCreated', { detail: data }));
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  const handleCreateTodo = async (todoData: {
    text: string;
    completed: boolean;
  }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(todoData)
      });

      if (!response.ok) {
        throw new Error('Failed to create todo');
      }

      const data = await response.json();
      setTodoModalOpen(false);
      // Trigger refresh of todo list
      window.dispatchEvent(new CustomEvent('todoCreated', { detail: data }));
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  const handleCreateTodoList = async (todoData: { title: string; items: string[] }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todo-lists`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(todoData)
      });

      if (!response.ok) {
        throw new Error('Failed to create todo list');
      }

      const data = await response.json();
      setTodoModalOpen(false);
      // Trigger refresh of todo list view
      window.dispatchEvent(new CustomEvent('todoListCreated', { detail: data }));
    } catch (error) {
      console.error('Error creating todo list:', error);
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={handleClick}
        sx={{
          borderWidth: 2,
          borderColor: 'black',
          '&:hover': { borderWidth: 2, borderColor: 'black', backgroundColor: 'black', color: 'white' },
        }}
      >
        Create
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: 2,
            border: '2px solid black',
            boxShadow: '4px 4px 0 0 #000'
          }
        }}
      >
        <MenuItem 
          onClick={() => {
            handleClose();
            setEventModalOpen(true);
          }}
        >
          New Event
        </MenuItem>
        <MenuItem 
          onClick={() => {
            handleClose();
            setTodoModalOpen(true);
          }}
        >
          New Todo List
        </MenuItem>
      </Menu>

      <EventModal
        open={eventModalOpen}
        onClose={() => setEventModalOpen(false)}
        onSave={handleCreateEvent}
        initialDate={new Date().toISOString().split('T')[0]}
      />

      <TodoListModal
        open={todoModalOpen}
        onClose={() => setTodoModalOpen(false)}
      />
    </>
  );
};

export default CreateMenu;