// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
    reducer: {
        products: productsReducer,
    },
});

// RootState type
export type RootState = ReturnType<typeof store.getState>;

// Typed dispatch and selector
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch();
