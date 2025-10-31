import { configureStore } from "@reduxjs/toolkit";
import inventoryReducer from "../slice/inventorySlice";
import billingItemReducer from "../slice/billingItemSlice";

export const store = configureStore({
    reducer:{
        inventory: inventoryReducer,
        billingItem: billingItemReducer
    }
})

export default store;