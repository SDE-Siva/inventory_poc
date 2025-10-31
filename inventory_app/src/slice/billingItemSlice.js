import { createSlice } from "@reduxjs/toolkit";

export const itemsForBillSlice = createSlice({
  name: "billingItem",
  initialState: {
    itemsForBill: [],
    totalBillAmount: 0,
  },
  reducers: {
    addOrUpdateItemToBill: (state, action) => {
      const item = action.payload;
      const existingItem = state.itemsForBill.find(
        (i) => i.itemNumber === item.itemNumber
      );

      if (existingItem) {
        existingItem.quantity += item.quantity; // ✅ add entered quantity
        state.totalBillAmount += item.price * item.quantity; // ✅ adjust total
      } else {
        state.itemsForBill.push({ ...item });
        state.totalBillAmount += item.price * item.quantity; // ✅ new entry total
      }
    },

    decreaseOrRemoveItemFromBill: (state, action) => {
      const { itemNumber, quantityToRemove = 1 } = action.payload; // ✅ accept quantity
      const existingItem = state.itemsForBill.find(
        (i) => i.itemNumber === itemNumber
      );

      if (existingItem) {
        if (existingItem.quantity > quantityToRemove) {
          existingItem.quantity -= quantityToRemove; // ✅ remove entered quantity
          state.totalBillAmount -= existingItem.price * quantityToRemove;
        } else {
          // ✅ if removing all or more than available, delete item completely
          state.totalBillAmount -= existingItem.price * existingItem.quantity;
          state.itemsForBill = state.itemsForBill.filter(
            (i) => i.itemNumber !== itemNumber
          );
        }
      }
    },
  },
});

export const {
  addOrUpdateItemToBill,
  decreaseOrRemoveItemFromBill,
} = itemsForBillSlice.actions;

export default itemsForBillSlice.reducer;
