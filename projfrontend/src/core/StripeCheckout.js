import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import { cartEmpty, loadCart } from './helper/CartHelper'



const StripeCheckout = ({ products, setReload = f => f, reload = undefined }) => {
    
    const [data, setData] = useState({
        loading: false,
        success: false,
        error: "",
        address : ""
    })

    const token = isAuthenticated() && isAuthenticated().token
    const userId = isAuthenticated() && isAuthenticated().user._id

    const getFinalPrice = () => {
        let amount = 0
        products.map((product) => {
            amount = amount + product.price
        })
        return amount
        
    }

    const showStripeButton = () => {
        return isAuthenticated() ? (
            <button className="btn btn-success">Pay with stripe</button>
        ) : (<Link to='/signin'>
                <button className="btn btn-warning">Signin</button>
            </Link>) 
    }


    return (
        <div>
            <h3 className="text-white">
                Stripe check out component.{getFinalPrice()}
            </h3>
            {showStripeButton()}
        </div>
    )
}


export default StripeCheckout
