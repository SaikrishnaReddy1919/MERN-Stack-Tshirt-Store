import React, {useState, useEffect} from 'react'
import { Redirect } from 'react-router-dom';
import { addItemtoCart, removeItemFormCart } from './helper/CartHelper';
import ImageHelper from './helper/ImageHelper';

const Card = ({
    product,
    addtoCart = true,
    removeFromCart = false,
    setReload = f => f, reload=undefined
}) => {

    const [redirect, setRedirect] = useState(false)
    const [count, setCount] = useState(product.count)

    const cardTitle = product ? product.name : "A photo from pixels"
    const cardDescription = product ? product.description: "Description"
    const cardPrice = product ? product.price : "Price"


    const addToCart = () => {
        addItemtoCart(product, () => setRedirect(true))
    }
    const getRedirect = (redirect) => {
        if (redirect) {
            return <Redirect to = "/cart"/>
        }
    }



    const showAddtoCart = (addtoCart) => {
        return (
            addtoCart && (
                <button
                onClick={addToCart}
                className="btn btn-block btn-outline-success mt-2 mb-2"
            >
                Add to Cart
            </button>
            )
        )
    }
    const showRemoveFromCart = (removeFromCart) => {
        return (
            removeFromCart && (
                <button
                    onClick={() => {
                        removeItemFormCart(product._id)
                        setReload(!reload)
                        
                }}
                className="btn btn-block btn-outline-danger mt-2 mb-2"
            >
                Remove from cart
            </button>
            )
        )
    }

    return (
    <div className="card text-white bg-dark border border-info ">
        <div className="card-header lead">{cardTitle}</div>
            <div className="card-body">
                {getRedirect(redirect)}
                <ImageHelper product={product}/>
        <p className="lead bg-success font-weight-normal text-wrap">
            {cardDescription}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">$ {cardPrice}</p>
        <div className="row">
            <div className="col-12">
            {showAddtoCart(addtoCart)}
            </div>
            <div className="col-12">
            {showRemoveFromCart(removeFromCart)}
            </div>
        </div>
        </div>
    </div>
    );
};


export default Card