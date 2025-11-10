import "./BillingButtons.css";
import { arrowIcon } from "../../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import { updateBillingMenu, updateItemsMenu, addTenderAmount,removeLastItemFromBill} from "../../../slice/billingItemSlice";
import { reduceStockAfterBilling } from "../../../api/inventoryService";
import { useState } from "react";
import { Link } from "react-router-dom";
import { fetchItems } from "../../../slice/inventorySlice";
const BillingButtons = ({
}) => {
  
  const dispatch = useDispatch();
  const itemsForBill = useSelector((state) => state.billingItem.itemsForBill);
  const inventoryItems = useSelector((state) => state.inventory.items)
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleBillMenu = () => {
    setShowConfirmPopup(true); 
  };

  const handleItemMenu = () =>{
    dispatch(updateItemsMenu("addItemOpened"));
    dispatch(updateBillingMenu("billMenuBlocked"));
  }
  const handleTenderAmount = (amount) => {
    dispatch(addTenderAmount(amount));
  }
  
  const removeLastAddedItem = () => dispatch(removeLastItemFromBill());
  const handleNewBill = async () => {
    console.log(inventoryItems)
    await reduceStockAfterBilling(itemsForBill);
    dispatch(fetchItems());
    console.log(inventoryItems)
  }

  const confirmBill = async () => {
    dispatch(updateBillingMenu("billMenuOpened"));
    dispatch(updateItemsMenu("addItemBlocked"));

    setShowConfirmPopup(false);
    setShowSnackbar(true);
    setTimeout(() => setShowSnackbar(false), 2000);
  };

  const cancelBill = () => {
    setShowConfirmPopup(false);
  };

  return (
    <div className="billing-buttons">
      {showSnackbar && (
        <div className="snackbar">Bill Confirmed Successfully</div>
      )}
      {showConfirmPopup && (
        <div className="popup-overlay">
          <div className="popup-box bg-white ">
            <h2 className="bg-body">Confirm Bill</h2>
            <p className="bg-body">Are you sure you want to confirm this bill?</p>
            <div className="popup-btn-group bg-body">
              <button className="cancel-btn " onClick={cancelBill}>
                Cancel
              </button>
              <button className="confirm-btn" onClick={confirmBill}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <button onClick={() => {
        handleNewBill()
        handleItemMenu()
      }}>New Bill</button>
      <div className="buttons-group">
        <button>Price Amendment</button>
        <button className="green">Open Cash Box</button>
      </div>
      <div className="buttons-group">
        <button className="green">Terminate Transaction</button>
        <button className="green">Goods Return</button>
      </div>
      <div className="buttons-group">
      <button className="green">Reserved Transaction</button>
      <button className="green">Restore</button>
      </div>
      <button onClick={() =>  handleTenderAmount(2)}>$2</button>
      <button onClick={() => handleTenderAmount(10)}>$10</button>
      <button className="green">Print</button>
      <button className="green" onClick={removeLastAddedItem}>Cancel Item</button>
      <button className="green" onClick={handleItemMenu}>Add Item</button>
      <button className="button"  onClick={handleBillMenu}
      >
        <span className="arrow-icon"onClick={handleBillMenu}  >
          <img src={arrowIcon} alt="" />
        </span>
        Bill
      </button>
      <button onClick={() => handleTenderAmount(5)}>$5</button>
      <button onClick={() => handleTenderAmount(50)}>$50</button>

      <Link to="/" className="links">
        <button className="green">Main Menu</button>
      </Link>
    </div>
  );
};

export default BillingButtons;
