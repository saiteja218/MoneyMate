import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axoisInstance from '../../utils/axios.js';

export const addIncome=createAsyncThunk(
    'transactions/addIncome',
    async (data,{rejectWithValue})=>{
        try {
            const response= await axoisInstance.post('/income/addIncome',data);
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
)

export const getIncome=createAsyncThunk(
    'transactions/getIncome',
    async (_,{rejectWithValue})=>{
        try {
            const response= await axoisInstance.get('/income/getIncome');
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
)

export const deleteIncome=createAsyncThunk(
    'transactions/deleteIncome',
    async (id,{rejectWithValue})=>{
        try {
            const response= await axoisInstance.delete(`/income/deleteIncome/${id}`);
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
)

export const addExpense=createAsyncThunk(
    'transactions/addExpense',
    async (data,{rejectWithValue})=>{
        try {
            const response= await axoisInstance.post('/expense/addExpense',data);
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
)
export const getExpense=createAsyncThunk(
    'transactions/getExpense',
    async (_,{rejectWithValue})=>{
        try {
            const response= await axoisInstance.get('/expense/getExpense');
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
)

export const deleteExpense=createAsyncThunk(
    'transactions/deleteExpense',
    async (id,{rejectWithValue})=>{
        try {
            const response= await axoisInstance.delete(`/expense/deleteExpense/${id}`);
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
)

const transactionSlice=createSlice({
    name:'transactions',
    initialState:{
        income:[],
        expense:[],
        loading:false,
        error:null,
    },
    reducers:{
        resetError:(state)=>{
            state.error=null;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(addIncome.pending,(state)=>{
            state.loading=true
            state.error=null
        }).addCase(
            addIncome.fulfilled,(state,action)=>{
                state.loading=false
                state.income.push(action.payload)
            })
        .addCase(addIncome.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
        //get income
        .addCase(getIncome.pending,(state)=>{
            state.loading=true
            state.error=null
        }).addCase(
            getIncome.fulfilled,(state,action)=>{
                state.loading=false
                state.income=action.payload
            })
        .addCase(getIncome.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
        //delete income
        .addCase(deleteIncome.pending,(state)=>{
            state.loading=true
            state.error=null
        }).addCase(
            deleteIncome.fulfilled,(state,action)=>{
                state.loading=false
                const index=state.income.findIndex((item)=>item._id===action.payload._id);
                if(index!==-1){
                    state.income.splice(index,1);
                }
            })
        .addCase(deleteIncome.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
        
        //add expense 
        .addCase(addExpense.pending,(state)=>{
            state.loading=true
            state.error=null
        }).addCase(
            addExpense.fulfilled,(state,action)=>{
                state.loading=false
                state.expense.push(action.payload)
            })
        .addCase(addExpense.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
        
         //get expense 
         .addCase(getExpense.pending,(state)=>{
            state.loading=true
            state.error=null
        }).addCase(
            getExpense.fulfilled,(state,action)=>{
                state.loading=false
                state.expense=action.payload
            })
        .addCase(getExpense.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })

         //delete expense 
         .addCase(deleteExpense.pending,(state)=>{
            state.loading=true
            state.error=null
        }).addCase(
            deleteExpense.fulfilled,(state,action)=>{
                state.loading=false
                const index=state.expense.findIndex((item)=>item._id===action.payload._id);
                if(index!==-1){
                    state.expense.splice(index,1);
                }
            })
        .addCase(deleteExpense.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
    }
})
export const { resetError } = transactionSlice.actions;
export default transactionSlice.reducer;