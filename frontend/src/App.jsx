import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage.jsx";
import Contacts from "./pages/Contacts.jsx";
import PaymentAndDelivery from "./pages/PaymentAndDelivery.jsx";
import Service from "./pages/Service.jsx";
import ProductByID from "./pages/ProductByID.jsx";
import OrderTheItemByID from "./pages/OrderTheItemByID.jsx";
import SuccessOrder from "./pages/SuccessOrder.jsx";
import Admin from "./pages/AdminPages/Admin.jsx";
import AdminProducts from "./elements/AdminComponents/AdminProducts.jsx";
import AdminItems from "./pages/AdminPages/AdminItems.jsx";
import AdminItemRedact from "./pages/AdminPages/AdminItemRedact.jsx";
import AdminProductRedact from "./pages/AdminPages/AdminProductRedact.jsx";
import AdminAddProduct from "./pages/AdminPages/AdminAddProduct.jsx";
import AdminAddItem from "./pages/AdminPages/AdminAddItem.jsx";
import CheckIfAdmin from "./CheckIfAdmin.jsx";

function App() {

  return (
     <BrowserRouter>
         <Routes>
             <Route path={"/"} element={<MainPage/>} />
             <Route path={"/paymentAndDelivery"} element={<PaymentAndDelivery/>} />
             <Route path={"/service"} element={<Service/>}/>
             <Route path={"/contacts"} element={<Contacts/>} />
             <Route path={"/product/:type"} element={<ProductByID/>} />
             <Route path={"/order/item/:id"} element={<OrderTheItemByID />} />
             <Route path={"/order/success/:name"} element={<SuccessOrder/>}/>
             <Route path={"/admin"} element={<CheckIfAdmin><Admin/></CheckIfAdmin>} />
             <Route path={"/admin/product/:type"} element={<CheckIfAdmin><AdminItems/></CheckIfAdmin>}/>
             <Route path={"/admin/redact/item/:id"} element={<CheckIfAdmin><AdminItemRedact/></CheckIfAdmin>} />
             <Route path={"/admin/redact/product/:id"} element={<CheckIfAdmin><AdminProductRedact/></CheckIfAdmin>}/>
             <Route path={"/admin/add/product"} element={<CheckIfAdmin><AdminAddProduct/></CheckIfAdmin>} />
             <Route path={"/admin/add/item"} element={<CheckIfAdmin><AdminAddItem/></CheckIfAdmin>} />
         </Routes>
     </BrowserRouter>
  )
}

export default App
