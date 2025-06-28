export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

// Base interface for common fields
interface BaseModel {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface User extends BaseModel {
  email: string;
  name: string;
  password?: string; // Optional in frontend
}

export interface Event extends BaseModel {
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  location?: string;
  isAllDay: boolean;
  color: string;
  userId: string;
}

export type Priority = 'low' | 'medium' | 'high';
export type Status = 'pending' | 'in_progress' | 'completed';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  dueDate?: Date;
  priority: Priority;
  status: Status;
  todoListId?: string;
  userId: string;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
  creator?: User;
  todoList?: TodoList;
}

export interface TodoList {
  id: string;
  title: string;
  todos?: Todo[];
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface TodoInput {
  title: string;
  description?: string;
  dueDate?: Date;
  priority?: Priority;
  status?: Status;
  todoListId?: string;
  order?: number;
}

export interface TodoModalProps {
  open: boolean;
  onClose: () => void;
  onSave?: (todo: TodoInput) => Promise<void>;
  initialTodo?: Partial<Todo>;
  todoListId?: string;
}

export interface Settings extends BaseModel {
  theme: 'light' | 'dark';
  notifications: boolean;
  language: string;
  avatar?: string;
  timezone: string;
  startOfWeek: number;
  userId: string;
}

export interface Category extends BaseModel {
  name: string;
  color?: string;
  isDefault: boolean;
  goalHours?: number;
  weeklyGoal?: number;
  monthlyGoal?: number;
  notes?: string;
  userId: string;
}

export interface TimeLog extends BaseModel {
  startTime: string;
  endTime?: string;
  duration?: number;
  notes?: string;
  todoId?: string;
  todoListId?: string;
  categoryId?: string;
  eventId?: string;
  userId: string;
}