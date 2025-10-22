import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"


interface AuthState {
    isAuthenticated: boolean;
    user: string | null;
}

const initialState: AtuhState = {
    isAuthenticated: false,
    user: null,
}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: ( state, action: PayloadAction<string>) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            localStorage.setItem("user", action.payload);
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem("user");

        },
        checkAuth: (state) => {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                state.isAutjenticated = true;
                state.user = storedUser;
            }
        },
    },
});

export const { login, logout, checkAuth } = authSlice.actions;
export default authSlice.reducer;
