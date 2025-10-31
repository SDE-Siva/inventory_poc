import React from 'react'
import { Link } from 'react-router-dom'
import './Menu.css'

const Menu = () => {
  return (
    <div className="menu">
        <div className="d-flex justify-content-center my-3">
          <h2>Main Menu</h2>
        </div>
        <div className="menu-container  ">
          <div className="row-1 ">
            <Link className="Links" to="/billing">
              Billing
            </Link>
            <Link className="Links" to="/inventory">
              Inventory
            </Link>
          </div>
          <div className="row-2 ">
            <Link className="Links" to="/salesReport">
              Sales Report
            </Link>
                        <Link className="Links" to="/requestItems">
              Item Request
            </Link>
        </div>
      </div>
    </div>
  )
}

export default Menu