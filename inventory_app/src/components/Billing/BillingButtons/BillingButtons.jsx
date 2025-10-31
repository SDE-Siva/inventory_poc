import "./BillingButtons.css";
import { arrowIcon } from "../../../assets/images";
import { Link } from "react-router-dom";

const BillingButtons = ({
  setCancelItem,
  setAddItem,
  setTenderAmount,
  setNewBill,
}) => {
  return (
    <div className="billing-buttons">
      <button onClick={() => setNewBill((prev) => !prev)}>New Bill</button>
      <button>Price Amendment</button>
      <button onClick={() => setTenderAmount(2)}>$2</button>
      <button onClick={() => setTenderAmount(10)}>$10</button>
      <button className="green">Open Cash Box</button>
      <button className="green">Terminate Transaction</button>
      <button className="green">Goods Return</button>
      <button className="green">Print</button>
      <button className="green">Cancel Item</button>
      <button className="green">Add Item</button>
      <button
        onClick={() => {
          setAddItem("addItemBlocked");
        }}

      >
        <span className="arrow-icon" >
          <img src={arrowIcon} alt="" />
        </span>
        Bill
      </button>
      <button onClick={() => setTenderAmount(5)}>$5</button>
      <button onClick={() => setTenderAmount(50)}>$50</button>
      <button>Gift Voucher</button>
      <button className="green">Reserved Transaction</button>
      <button className="green">Restore</button>
      <button className="green">Delete All Transaction</button>
      <Link to="/" className="links">
        <button className="green">Main Menu</button>
      </Link>
    </div>
  );
};

export default BillingButtons;
