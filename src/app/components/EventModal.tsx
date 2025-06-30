'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Switch,
  FormControlLabel,
  Stack,
  Typography,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { start } from 'repl';
import { TimeSlotEvent } from './TimeSlotCell';

export interface EventData {
  id?: string;
  title: string;
  startDate: string;
  endDate: string;
  time: string;
  desc: string;
  recurring: boolean;
}

export interface EventModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (event: TimeSlotEvent) => void;
  onDelete?: (id: string) => void;
  initialDate?: string;
  initialEvent?: EventData | null;
}

const EventModal: React.FC<EventModalProps> = ({
  open,
  onClose,
  onSave,
  onDelete,
  initialDate,
  initialEvent,
}) => {
  const [title, setTitle] = useState('');
  const [startDate, setDate] = useState(initialDate || '');
  const [endDate, setEndDate] = useState(initialDate || '');
  const [time, setTime] = useState('');
  const [desc, setDesc] = useState('');
  const [recurring, setRecurring] = useState(false);

  useEffect(() => {
    if (open && initialEvent) {
      setTitle(initialEvent.title || '');
      setDate(initialEvent.startDate || initialDate || '');
      setEndDate(initialEvent.endDate || initialDate || '');
      setTime(initialEvent.time || '');
      setDesc(initialEvent.desc || '');
      setRecurring(initialEvent.recurring || false);
    } else if (open) {
      setTitle('');
      setDate(initialDate || '');
      setEndDate(initialDate || '');
      setTime('');
      setDesc('');
      setRecurring(false);
    }
  }, [open, initialEvent, initialDate]);

  const handleSubmit = () => {
    if (title && startDate) {
      onSave({
        id: initialEvent?.id,
        title,
        startDate: startDate,
        endDate: endDate || startDate,
        time,
        desc,
        recurring,
        date: '',
      });
    } else {
      window.alert('Please fill in event title and date!');
    }
  };

  const handleDelete = () => {
    if (onDelete && initialEvent?.id) {
      onDelete(initialEvent.id);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 4,
          border: 2,
          borderColor: 'black',
          width: '95vw',
          maxWidth: '450px',
          p: 2,
          boxShadow: '4px 4px 0 0 #000',
        },
      }}
    >
      <DialogTitle
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '1.5rem',
          pb: 2,
        }}
      >
        {initialEvent ? 'Edit Event' : 'Create New Event'}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 16,
            top: 16,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3}>
          <TextField
            autoFocus
            label="Event Title"
            fullWidth
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="What's happening?"
            required
            sx={{ mt: 1 }}
          />

          <TextField
            label="Date"
            type="date"
            fullWidth
            value={startDate}
            onChange={e => setDate(e.target.value)}
            required
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Time"
            type="time"
            fullWidth
            value={time}
            onChange={e => setTime(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Description"
            multiline
            rows={3}
            fullWidth
            value={desc}
            onChange={e => setDesc(e.target.value)}
            placeholder="Add some notes..."
          />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography>Repeat?</Typography>
            <FormControlLabel
              control={
                <Switch checked={recurring} onChange={e => setRecurring(e.target.checked)} />
              }
              label={recurring ? 'Recurring' : 'One-time'}
            />
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, pt: 2 }}>
        {initialEvent && onDelete && (
          <Button
            variant="outlined"
            color="error"
            onClick={handleDelete}
            sx={{
              borderWidth: 2,
              mr: 'auto',
              '&:hover': { borderWidth: 2 },
            }}
          >
            Delete
          </Button>
        )}
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{
            borderWidth: 2,
            '&:hover': { borderWidth: 2 },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            borderWidth: 2,
            borderColor: 'black',
            '&:hover': { borderWidth: 2 },
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventModal;
