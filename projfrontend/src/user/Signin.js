import React, { useState } from 'react'
import Base from '../core/Base'
import { Link, Redirect } from 'react-router-dom'

import { Signin, authenticate, isAuthenticated } from '../auth/helper'


const Singin = () => {

    const [values, setValues] = useState({
        email: "krishna@gmail.com",
        password: "krishna",
        error: "",
        loading: "",
        didRedirect: false
    })

    const { email, password, error, loading, didRedirect } = values
    
    const { user } = isAuthenticated()
    
    const handleChange = name => event => {
        setValues({...values, error : false, [name]: event.target.value})
    }

    const onSubmit = event => {
        event.preventDefault()
        setValues({ ...values, error: false, loading: true })
        Signin({ email, password })
            .then(data => {
                if (data.errors) {
                    setValues({ ...values, error: data.errors, loading: false })
                    console.log(data.errors)
                } else {
                    authenticate(data, () => {
                        setValues({
                            ...values,
                            didRedirect: true
                        })
                    })
                } 
            })
            .catch(console.log("Sign request failed"))
        
    }

    const performRedirect = () => {
        if (didRedirect) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />
            } else {
                return <Redirect to="/user/dashboard" />
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />
        }
    }

    const loadingMessage = () => {
        return (
            loading && (
                <div className="alert alert-info">
                    <h2>Loading...</h2>
                </div>
            )
        )
    }

    const errorMessage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-danger"
                        style={{ display: error ? "" : "none" }}>
                            {error}
                    </div>
                </div>
            </div>

        )
    }

    const signInForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form action="">
                        <div className="form-group">
                            <label className="text-light">Email</label>
                            <input className='form-control' type="text" value={email} onChange={handleChange("email")}/>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input className='form-control' type="password" value={password} onChange={handleChange("password")}/>
                        </div>
                        <button onClick={onSubmit} className="btn btn-success btn-block">Submit</button>
                    </form>
                </div>
            </div>
        )
    }


    return (
        <Base
            title="Sign in page"
            description="A page for user to sign in!"
        >
            {loadingMessage()}
            {errorMessage()}
            {signInForm()}
            {performRedirect()}
            <p className="text-white text-center">{JSON.stringify(values)}</p>
        </Base>
    )
}

export default Singin