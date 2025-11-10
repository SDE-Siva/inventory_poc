import axios from "axios";

const API_URL = "http://localhost:5001/items";

export const reduceStockAfterBilling = async (billedItems) => {
  try {
    const requests = billedItems.map((item) => {
      const newStock = Math.max(0, item.inStock - item.quantity);
      return axios.patch(`${API_URL}/${item.id}`, { inStock: newStock });
    });

    // Execute all requests in parallel
    await Promise.all(requests);

    console.log("Stock updated successfully for all billed items.");
  } catch (error) {
    console.error(" Error updating stock:", error);
  }
};

// Update an existing item (edit)
export const updateItem = async (id, updatedData) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, updatedData);
    console.log(" Item updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating item:", error);
    throw error;
  }
};

// Delete an item
export const deleteItem = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    console.log("Item deleted successfully");
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
};