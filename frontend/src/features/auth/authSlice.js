import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from '../../Services/auth.js'

const initialState = {
    isAuth: false,
    user: {},
    status: 'idle',
    message: { isError: false, text: '', page: '' },
};

export const loginAsync = createAsyncThunk(
    'auth/login',
    async (data) => {
        let response = await authService.login(data)

        if (response.isSuccessful) {
            return response
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
            return response
        } else {
            throw new Error(response.message);
        }
    }
);

export const logOutAsync = createAsyncThunk(
    'auth/logout',
    async (data) => {
        let response = await authService.logOut(data)

        if (response.isSuccessful) {
            return response
        } else {
            throw new Error(response.message);
        }
    }
);

export const verifyAuthAsync = createAsyncThunk(
    'auth/verifyAuth',
    async (data) => {
        let response = await authService.verifyAuth(data)

        if (response.isSuccessful) {
            return response
        } else {
            throw new Error(response.message);
        }
    }
);

export const loginSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        isAuth: (state) => {

            state.isAuth = { isError: false, text: "" };
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
                state.user = action.payload.data.user;
                state.isAuth = true
                state.message = { isError: false, text: action.payload.message, page: 'login' };
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
                state.user = action.payload.data;
                state.message = { isError: false, text: action.payload.message, page: 'register' };
            })
            .addCase(registerAsync.rejected, (state, action) => {
                state.status = 'register/failed';
                state.message = { isError: true, text: action.error.message, page: 'register' };
            })
            .addCase(logOutAsync.pending, (state) => {
                state.status = 'logout/loading';
            })
            .addCase(logOutAsync.fulfilled, (state, action) => {
                state.status = 'logout/success';
                state.user = null;
                state.isAuth = false;
                state.message = { isError: false, text: action.payload.message, page: 'logout' };
            })
            .addCase(logOutAsync.rejected, (state, action) => {
                state.status = 'logout/failed';
                state.message = { isError: true, text: action.error.message, page: 'logout' };
            })
            .addCase(verifyAuthAsync.pending, (state) => {
                state.status = 'verifyAuth/loading';
            })
            .addCase(verifyAuthAsync.fulfilled, (state, action) => {
                state.status = 'verifyAuth/success';
                state.isAuth = action.payload.data.isAuth;
                state.message = { isError: false, text: action.payload.message, page: 'verifyAuth' };
            })
            .addCase(verifyAuthAsync.rejected, (state, action) => {
                state.status = 'verifyAuth/failed';
                state.isAuth = false;
                state.message = { isError: true, text: action.error.message, page: 'verifyAuth' };
            });
    },
});

export const { isAuth } = loginSlice.actions;

export default loginSlice.reducer;
