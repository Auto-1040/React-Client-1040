import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchUserInfo = createAsyncThunk('userInfo/fetch',
    async (userId:number, thunkAPI) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/userDetais/${userId}`);
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response?.status || e.message);
        }
    }
);

export const addUserInfo = createAsyncThunk('recipes/add',
    async (user: Recipe, thunkAPI) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/recipes`,
                recipe,
                {
                    headers: {
                        'user-id': recipe.authorId
                    }
                }
            );
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response?.status || e.message);
        }
    }
);

export const updateUserInfo = createAsyncThunk('recipes/edit',
    async ({recipe,userId,recipeId}: {recipe:Recipe,userId:number,recipeId:number}, thunkAPI) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/api/recipes/edit`, recipe, {
                headers: {
                    'user-id': userId,
                    'recipe-id': recipeId
                }
            });
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response?.status || e.message);
        }
    }
);

export const deleteUserInfo = createAsyncThunk('recipes/edit',
    async ({recipe,userId,recipeId}: {recipe:Recipe,userId:number,recipeId:number}, thunkAPI) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/api/recipes/edit`, recipe, {
                headers: {
                    'user-id': userId,
                    'recipe-id': recipeId
                }
            });
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response?.status || e.message);
        }
    }
);

const userInfoSlice = createSlice({
    name: 'recipes',
    initialState: {
        list: [] as Recipe[],
        loading: true
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserInfo.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false;
            })
            .addCase(fetchUserInfo.rejected, () => {
                
            })
            .addCase(addUserInfo.fulfilled, (state, action) => {
                state.list.push(action.payload.recipe);
            })
            .addCase(addUserInfo.rejected, (_, action) => {
                if (action.payload === 403) {
                    alert("You are not allowed to add a recipe");
                }
            })

            .addCase(updateUserInfo.fulfilled, (state, action) => {
                console.log(action.payload);
                const index = state.list.findIndex(recipe => recipe.id === action.payload.id);
                if (index !== -1) {
                    state.list[index] = action.payload.recipe; 
                }
            })
            .addCase(updateUserInfo.rejected, (_, action) => {
                if (action.payload === 403) {
                    alert("You are not allowed to edit this recipe");
                }
                else if (action.payload === 404) {
                    alert("Recipe not found");
                }
            });
    }
});

export default userInfoSlice;
