import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axios.js';
import SavingsGoals from '../../pages/SavingsGoals.jsx';


export const getSavingsGoals = createAsyncThunk(
    'savingsGoal/getSavingsGoals',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/savingsGoal/getSavingsGoal')
            // console.log(response.data)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
)

export const addSavingsGoal = createAsyncThunk(
    'savingsGoal/addSavingsGoal',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/savingsGoal/addSavingsGoal', data)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data.messgae)
        }
    }

)

export const deleteSavingsGoal = createAsyncThunk(
    'savingsGoal/deleteSavingsGoal',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete(`/savingsGoal/deleteSavingsGoal/${id}`)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }
    }
)

export const updateSavingsGoal = createAsyncThunk(
    'savingsGoal/updateSavingsGoal',
    async ({ goalId, data }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(`/savingsGoal/updateSavingsGoal/${goalId}`, data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }
    }
)

const savingsGoalSlice = createSlice({
    name: "savingsGoal",
    initialState: {
        savingsGoals: [],
        loading: false,
        error: null,

    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getSavingsGoals.pending, (state) => {
            state.loading = true,
                state.error = null
        })
            .addCase(getSavingsGoals.fulfilled, (state, action) => {
                state.loading = false,
                    state.savingsGoals = action.payload.goalsWithProgress
            })
            .addCase(getSavingsGoals.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.payload
            })
            //addsavingsgoal

            .addCase(addSavingsGoal.pending, (state) => {
                state.loading = true,
                    state.error = null
            })
            .addCase(addSavingsGoal.fulfilled, (state, action) => {
                state.loading = false,
                    state.savingsGoals.push(action.payload)
            })
            .addCase(addSavingsGoal.rejected, (state, action) => {
                state.loading = true,
                    state.error = payload.error
            })
            //deletesavingsgols
            .addCase(deleteSavingsGoal.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteSavingsGoal.fulfilled, (state, action) => {
                state.loading = false;
                state.savingsGoals = state.savingsGoals.filter(goal => goal._id !== action.payload._id)
            })
            .addCase(deleteSavingsGoal.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //updatesavingsgoals
            .addCase(updateSavingsGoal.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateSavingsGoal.fulfilled, (state, action) => {
                state.loading = false;
                const updatedGoal = action.payload;
                const index = state.savingsGoals.findIndex(goal => goal._id === updatedGoal._id);
                if (index !== -1) {
                    state.savingsGoals[index] = updatedGoal;
                }
            })
            .addCase(updateSavingsGoal.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export default savingsGoalSlice.reducer;