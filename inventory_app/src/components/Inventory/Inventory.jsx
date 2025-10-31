import "../../App.css";
import { Link } from "react-router-dom";
import { itemsData } from "../../utilities/itemsData";
import { homeIcon } from "../../assets/images";
import { useState, useEffect } from "react";
import { useSelector ,useDispatch} from "react-redux";
import { fetchItems } from "../../slice/inventorySlice";

export const Inventory = () => {
  const itemsData = useSelector((state) => state.inventory.items)
  const dispatch = useDispatch();
  const [filterType, setFilterType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [inventoryItems, setInventoryItems] = useState(itemsData);


  useEffect(() => {
    dispatch(fetchItems())
    console.log("Fetched Items for Inventory");
  },[])

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

    const result = itemsData.filter((item) => {
      return item.purchaseDate >= from && item.purchaseDate <= to;
    });

    setInventoryItems(result);
  }, [filterType, fromDate, toDate]);

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  return (
    <div>
      <div className="header">
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
        {filterType === "Custom" ? (
          <>
            <label>From:</label>
            <input
              type={"date"}
              onChange={(e) => setFromDate(e.target.value)}
            />
            <label>To:</label>
            <input type={"date"} onChange={(e) => setToDate(e.target.value)} />
          </>
        ) : (
          ""
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
                </tr>
              ))
            ) : (
              <tr className=" text-center">
                <td colSpan={7} className=" text-center">
                  No Matching Items Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;
