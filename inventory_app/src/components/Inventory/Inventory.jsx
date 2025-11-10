import "../../App.css";
import { Link } from "react-router-dom";
import { homeIcon } from "../../assets/images";
import { useState, useEffect, use } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchItems } from "../../slice/inventorySlice";
import { FaEdit, FaTrash } from "react-icons/fa";
import { updateItem, deleteItem } from "../../api/inventoryService";
import Snackbar from "../common/Snackbar";

export const Inventory = () => {
  const itemsData = useSelector((state) => state.inventory.items);
  const dispatch = useDispatch();
  const [filterType, setFilterType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [inventoryItems, setInventoryItems] = useState(itemsData);

  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editedItem, setEditedItem] = useState({ price: "", purchased: "" });
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState({message:"", type:""});

  useEffect(() => {
    dispatch(fetchItems());
  }, []);

  useEffect(() => {
    setInventoryItems(itemsData);
  }, [itemsData]);

  useEffect(() => {
    const today = new Date();
    let from, to;

    switch (filterType) {
      case "Today":
        from = to = formatDate(today);
        break;
      case "Yesterday":
        const y = new Date(today);
        y.setDate(today.getDate() - 1);
        from = to = formatDate(y);
        break;
      case "This Week":
        const start = new Date(today);
        const end = new Date(today);
        start.setDate(today.getDate() - today.getDay());
        end.setDate(start.getDate() + 6);
        from = formatDate(start);
        to = formatDate(end);
        break;
      case "Last Week":
        const lastStart = new Date(today);
        const lastEnd = new Date(today);
        lastStart.setDate(today.getDate() - today.getDay() - 7);
        lastEnd.setDate(lastStart.getDate() + 6);
        from = formatDate(lastStart);
        to = formatDate(lastEnd);
        break;
      case "This Month":
        from = formatDate(new Date(today.getFullYear(), today.getMonth(), 1));
        to = formatDate(new Date(today.getFullYear(), today.getMonth() + 1, 0));
        break;
      case "Last Month":
        from = formatDate(
          new Date(today.getFullYear(), today.getMonth() - 1, 1)
        );
        to = formatDate(new Date(today.getFullYear(), today.getMonth(), 0));
        break;
      case "Custom":
        from = fromDate;
        to = toDate;
        break;
      default:
        setInventoryItems(itemsData);
        return;
    }

    const result = itemsData.filter(
      (item) => item.purchaseDate >= from && item.purchaseDate <= to
    );

    setInventoryItems(result);
  }, [filterType, fromDate, toDate]);

  const formatDate = (date) => date.toISOString().split("T")[0];

  const handleEdit = (item) => {
    setSelectedItem(item);
    setEditedItem({ price: item.price, purchased: item.purchased });
    setShowEditPopup(true);
  };

  const handleDelete = (id) => {
    const item = inventoryItems.find((i) => i.id === id);
    setSelectedItem(item);
    setShowDeletePopup(true);
  };

  const handleEditSave = async() => {
  try {
    await updateItem(selectedItem.id, editedItem);
    setShowEditPopup(false);
    setShowSnackbar(true);
    setSnackbarMessage({message:"Item updated successfully!", type:"success"});
    setTimeout(() => setShowSnackbar(false), 2000);
    dispatch(fetchItems()); 
  } catch (error) {
    etShowSnackbar(true);
    setSnackbarMessage({message:"Item Update failed!", type:"error"});
    setTimeout(() => setShowSnackbar(false), 2000);
    console.error("Error saving item:", error);
  }
  };

  const confirmDelete = async() => {
  try {
    await deleteItem(selectedItem.id);
    setShowDeletePopup(false);
    setShowSnackbar(true);
    setSnackbarMessage({message:"Item deleted successfully!", type:"success"});
    setTimeout(() => setShowSnackbar(false), 2000);
    dispatch(fetchItems()); 
  } catch (error) {
    setShowSnackbar(true);
    setSnackbarMessage({message:"Item Deletion failed!", type:"error"});
    setTimeout(() => setShowSnackbar(false), 2000);
    console.error("Error deleting item:", error);
  }
  };

  return (
    <div>
      <div className="header">
        {showSnackbar && <Snackbar message={snackbarMessage.message} type={snackbarMessage.type} />}
        <div className="home-icon">
          <Link to={"/"}>
            <img src={homeIcon} alt="Home" />
          </Link>
        </div>
        <div className="title">Inventory</div>
      </div>

      <div className="filter">
        <label htmlFor="date">Filter:</label>
        <select onChange={(e) => setFilterType(e.target.value)}>
          <option value="">--Select--</option>
          <option value="Today">Today</option>
          <option value="Yesterday">Yesterday</option>
          <option value="This Week">This Week</option>
          <option value="Last Week">Last Week</option>
          <option value="This Month">This Month</option>
          <option value="Last Month">Last Month</option>
          <option value="Custom">Custom</option>
        </select>
        {filterType === "Custom" && (
          <>
            <label>From:</label>
            <input type="date" onChange={(e) => setFromDate(e.target.value)} />
            <label>To:</label>
            <input type="date" onChange={(e) => setToDate(e.target.value)} />
          </>
        )}
      </div>

      <div className="table-container data-container">
        <table className="data-table">
          <thead style={{ position: "sticky" }}>
            <tr>
              <th>S.No</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Purchased</th>
              <th>Sold</th>
              <th>In Stock</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {inventoryItems.length > 0 ? (
              inventoryItems.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.itemName}</td>
                  <td>${item.price}</td>
                  <td>{item.purchased}</td>
                  <td>{item.sold}</td>
                  <td>{item.inStock}</td>
                  <td>
                    <FaEdit
                    className="bg-transparent"
                      title="Edit"
                      onClick={() => handleEdit(item)}
                      style={{
                        cursor: "pointer",
                        marginRight: "30px",
                      }}
                    />
                    <FaTrash
                    className="bg-transparent"
                      title="Delete"
                      onClick={() => handleDelete(item.id)}
                      style={{ cursor: "pointer", }}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr className="text-center">
                <td colSpan={7}>No Matching Items Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showEditPopup && selectedItem && (
        <div className="popup-overlay ">
          <div className="popup-box bg-white">
            <h2 className="bg-transparent">Edit Item</h2>
            <p className="bg-transparent">
              Editing <strong className="bg-transparent">{selectedItem.itemName}</strong>
            </p>

            <div className="edit-popup-fields bg-transparent">
              <label className="bg-transparent">
                Price:
                <input 
                className="bg-transparent"
                  type="number"
                  value={editedItem.price}
                  onChange={(e) =>
                    setEditedItem({ ...editedItem, price: e.target.value })
                  }
                />
              </label>

              <label className="bg-transparent">
                In Stock:
                <input
                className="bg-transparent"
                  type="number"
                  value={editedItem.inStock}
                  onChange={(e) =>
                    setEditedItem({
                      ...editedItem,
                      inStock: e.target.value,
                    })
                  }
                />
              </label>
            </div>

            <div className="popup-btn-group bg-transparent">
              <button className="cancel-btn" onClick={() => setShowEditPopup(false)}>
                Cancel
              </button>
              <button className="confirm-btn bg-transparent" onClick={handleEditSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeletePopup && selectedItem && (
        <div className="popup-overlay">
          <div className="popup-box bg-white">
            <h2 className="bg-transparent">Confirm Delete</h2>
            <p className="bg-transparent">
              Are you sure you want to delete{" "}
              <strong className="bg-transparent">{selectedItem.itemName}</strong>?
            </p>
            <div className="popup-btn-group bg-transparent">
              <button className="cancel-btn " onClick={() => setShowDeletePopup(false)}>
                Cancel
              </button>
              <button className="confirm-btn btn-danger" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
