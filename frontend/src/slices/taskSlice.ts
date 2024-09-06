import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

type FilterTask = {
  status: number;
}

type Task = {
  _id: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  status: number;
  userId: string;
};

type TasksApiState = {
  tasks?: Task[] | null;
  status: "idle" | "loading" | "failed";
  error: string | null;
};

const initialState: TasksApiState = {
  tasks: [],
  status: "idle",
  error: null,
};

export const getTasks = createAsyncThunk("getTasks", async (data: FilterTask) => {
  const response = await axiosInstance.get("/tasks", { params: { status: data.status } });
  
  const resData = response.data.data;

  return resData;
});

export const createTask = createAsyncThunk("createTask", async (data: Task) => {
  const response = await axiosInstance.post("/tasks", data);
  
  const resData = response.data.data;

  return resData;
});

export const deleteTask = createAsyncThunk("deleteTask", async (data: Task) => {
  const response = await axiosInstance.delete(`/tasks/${data._id}`);
  
  const resData = response.data.data;

  return resData;
});

export const updateTask = createAsyncThunk("updateTask", async (data: Task) => {
  const response = await axiosInstance.put(`/tasks`, data);
  
  const resData = response.data.data;

  return resData;
});

export const cleanTaskState = createAsyncThunk("cleanTaskState", async () => {
  return initialState;
});

const userSlice = createSlice({
  name: "tasks",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(cleanTaskState.fulfilled, (state) => {
        return initialState;
      })
      .addCase(getTasks.pending, (state) => {
        return { ...state, status: 'loading', error: null };
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        return  { ...state, status: 'idle', tasks: [ ...action.payload ] };
      })
      .addCase(getTasks.rejected, (state, action) => {
        return { ...state, status: 'failed', error: action.error.message || "Get tasks failed" };
      })
      .addCase(createTask.pending, (state) => {
        return { ...state, status: 'loading', error: null };
      })
      .addCase(createTask.fulfilled, (state, action) => {
        return { ...state, status: 'idle', tasks: [ ...action.payload ] };
      })
      .addCase(createTask.rejected, (state, action) => {
        return { ...state, status: 'failed', error: action.error.message || "Create task failed" };
      })
      .addCase(deleteTask.pending, (state) => {
        return { ...state, status: 'loading', error: null };
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        return { ...state, status: 'idle', tasks: [ ...action.payload ] };
      })
      .addCase(deleteTask.rejected, (state, action) => {
        return { ...state, status: 'failed', error: action.error.message || "Delete task failed" };
      })
      .addCase(updateTask.pending, (state) => {
        return { ...state, status: 'loading', error: null };
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        return { ...state, status: 'idle', tasks: [ ...action.payload ] };
      })
      .addCase(updateTask.rejected, (state, action) => {
        return { ...state, status: 'failed', error: action.error.message || "Update task failed" };
      });
  },
});

export default userSlice.reducer;