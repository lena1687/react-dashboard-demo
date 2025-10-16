import type { ProductType } from '../../types/products.ts';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface ProductInCart extends ProductType {
  quantity: number;
}

interface CartItem {
  items: ProductInCart[];
}

const initialState: CartItem = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ProductInCart>) => {
      const existing = state.items.find((item) => item.id === action.payload.id);
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    updateItemQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find(({ id }) => id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
  },
});

export const { addItem, updateItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;
