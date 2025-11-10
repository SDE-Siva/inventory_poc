import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import './BillDetails.css'
import { useDispatch, useSelector } from "react-redux";
import { addOrUpdateItemToBill, decreaseOrRemoveItemFromBill,} from "../../../slice/billingItemSlice";

export const BillDetails = ({
  newBill,
}) => {

  const dispatch = useDispatch();
  const { itemsForBill, totalBillAmount,  billingTable ,itemsTable, tenderAmount, gstAmount,changeAmount} = useSelector((state) => state.billingItem);
  const { items } = useSelector((state) => state.inventory);
  const [itemNumberInput, setItemNumberInput] = useState("");
  const [itemQuantityInput, setItemQuantityInput] = useState("");
  const [changeAfterTender, setChangeAfterTender] = useState(0);
  const [totalGST, setTotalGST] = useState(0);
  const [activeInput, setActiveInput] = useState("");



  // Handle numeric keypad input
  const handleButtonClick = (value) => {
    if (!activeInput) return;
    if (activeInput === "itemNumber") {
      setItemNumberInput((prev) => prev + value);
    } else if (activeInput === "itemQuantity") {
      setItemQuantityInput((prev) => prev + value);
    }
  };

  // Handle Clear (delete last digit)
  const handleClear = () => {
    if (activeInput === "itemNumber") {
      setItemNumberInput((prev) => prev.slice(0, -1));
    } else if (activeInput === "itemQuantity") {
      setItemQuantityInput((prev) => prev.slice(0, -1));
    }
  };

  const handleAC = () => {
    setItemNumberInput("");
    setItemQuantityInput("");
  };


  const handleAddItem = () => {
    console.log("Adding item:", itemNumberInput, "Quantity:", itemQuantityInput);

    const trimmedNum = itemNumberInput.trim();
    const quantity = parseInt(itemQuantityInput) || 0;

    if (!trimmedNum.startsWith("#")) {
      alert("Item number must start with # (e.g., #0001)");
      return;
    }

    if (quantity <= 0) {
      alert("Enter valid quantity");
      return;
    }

    const foundItem = items.find((i) => i.itemNumber === trimmedNum);

    if (!foundItem) {
      alert(`Item not found for ${trimmedNum}`);
      return;
    }

    if (foundItem.inStock <= 0) {
      alert(`${foundItem.itemName} is out of stock`);
      return;
    }

    if (quantity > foundItem.inStock) {
      alert(`Only ${foundItem.inStock} in stock`);
      return;
    }

    const itemWithQuantity = { ...foundItem, quantity };
    dispatch(addOrUpdateItemToBill(itemWithQuantity));

    handleAC();
  };

  const handleRemoveItem = () => {
  if (!itemNumberInput) {
    alert("Enter an item number to remove");
    return;
  }

  const quantity = parseInt(itemQuantityInput) || 1;

  const formattedItemNumber = itemNumberInput.startsWith("#")
    ? itemNumberInput
    : `#${itemNumberInput.padStart(4, "0")}`;

  dispatch(
    decreaseOrRemoveItemFromBill({
      itemNumber: formattedItemNumber,
      quantityToRemove: quantity, 
    })
  );

  handleAC();
  };


  return (
    <div className="left-layout flex-container container-fluid ">
      <div className="main-content-container">
        <div className="Top-section">
          <div className="total-price">
            {itemsTable != "addItemBlocked"
              ? `Total price: $${totalBillAmount.toFixed(2)}`
              : `Change: $${changeAmount.toFixed(2)}`}
          </div>
          <div className="left-table-container">
            <table className={`price-table table table-borderless ${itemsTable}`}>
              <thead className="bg-transparent" style={{ position: "sticky" }}>
                <tr>
                  <th>No</th>
                  <th>Item Name</th>
                  <th className="right-align">Quantity</th>
                  <th className="right-align">Unit Price</th>
                  <th className="right-align">Total Price</th>
                </tr>
              </thead>
              <tbody>
                {itemsForBill.map((item) => (
                  <tr key={item.itemNumber}>
                    <td>{item.itemNumber}</td>
                    <td>{item.itemName}</td>
                    <td className="right-align">{item.quantity}</td>
                    <td className="right-align">${item.price}</td>
                    <td className="right-align">
                      ${(item.quantity * item.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={`bill-container ${billingTable}`}>
              <div className="bill-rows">
                <div className="text">Amount</div>
                <div>
                  $
                  {totalBillAmount.toFixed(2)} 
                </div>
              </div>
              <div className="bill-rows">
                <div className="text">GST Amount</div>
                <div>${gstAmount.toFixed(2)}</div>
              </div>
              <div className="line"></div>
              <div className="bill-rows payable">
                <div className="text " style={{ fontWeight: "bolds" }}>
                  Payable
                </div>
                <div>
                  $
                  {totalBillAmount >= 0
                    ? (gstAmount + totalBillAmount).toFixed(2) 
                    : 0}
                </div>
              </div>
              <div className="line"></div>

              <div className="bill-rows blue">
                <div className="text">Tender</div>
                <div>${tenderAmount.toFixed(2)}</div>
              </div>
              <div className="bill-rows blue">
                <div className="text">Change</div>
                <div>${changeAmount.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>
      <div className="bottom-section mb-md-0 mb-4">
        <div className="container-fluid">
          <div className="row g-2 align-items-end">
            {/* Item Number */}
            <div className="col-12 col-sm-4 col-md-4 col-lg-4 item-number">
              <label htmlFor="itemNumber" className="form-label">Item Number</label>
              <input
                type="text"
                id="itemNumber"
                className="form-control"
                value={itemNumberInput}
                onChange={(e) => setItemNumberInput(e.target.value)}
                onFocus={() => setActiveInput("itemNumber")}
              />
            </div>

            {/* Quantity */}
            <div className="col-12 col-sm-4 col-md-4 col-lg-4 quantity">
              <label htmlFor="quantity" className="form-label">Quantity</label>
              <input
                type="number"
                id="quantity"
                className="form-control"
                value={itemQuantityInput}
                onChange={(e) => setItemQuantityInput(e.target.value)}
                onFocus={() => setActiveInput("itemQuantity")}
              />
            </div>

            {/* Buttons */}
            <div className="col-12 col-sm-4 col-lg-4 col-md-4 d-flex gap-2">
              <button
                className="btn btn-primary flex-fill"
                style={{ height: "37px", border: "1px solid black" }}
                onClick={itemsTable == "addItemOpened" ? handleAddItem: null}
              >
                Add
              </button>
              <button
                className="btn btn-danger flex-fill"
                style={{ height: "37px", border: "1px solid black" }}
                onClick={itemsTable == "addItemOpened" ? handleRemoveItem: null}
              >
                Remove
              </button>
            </div>

          </div>
        </div>
      </div>
      </div>
      <div className="input-buttons" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", width: "100%" }}>
        <div className="left-buttons">
          <button className="btn btn-lg btn-primary">Language</button>
          <div className="left-input-buttons">
            <label htmlFor="TableNo">Table No</label>
            <input type="number" id="TableNo" />
          </div>
          <div className="left-input-buttons">
            <label htmlFor="NoOfCover">No of Cover</label>
            <input type="number" id="NoOfCover" />
          </div>
        </div>
        <div className="numeric-buttons ">
          {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((num, index) => (
            <button
              className="btn btn-lg btn-primary buttons"
              key={index}
              onClick={() => handleButtonClick(num.toString())}
            >
              {num}
            </button>
          ))}
          <button className="btn btn-lg btn-primary buttons" onClick={() => handleButtonClick(".")}>.</button>
          <button className="btn btn-lg btn-primary buttons" onClick={handleClear}>_</button>
        </div>
        <div className="clear-buttons">
          <button
            className="btn btn-lg btn-primary"
            onClick={handleAC}
          >
            AC
          </button>
          <button
            className="btn btn-lg btn-primary"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillDetails;
