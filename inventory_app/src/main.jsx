import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider } from 'react-router-dom'
import Inventory from './components/Inventory/Inventory.jsx'
import Billing from './components/Billing/Billing.jsx'
import RequestItems from './components/RequestItems/RequestItems.jsx'
import SalesReport from './components/SalesReport/SalesReport.jsx'
import store from './store/store.js'
import { Provider } from 'react-redux'


const router = createBrowserRouter([
  {
    path:'/',
    element: <App/>
  },
  {
    path:'/inventory',
    element: <Inventory/>
  },
  {
    path: '/billing',
    element: <Billing/>
  },
  {
    path: '/requestItems',
    element: <RequestItems/>
  },
  {
    path:'/salesReport',
    element: <SalesReport/>
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
)
