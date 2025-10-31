import "../../Billing/ItemsMenu/ItemTiles.css";

const ItemTiles = ({ item ,onClick}) => {
  
  return (
    <div className="item-tile-container" onClick={onClick}>
      <div className="item-number-badge">{item.itemNumber}</div>
      <img src={item.imageURL} alt={item.itemName} className="item-image" />
      <div className="english-name">{item.itemName}</div>
      <div className="other-name">{item.chineseName}</div>
      {!item.inStock && <div className="sold-out-overlay">Sold Out</div>}
    </div>
  );
};

export default ItemTiles;
