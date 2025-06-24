'use client';

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Box
} from "@mui/material";
import { Add, Close } from "@mui/icons-material";

const initialTasks = [
  { id: 1, text: "Finish wireframes", completed: false },
  { id: 2, text: "Email Sam about meeting", completed: true },
  { id: 3, text: "Research new color palettes", completed: false },
];

function randomId() {
  return Math.floor(Math.random() * 1_000_000);
}

const TodoListModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState(initialTasks);

  const handleToggle = (id: number) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleAddTask = () => {
    const text = window.prompt("New task:");
    if (text && text.trim().length > 0) {
      setTasks([
        ...tasks,
        { id: randomId(), text: text.trim(), completed: false },
      ]);
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        onClick={() => setOpen(true)}
        startIcon={<Add />}
        sx={{
          borderWidth: 2,
          borderColor: 'black',
          color: 'black',
          '&:hover': {
            borderWidth: 2,
            borderColor: 'black',
            backgroundColor: 'black',
            color: 'white'
          }
        }}
      >
        Todo List
      </Button>

      <Dialog 
        open={open} 
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: 4,
            border: 2,
            borderColor: 'black',
            width: '95vw',
            maxWidth: '400px',
            p: 2
          }
        }}
      >
        <DialogTitle sx={{ 
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '1.5rem',
          pb: 2
        }}>
          My Tasks
          <IconButton
            aria-label="close"
            onClick={() => setOpen(false)}
            sx={{
              position: 'absolute',
              right: 16,
              top: 16
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <List sx={{ width: '100%' }}>
            {tasks.map((task) => (
              <ListItem
                key={task.id}
                sx={{
                  border: 2,
                  borderColor: 'black',
                  borderRadius: 2,
                  mb: 1,
                  opacity: task.completed ? 0.5 : 1,
                  boxShadow: task.completed ? 'none' : '2px 2px 0 0 black',
                  p: 1,
                }}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={task.completed}
                    onChange={() => handleToggle(task.id)}
                    sx={{ 
                      '&.Mui-checked': {
                        color: 'black',
                      }
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={task.text}
                  sx={{
                    textDecoration: task.completed ? 'line-through' : 'none',
                    color: task.completed ? 'text.disabled' : 'text.primary',
                  }}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3, pt: 2 }}>
          <Button
            variant="outlined"
            onClick={() => setOpen(false)}
            sx={{ 
              borderWidth: 2,
              borderColor: 'black',
              color: 'black',
              '&:hover': {
                borderWidth: 2,
                borderColor: 'black'
              }
            }}
          >
            Close
          </Button>
          <Button
            variant="contained"
            onClick={handleAddTask}
            startIcon={<Add />}
            sx={{ 
              bgcolor: 'black',
              '&:hover': {
                bgcolor: 'grey.900'
              }
            }}
          >
            Add Task
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TodoListModal;