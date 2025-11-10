import { createSlice } from "@reduxjs/toolkit";

export const itemsForBillSlice = createSlice({
  name: "billingItem",
  initialState: {
    itemsForBill: [],
    billingTable:"billMenuBlocked",
    itemsTable:"addItemOpened",
    totalBillAmount: 0,
    gstAmount:0,
    tenderAmount:0,
    changeAmount:0
  },
  reducers: {
    addOrUpdateItemToBill: (state, action) => {
      const item = action.payload;
      const existingItem = state.itemsForBill.find(
        (i) => i.itemNumber === item.itemNumber
      );

      if (existingItem) {
        existingItem.quantity += item.quantity; 
        state.totalBillAmount += item.price * item.quantity; 
        state.gstAmount += (item.price * item.quantity) * 0.12;
      } else {
        state.itemsForBill.push({ ...item });
        state.totalBillAmount += item.price * item.quantity; 
        state.gstAmount += (item.price * item.quantity) * 0.12;

      }
    },

    decreaseOrRemoveItemFromBill: (state, action) => {
      const { itemNumber, quantityToRemove = 1 } = action.payload; 
      const existingItem = state.itemsForBill.find(
        (i) => i.itemNumber === itemNumber
      );

      if (existingItem) {
        if (existingItem.quantity > quantityToRemove) {
          existingItem.quantity -= quantityToRemove; 
          state.totalBillAmount -= existingItem.price * quantityToRemove;
          state.gstAmount -= (item.price * item.quantity) * 0.12;
        } else {
          // if removing all or more than available, delete item completely
          state.totalBillAmount -= existingItem.price * existingItem.quantity;
          state.gstAmount -= (item.price * item.quantity) * 0.12;
          state.itemsForBill = state.itemsForBill.filter(
            (i) => i.itemNumber !== itemNumber
          );
        }
      }
    },
    removeLastItemFromBill: (state) => {
      if (state.itemsForBill.length === 0) return; 
      const lastItem = state.itemsForBill[state.itemsForBill.length - 1];

      if (lastItem.quantity > 1) {
        lastItem.quantity -= 1;
        state.totalBillAmount -= lastItem.price;
        state.gstAmount -= (lastItem.price * 0.12);
      } else {

        state.totalBillAmount -= lastItem.price;
        state.gstAmount -= (lastItem.price * 0.12);
        state.itemsForBill.pop(); 
      }
    },
    addTenderAmount: (state, action) => {
      state.tenderAmount += action.payload;
      state.changeAmount = Math.abs(state.tenderAmount - state.totalBillAmount );
      state.changeAmount = Math.max(0,state.tenderAmount - (state.totalBillAmount + state.gstAmount));
    },
    updateBillingMenu: (state,action) => {
      state.billingTable=action.payload
    },
    updateItemsMenu: (state,action) => {
      state.itemsTable=action.payload
    },
    resetItemsForBill: (state) => {
      state.itemsForBill = [];
      state.totalBillAmount = 0;
      state.gstAmount=0;
      state.tenderAmount=0;
      state.changeAmount=0;
    }
  },
});

export const {
  addOrUpdateItemToBill,
  decreaseOrRemoveItemFromBill,
  updateBillingMenu,
  updateItemsMenu,
  addTenderAmount,
  removeLastItemFromBill,
  resetItemsForBill
} = itemsForBillSlice.actions;

export default itemsForBillSlice.reducer;
