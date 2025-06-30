import { useState } from 'react';
import { Dialog, TextField, Button, MenuItem, Stack, DialogTitle, IconButton } from '@mui/material';
import { TodoModalProps, TodoInput, Priority, Status } from '@/types'; // Adjust the import path as necessary

const TodoListModal: React.FC<TodoModalProps> = ({
  open,
  onClose,
  onSave,
  initialTodo,
  todoListId,
}) => {
  const [title, setTitle] = useState(initialTodo?.title || '');
  const [description, setDescription] = useState(initialTodo?.description || '');
  const [dueDate, setDueDate] = useState<string>(
    initialTodo?.dueDate ? new Date(initialTodo.dueDate).toISOString().split('T')[0] : ''
  );
  const [priority, setPriority] = useState<Priority>(initialTodo?.priority || 'medium');
  const [status, setStatus] = useState<Status>(initialTodo?.status || 'pending');

  const handleSubmit = async () => {
    if (onSave) {
      const todoData: TodoInput = {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        priority,
        status,
        todoListId,
      };

      try {
        await onSave(todoData);
        onClose();
      } catch (error) {
        console.error('Failed to save todo:', error);
      }
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
        Todo List {initialTodo ? 'Edit' : 'Create'}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 16,
          top: 16,
        }}
      ></IconButton>
      <Stack spacing={3} p={2}>
        <TextField
          label="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          fullWidth
          required
        />

        <TextField
          label="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          multiline
          rows={3}
          fullWidth
        />

        <TextField
          label="Due Date"
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          select
          label="Priority"
          value={priority}
          onChange={e => setPriority(e.target.value as Priority)}
          fullWidth
        >
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
        </TextField>

        <TextField
          select
          label="Status"
          value={status}
          onChange={e => setStatus(e.target.value as Status)}
          fullWidth
        >
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="in_progress">In Progress</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </TextField>

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default TodoListModal;
