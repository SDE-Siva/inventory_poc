import "../../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../RequestItems/RequestItems.css";
import { Link } from "react-router-dom";
import { requestedItemsData } from "../../utilities/itemsData";
import { homeIcon } from "../../assets/images";
import { useState } from "react";

export const RequestItems = () => {
  const [requestedItems, setRequestedItems] = useState(requestedItemsData);
  const [requestedItemName, setRequestedItemName] = useState("");
  const [requestedQuantity, setRequestedQuantity] = useState(0);
  const [expectedDate, setExpectedDate] = useState();

  const resetRequests = () => setRequestedItems([]);
  const requestSubmission = () => setRequestedItems([]);

  return (
    <div className="req-container">
      <div className="header">
        <div className="home-icon">
          <Link to={"/"}>
            <img src={homeIcon} alt="Home" />
          </Link>
        </div>
        <div className="title">Item Request</div>
      </div>

      <div className="request-table data-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Expected Date</th>
            </tr>
          </thead>
          <tbody>
            {requestedItems.length > 0 ? (
              requestedItems.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.itemName}</td>
                  <td>{item.quantity}</td>
                  <td>{item.expectedDate}</td>
                </tr>
              ))
            ) : (
              <tr className=" text-center">
                <td colSpan={7} className=" text-center">
                  No Item Request
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="bottom-container">
        <div className="action-buttons">
          <button
            className="btn btn-lg btn-primary "
            onClick={() => resetRequests()}
          >
            Reset
          </button>
          <button
            className="btn btn-lg btn-primary"
            onClick={() => requestSubmission()}
          >
            Submit
          </button>
        </div>
        <div className="add-item">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <label htmlFor="itemName">Item Name:</label>
            <input
              type="text"
              id="itemName"
              value={requestedItemName}
              onChange={(e) => setRequestedItemName(e.target.value)}
              required
            />
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              value={requestedQuantity}
              onChange={(e) => setRequestedQuantity(e.target.value)}
              style={{ width: "130px" }}
              required
            />
            <label htmlFor="expectedDate">Expected Date:</label>
            <input
              type="date"
              id="expectedDate"
              value={expectedDate}
              onChange={(e) => setExpectedDate(e.target.value)}
              required
            />
            <button type="submit" className="add-button btn btn-primary mx-3">
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestItems;
