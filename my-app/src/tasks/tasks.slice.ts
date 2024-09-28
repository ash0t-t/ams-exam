import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { ITaskState, ITask } from "../utils/types";

const initialState: ITaskState = {
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

export const addTask = createAsyncThunk("tasks/addTask", async (task: ITask) => {
  const response = await axios.post("http://localhost:3000/tasks", task);
  return response.data;
});

export const updateTask = createAsyncThunk("tasks/updateTask", async (task: ITask) => {
  const response = await axios.put(`http://localhost:3000/tasks/${task.id}`, task);
  return response.data;
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    filterTasksByProgress: (state, action: PayloadAction<"pending" | "completed" | "onProgress">) => {
      if (action.payload === "completed") {
        state.filteredTasks = state.tasks.filter((task) => task.status === "completed");
      } else if (action.payload === "pending") {
        state.filteredTasks = state.tasks.filter((task) => task.status === "pending");
      } else if (action.payload === "onProgress") {
        state.filteredTasks = state.tasks.filter((task) => task.status === "onProgress");
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