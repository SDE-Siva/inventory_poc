import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5001/items";

export const fetchItems = createAsyncThunk("inventory/fetchItems", async () => {
  const res = await axios.get(API_URL);
  return res.data;
});



const inventorySlice = createSlice({
  name: "inventory",
  initialState: { items: [], loading: false, error: null },
  reducers: {
    decreaseStock: (state, action) => {
      const itemNumber = action.payload;
      const existingItem = state.items.find(
        (item) => item.itemNumber === itemNumber
      );
      if (existingItem && existingItem.inStock > 0) {
        existingItem.inStock -= 1;
      }
    },
    increaseStock: (state, action) => {
      const itemNumber = action.payload;
      const existingItem = state.items.find(
        (item) => item.itemNumber === itemNumber
      );
      if (existingItem) {
        existingItem.inStock += 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { decreaseStock, increaseStock } = inventorySlice.actions;

export default inventorySlice.reducer;
