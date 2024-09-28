import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface TaskState {
  tasks: Task[];
  filteredTasks: Task[];
  task: Task | null;
}

const initialState: TaskState = {
  tasks: [],
  filteredTasks: [],
  task: null,
};

export const getTasks = createAsyncThunk("tasks/getTasks", async () => {
  const response = await axios.get("http://localhost:3000/tasks");
  return response.data;
});

export const getTaskById = createAsyncThunk("tasks/getTaskById", async (id: string) => {
  const response = await axios.get(`http://localhost:3000/tasks/${id}`);
  return response.data;
});

export const addTask = createAsyncThunk("tasks/addTask", async (task: Task) => {
  const response = await axios.post("http://localhost:3000/tasks", task);
  return response.data;
});

export const updateTask = createAsyncThunk("tasks/updateTask", async (task: Task) => {
  const response = await axios.put(`http://localhost:3000/tasks/${task.id}`, task);
  return response.data;
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    filterTasksByProgress: (state, action: PayloadAction<"all" | "completed" | "incomplete">) => {
      if (action.payload === "completed") {
        state.filteredTasks = state.tasks.filter((task) => task.completed);
      } else if (action.payload === "incomplete") {
        state.filteredTasks = state.tasks.filter((task) => !task.completed);
      } else {
        state.filteredTasks = state.tasks;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
      state.filteredTasks = action.payload;
    });
    builder.addCase(getTaskById.fulfilled, (state, action) => {
      state.task = action.payload;
    });
    builder.addCase(addTask.fulfilled, (state, action) => {
      state.tasks.push(action.payload);
      state.filteredTasks.push(action.payload);
    });
    builder.addCase(updateTask.fulfilled, (state, action) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
        state.filteredTasks[index] = action.payload;
      }
    });
  },
});

export const { filterTasksByProgress } = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;