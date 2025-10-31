import React, { useRef } from "react";
import "./ItemScrollBar.css";
import { upIcon, downIcon } from "../../../assets/images";
import { useSelector,useDispatch } from "react-redux";
import { addOrUpdateItemToBill } from "../../../slice/billingItemSlice";
import { decreaseStock } from "../../../slice/inventorySlice";

export const ItemScrollBar = ({  }) => {
  const dispatch = useDispatch();
  const itemData = useSelector((state) => state.inventory.items);
  const scrollRef = useRef(null);

  const scrollUp = () => {
    scrollRef.current.scrollBy({
      top: -60,
      behavior: "smooth",
    });
  };

  const scrollDown = () => {
    scrollRef.current.scrollBy({
      top: 60,
      behavior: "smooth",
    });
  };

  const handleItemClick = (item) => {
    dispatch(addOrUpdateItemToBill({...item, quantity: 1}));
    dispatch(decreaseStock(item.itemNumber));
  }
  return (
    <div className="menu-wrapper">
      <div className="scroll-button up" onClick={scrollUp}>
        <img src={upIcon} alt="" />
      </div>
      <div className="scroll-container" ref={scrollRef}>
        {itemData.map((item, index) => (
          
          <div
            className="item-box"
            key={index}
            onClick={() => item.inStock > 0 && handleItemClick(item)}
            
          >
            {item.itemName}
          </div>
          
        ))}
      </div>
      <div className="scroll-button down" onClick={scrollDown}>
        <img src={downIcon} alt="" />
      </div>
    </div>
  );
};

export default ItemScrollBar;
