'use client'

import React, { useState } from "react";
import { 
  Drawer, 
  Typography, 
  Button, 
  IconButton, 
  Box,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
  Stack
} from "@mui/material";
import { Add, Close, FormatListBulleted } from '@mui/icons-material';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const initialTasks: Task[] = [
  { id: 1, text: "Review meeting notes", completed: false },
  { id: 2, text: "Reply to Alex", completed: true },
  { id: 3, text: "Finish Figma flows", completed: false },
];

export default function TodoListSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const completedCount = tasks.filter((t) => t.completed).length;
  const progress = tasks.length ? (completedCount / tasks.length) * 100 : 0;

  function handleToggleTask(id: number) {
    setTasks((curr) =>
      curr.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  }

  function handleAddTask() {
    const text = window.prompt("New task:");
    if (text?.trim()) {
      setTasks((curr) => [
        ...curr,
        { id: Date.now(), text: text.trim(), completed: false },
      ]);
    }
  }

  return (
    <>
      <Button
        variant="outlined"
        onClick={() => setIsOpen(true)}
        sx={{
          position: 'fixed',
          right: '1rem',
          top: '6rem',
          zIndex: 40,
          gap: 1,
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2
          }
        }}
        startIcon={<FormatListBulleted />}
      >
        Today's Tasks
      </Button>

      <Drawer
        anchor="right"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: {
            width: 320,
            p: 3,
            borderLeft: 2,
            borderColor: 'black'
          }
        }}
      >
        <Stack spacing={3}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" fontWeight="bold">
              Today's Tasks
            </Typography>
            <IconButton onClick={() => setIsOpen(false)}>
              <Close />
            </IconButton>
          </Box>

          <Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="subtitle1" fontWeight="medium">
                Progress
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {completedCount}/{tasks.length} done
              </Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={progress} 
              sx={{ height: 8, borderRadius: 4 }}
            />
          </Box>

          <List sx={{ py: 0 }}>
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
                <Checkbox
                  checked={task.completed}
                  onChange={() => handleToggleTask(task.id)}
                  sx={{ 
                    '&.Mui-checked': {
                      color: 'black',
                    }
                  }}
                />
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

          <Box>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleAddTask}
              startIcon={<Add />}
              sx={{
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2
                }
              }}
            >
              Add Task
            </Button>
          </Box>
        </Stack>
      </Drawer>
    </>
  );
}