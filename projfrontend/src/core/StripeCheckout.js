import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import { cartEmpty, loadCart } from './helper/CartHelper'
import StripeCheckoutComponent from 'react-stripe-checkout'
import { API } from './backend'
import {createOrder} from "./helper/OrderHelper"



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
        // console.log(products)
        products.map((product) => {
            amount = amount + product.price
        })
        return amount
        
    }

    const makePayment = (token) => {
        const body = {
            token,
            products
        }
        const headers = {
            "Content-Type":"application/json"
        }
        return fetch(`${API}stripepayment`, {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        }).then(res => {
            // console.log(res)
            const { status } = res
            console.log("STATUS", status)
        }).catch(err => console.log(err))
    }

    const showStripeButton = () => {
        return isAuthenticated() ? (
            <StripeCheckoutComponent
                stripeKey="pk_test_51HWNyMFuNk3TIbYNlLYiO1jNqgbHKIs2bkIu5BRlhX8FpHHB5Q1PlYv2vKVwQdcjCmXyu4lCtaKC6Y1yvIAHkXGs0036b5GM9P"
                token={makePayment}
                amount={getFinalPrice() * 100}
                name="Buy T-shirt"
                shippingAddress
                billindAddress
            >
                <button className="btn btn-success">Pay with stripe</button>
            </StripeCheckoutComponent>
            
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
