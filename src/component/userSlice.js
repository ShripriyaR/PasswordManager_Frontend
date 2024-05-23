import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    username: '',
    // any other user state
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state, action) {
            state.isAuthenticated = true;
            state.username = action.payload.username;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.username = '';
        },
        // other reducers
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
