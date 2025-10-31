import BillDetails from './BillDetails/BillDetails'
import "bootstrap/dist/css/bootstrap.min.css";
import "../Billing/Billing.css";
import ItemsMenu from './ItemsMenu/ItemsMenu';
import BillingButtons from './BillingButtons/BillingButtons';
import { useState } from 'react';

export const Billing = () => {
  const [orderUsingClick, setOrderUsingClick] = useState("");
  const [cancelItem, setCancelItem] = useState(true);
  const [addItem, setAddItem] = useState("");
  const [billMenu, setBillMenu] = useState("billMenuBlocked");
  const [tenderAmount, setTenderAmount] = useState(0);
  const [newBill, setNewBill] = useState(false);
  return (
  <div className="billing-container container-fluid p-0">
      <div className="row g-0"> 
          <div className="col-12 col-lg-5 p-0 left-container mb-5 mb-lg-0 mb-md-0">
            <BillDetails addItem={addItem} setAddItem={setAddItem} 
            orderUsingClick={orderUsingClick} 
            setOrderUsingClick={setOrderUsingClick}
             cancelItem={cancelItem} setCancelItem={setCancelItem} 
             billMenu={billMenu} setBillMenu={setBillMenu}
              tenderAmount={tenderAmount} 
              setTenderAmount={setTenderAmount} 
              newBill={newBill}
               setNewBill={setNewBill} />
          </div>
          <div className="right-container col-12 col-lg-7 p-0 mt-3 mt-lg-0 mt-md-0 border-start border-2 border-white border-top border-2 border-white">
            <div className=' bg-danger p-0' style={{height: '70vh'}}>
              <ItemsMenu/>
            </div>
            <div className=' billing-buttons-wrapper bg-info border-top border-2 border-white' style={{height: '30vh'}}>
              <BillingButtons/>
            </div>
          </div>
      </div>
</div>
  );
};
export default Billing;
