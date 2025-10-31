import ItemTiles from "./ItemTiles";
import "../../Billing/ItemsMenu/ItemsMenu.css";
import ItemScrollBar from "../ItemsScrollBar/ItemScrollBar";
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";
import { decreaseStock, fetchItems } from "../../../slice/inventorySlice";
import { addOrUpdateItemToBill } from "../../../slice/billingItemSlice";

const ItemsMenu = () => {
  const dispatch = useDispatch();
  const dataOfItems = useSelector((state) => state.inventory.items);

  useEffect(() => {
   dispatch(fetchItems());
  },[])

  const handleItemClick = (item) => {
    dispatch(addOrUpdateItemToBill({...item, quantity: 1}));
    dispatch(decreaseStock(item.itemNumber));
  }

  return (
    <div className="billing-right-container d-flex flex-column p-0">
      <div className="row g-0 top-section flex-grow-1">
        <div className="col-3 col-md-2 p-0 h-auto border-end border-2 border-white">
          <ItemScrollBar />
        </div>
        <div className="col-9 col-md-10 p-0 h-auto ">
          <div className="image-menu ">
            {dataOfItems.map((item) => (
              <ItemTiles
                item={item}
                key={item.itemNumber}
                onClick={() => item.inStock > 0 && handleItemClick(item)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemsMenu;
