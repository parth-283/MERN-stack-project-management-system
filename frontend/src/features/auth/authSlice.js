import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from '../../Services/auth.js'

const initialState = {
    token: '',
    user: {},
    status: 'idle',
    message: { isError: false, text: '', page: '' },
};

export const loginAsync = createAsyncThunk(
    'auth/login',
    async (data) => {
        let response = await authService.login(data)

        if (response.isSuccessful) {
            return response.data
        } else {
            throw new Error(response.message);
        }
    }
);

export const registerAsync = createAsyncThunk(
    'auth/register',
    async (data) => {
        let response = await authService.register(data)

        if (response.isSuccessful) {
            return response.data
        } else {
            throw new Error(response.message);
        }
    }
);

export const loginSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut: (state) => {
            state.token = '';
            state.user = null;
            state.message = { isError: false, text: "" };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.pending, (state) => {
                state.status = 'login/loading';
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.status = 'login/success';
                state.token = action.payload.access_token;
                state.user = action.payload.user;
                state.message = { isError: false, text: "Successfully login!", page: 'login' };
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.status = 'login/failed';
                state.message = { isError: true, text: action.error.message, page: 'login' };
            })
            .addCase(registerAsync.pending, (state) => {
                state.status = 'register/loading';
            })
            .addCase(registerAsync.fulfilled, (state, action) => {
                state.status = 'register/success';
                state.user = action.payload;
                state.message = { isError: false, text: "Successfully login!", page: 'register' };
            })
            .addCase(registerAsync.rejected, (state, action) => {
                state.status = 'register/failed';
                state.message = { isError: true, text: action.error.message, page: 'register' };
            });
    },
});

export const { logOut } = loginSlice.actions;

export default loginSlice.reducer;
