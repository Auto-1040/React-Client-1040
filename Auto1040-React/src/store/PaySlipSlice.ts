import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface PaySlip {
  id: number;
  s3Key: string;
  taxYear: number;
  uploadDate:string;
}

interface PaySlipState {
  paySlips: PaySlip[];
  loading: boolean;
  error: string | null;
}

const initialState: PaySlipState = {
  paySlips: [],
  loading: false,
  error: null,
};

// Async thunk to fetch pay slips by user ID
export const fetchPaySlipsByUserId = createAsyncThunk(
  'paySlips/fetchByUserId',
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/PaySlip`, {
        params: { userId },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to fetch pay slips');
    }
  }
);

// Async thunk to delete a pay slip
export const deletePaySlip = createAsyncThunk(
  'paySlips/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/PaySlip/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Failed to delete pay slip');
    }
  }
);


const paySlipSlice = createSlice({
  name: 'paySlips',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch pay slips
      .addCase(fetchPaySlipsByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaySlipsByUserId.fulfilled, (state, action: PayloadAction<PaySlip[]>) => {
        state.loading = false;
        state.paySlips = action.payload
     })
      .addCase(fetchPaySlipsByUserId.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete pay slip
      .addCase(deletePaySlip.fulfilled, (state, action: PayloadAction<number>) => {
        state.paySlips = state.paySlips.filter((paySlip) => paySlip.id !== action.payload);
      })
      .addCase(deletePaySlip.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
      })
  },
});

export default paySlipSlice;