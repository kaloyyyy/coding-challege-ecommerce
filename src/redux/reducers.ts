// reducers.ts
import { combineReducers } from 'redux';
import { createSlice } from '@reduxjs/toolkit';

// Example slice
const exampleSlice = createSlice({
    name: 'example',
    initialState: { value: 0 },
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
    },
});

export const { increment, decrement } = exampleSlice.actions;

const rootReducer = combineReducers({
    example: exampleSlice.reducer,
});

export default rootReducer;
