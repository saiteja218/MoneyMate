import { createSlice, createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';
import axiosInstance from '../../utils/axios.js';


export const signupUser = createAsyncThunk(
    'auth/signupUser',
    async (formData, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post('/auth/signup', formData);

            // toast.success('Signup successful!')
            return res.data
        } catch (error) {
            toast.error('Error in signup')
            // console.log(error)
            return rejectWithValue(error.response.data.messages);

        }
    }
)

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (formData, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post('/auth/login', formData);
            // toast.success('Login successful!')
            // console.log(res.data)
            return res.data
        } catch (error) {
            toast.error('Error in login')
            // console.log(error.response.data.message)
            return rejectWithValue(error.response.data.message);
        }
    }
)
export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post('/auth/logout');
            return res.data
        } catch (error) {
            return rejectWithValue(error.res.response.data);
        }
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: JSON.parse(localStorage.getItem('user')) || null,
        loading: false,
        error: null,
    },
    reducers: {
        resetError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signupUser.pending, (state) => {
            state.loading = true
            state.error = null

        }).addCase(
            signupUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
                localStorage.setItem('user', JSON.stringify(action.payload))


            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            //login 
            .addCase(loginUser.pending, (state) => {
                state.loading = true
                state.error = null

            }).addCase(
                loginUser.fulfilled, (state, action) => {
                    state.loading = false
                    state.user = action.payload
                    console.log(state.user)
                    localStorage.setItem('user', JSON.stringify(action.payload))
                })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })//logout
            .addCase(
                logoutUser.pending, (state) => {
                    state.loading = true
                    state.error = null
                }).addCase(
                    logoutUser.fulfilled, (state, action) => {
                        state.loading = false
                        state.user = null
                        localStorage.removeItem('user')
                    }).addCase(
                        logoutUser.rejected, (state, action) => {
                            state.loading = false
                            state.error = action.payload
                        })
    }
})

export const { resetError } = authSlice.actions;

export default authSlice.reducer;