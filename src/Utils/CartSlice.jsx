import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
    },
    reducers: {
        addItem: (state, action) => {
            const existingItem = state.items.find(
                (item) => item.card?.info?.id === action.payload.card?.info?.id
            );
            if (existingItem) {
                existingItem.quantity = (existingItem.quantity || 1) + 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        removeItem: (state, action) => {
            const updatedItems = state.items.filter(
                (item) => item.card?.info?.id !== action.payload
            );
            state.items = updatedItems;
        },
        clearCart: (state) => {
            state.items.length = 0;
        },
        increaseQuantity: (state, action) => {
            const item = state.items.find(
                (item) => item.card?.info?.id === action.payload
            );
            if (item) {
                item.quantity += 1;
            }
        },
        decreaseQuantity: (state, action) => {
            const item = state.items.find(
                (item) => item.card?.info?.id === action.payload
            );
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            } else if (item && item.quantity === 1) {
                // Optionally, remove the item when quantity reaches 1
                state.items = state.items.filter(
                    (item) => item.card?.info?.id !== action.payload
                );
            }
        },
    },
});

export const { addItem, removeItem, clearCart, increaseQuantity, decreaseQuantity } = CartSlice.actions;

export default CartSlice.reducer;
