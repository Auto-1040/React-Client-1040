import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { UserInfo } from "../components/Types";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchUserInfo = createAsyncThunk('userInfo/fetch',
    async (userId: number, thunkAPI) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/users/${userId}/details`);
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response?.status || e.message);
        }
    }
);

export const addUserInfo = createAsyncThunk('userInfo/add',
    async ({ userId, userInfo }: { userId: number, userInfo: UserInfo }, thunkAPI) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/users/${userId}/details`,userInfo);
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response?.status || e.message);
        }
    }
);

export const updateUserInfo = createAsyncThunk('userInfo/edit',
    async ({ userId, userInfo }: { userId: number, userInfo: UserInfo }, thunkAPI) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/api/users/${userId}/details`,
                userInfo);
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response?.status || e.message);
        }
    }
);

export const deleteUserInfo = createAsyncThunk('userInfo/delete',
    async (userId: number, thunkAPI) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/api/users/${userId}/details`,);
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response?.status || e.message);
        }
    }
);

const userInfoSlice = createSlice({
    name: 'userInformation',
    initialState: {
        userInfo: null,
        loading: true
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserInfo.fulfilled, (state, action) => {
                state.userInfo = action.payload;
                state.loading = false;
            })
            .addCase(fetchUserInfo.rejected, () => {

            })
            .addCase(addUserInfo.fulfilled, (state, action) => {
                state.userInfo = action.payload
            })
            .addCase(addUserInfo.rejected, () => {

            })

            .addCase(updateUserInfo.fulfilled, (state, action) => {
                state.userInfo = action.payload;
            })
            .addCase(updateUserInfo.rejected, () => {
                
            })
            .addCase(deleteUserInfo.fulfilled, (state) => {
                state.userInfo = null;
            })
            .addCase(deleteUserInfo.rejected, () => {
                
            });
    }
});

export default userInfoSlice;
