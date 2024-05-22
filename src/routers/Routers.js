import {Route, Routes} from "react-router-dom";
import FormProduct from "../pages/product/FormProduct";
import Login from "../pages/login/Login";
import FormEditProduct from "../pages/product/FormEditProduct";
import Logout from "../pages/login/Logout";
import Register from "../pages/login/Register";
import Location from "../pages/location/Location";
import FormSupplier from "../pages/supplier/FormSupplier";
import EditSupplier from "../pages/supplier/EditSupplier";
import FormSale from "../pages/sale/FormSale";
import FormCart from "../pages/sale/FormCart";
import FormUsers from "../pages/users/FormUsers";
import FormOverView from "../pages/overview/FormOverView";
import FormCustomer from "../pages/customer/FormCustomer";
import FormEmployee from "../pages/employee/FormEmployee";


function MyRouters() {
    return (
        <Routes>
            <Route path="/product" element={<FormProduct/>}/>
            <Route path="/" element={<Login/>}/>
            <Route path="/edit/:id" element={<FormEditProduct/>}/>
            <Route path="/logout" element={<Logout/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/location/list" element={<Location/>}/>
            <Route path="/supplier" element={<FormSupplier/>}/>
            <Route path="/supplier/edit/:id" element={<EditSupplier/>}/>
            <Route path="/sale" element={<FormSale/>}/>
            <Route path="/cart" element={<FormCart/>}/>
            <Route path="/DashBoard" element={<FormOverView/>}/>
            <Route path="/customer" element={<FormCustomer/>}/>
            <Route path="/employee" element={<FormEmployee/>}/>
        </Routes>
    )
}

export default MyRouters