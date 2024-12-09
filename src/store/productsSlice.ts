import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any[] = [];

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts(state, action: PayloadAction<any[]>) {
            return action.payload;
        },
    },
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;
