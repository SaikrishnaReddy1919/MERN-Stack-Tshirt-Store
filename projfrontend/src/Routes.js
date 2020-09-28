import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from '../src/core/Home'
import Singin from './user/Signin'
import Singup from './user/Signup'
import AdminRoute from "./auth/helper/AdminRoutes"
import PrivateRoute from "./auth/helper/PrivateRoutes"
import UserDashBoard from "./user/UserDashBoard"
import AdminDashBoard from "./user/AdminDashBoard"
import AddCategory from "./admin/AddCategory"
import ManageCategories from './admin/ManageCategories'
import AddProduct from './admin/AddProduct'
import ManageProducts from './admin/ManageProducts'
import UpdateProduct from './admin/UpdateProduct'






export default function Routes() {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact component={Home}/>
                    <Route path='/signup' exact component={Singup} />
                    <Route path='/signin' exact component={Singin} />
                    <PrivateRoute path='/user/dashboard' exact component={UserDashBoard}/>
                    <AdminRoute path='/admin/dashboard' exact component={AdminDashBoard}/>
                    <AdminRoute path='/admin/create/category' exact component={AddCategory}/>
                    <AdminRoute path='/admin/categories' exact component={ManageCategories}/>
                    <AdminRoute path='/admin/create/product' exact component={AddProduct}/>
                    <AdminRoute path='/admin/products' exact component={ManageProducts}/>
                    <AdminRoute path='/admin/product/update/:productId' exact component={UpdateProduct}/>
                </Switch>
            </BrowserRouter>
        </div>
    )
}
