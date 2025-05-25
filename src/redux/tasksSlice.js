import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// const API_URL =
//   'https://portifolio-backend-production.up.railway.app/api/tasks';

const API_URL = 'http://localhost:3001/api/tasks';

export const getTasks = createAsyncThunk('tasks/getTasks', async () => {
  const res = await axios.get(API_URL);
  return res.data.taskList;
});

export const createTask = createAsyncThunk('tasks/createTask', async (task) => {
  const newTask = {
    ...task,
    createdAt: new Date().toISOString(),
    lastUpdate: new Date().toISOString(),
  };

  const res = await axios.post(API_URL, newTask);
  return res.data.newTask;
});

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, updatedData }) => {
    const newUpdatedData = {
      ...updatedData,
      lastUpdate: new Date().toISOString(),
      _id: id,
    };

    await axios.put(`${API_URL}/${id}`, newUpdatedData);
    return newUpdatedData;
  }
);

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

export const deleteTasks = createAsyncThunk(
  'tasks/deleteTasks',
  async (tasks) => {
    await axios.delete(API_URL, { data: tasks });
    return tasks;
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasksData: [],
    status: 'idle',
    error: null,
    search: '',
    filter: 'Mais-recentes',
    selectingStats: false,
    selectedTasks: [],
  },
  reducers: {
    setSearch: (state, { payload }) => {
      state.search = payload;
    },
    setFilter: (state, { payload }) => {
      state.filter = payload;
    },
    toggleSelectingStats: (state) => {
      state.selectingStats = !state.selectingStats;
    },
    addTask: (state, { payload }) => {
      if (!state.selectedTasks.includes(payload)) {
        state.selectedTasks.push(payload);
      }
    },
    removeTask: (state, { payload }) => {
      state.selectedTasks = state.selectedTasks.map((task) => {
        if (task !== payload && task !== undefined) {
          return task;
        }
      });
    },
    clearSelectedTasks: (state) => {
      state.selectedTasks = [];
    },
    selectAllTasks: (state) => {
      if (state.selectingStats) {
        state.selectedTasks = state.tasksData.map((task) => task._id);
      } else {
        state.selectedTasks = [];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(getTasks.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.tasksData = payload;
      })
      .addCase(createTask.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.tasksData.push(payload);
      })
      .addCase(updateTask.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.tasksData = state.tasksData.map((task) =>
          task._id === payload._id ? payload : task
        );
      })
      .addCase(deleteTask.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.tasksData = state.tasksData.filter(
          (task) => task._id !== payload
        );
      })
      .addCase(deleteTasks.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.tasksData = state.tasksData.filter(
          (task) => !payload.includes(task._id)
        );
      });
  },
});

export const {
  setSearch,
  setFilter,
  toggleSelectingStats,
  addTask,
  removeTask,
  clearSelectedTasks,
  selectAllTasks,
} = tasksSlice.actions;
export default tasksSlice.reducer;
