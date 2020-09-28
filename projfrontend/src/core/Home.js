import React from 'react'
import '../../src/styles.css'
import { API } from './backend'
import Base from './Base'

export default function Home() {
    console.log("API is", API)
    return (
        <Base title="Home Page" description='Welcome to T-Shirt store'>
            <div className="row">
                <div className="col-4">
                    <button className="btn btn-success">TEST</button>
                </div>
                <div className="col-4">
                    <button className="btn btn-success">TEST</button>
                </div>
                <div className="col-4">
                    <button className="btn btn-success">TEST</button>
                </div>
            </div>
        </Base>
    )
}
