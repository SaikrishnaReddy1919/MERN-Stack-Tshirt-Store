import React from 'react'
import { Link, withRouter} from 'react-router-dom'
import { isAuthenticated, Signout } from '../auth/helper'


const currentTab = (history, path) => {
    if(history.location.pathname === path){
        return {color:"#2ecc72"}
    }else{
        return {color : '#FFFFFF'}
    }
}

const Menu = ({ history }) => (
    <div>
        <ul className="nav nav-tabs bg-dark">
            <li className="nav-item">
                <Link style={currentTab(history, '/')} className="nav-link" to='/'>Home</Link>
            </li>
            <li className="nav-item">
                <Link style={currentTab(history, '/cart')} className="nav-link" to='/cart'>Cart</Link>
            </li>
            {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <li className="nav-item">
                    <Link style={currentTab(history, '/user/dashboard')} className="nav-link" to='/user/dashboard'>User-DashBoard</Link>
                </li>
            )}
            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li className="nav-item">
                    <Link style={currentTab(history, '/admin/dashboard')} className="nav-link" to='/admin/dashboard'>Admin-DashBoard</Link>
                </li>
            )}
            {!isAuthenticated() && (
                <React.Fragment>
                    <li className="nav-item">
                        <Link style={currentTab(history, '/signup')} className="nav-link" to='/signup'>SignUp</Link>
                    </li>
                    <li className="nav-item">
                        <Link style={currentTab(history, '/signin')} className="nav-link" to='/signin'>SignIn</Link>
                    </li>
                </React.Fragment>
            )}
            {isAuthenticated() && (
                <li className="nav-item">
                    <span
                        style={{cursor : "pointer"}}
                        className="nav-link text-warning"
                        onClick={() => {
                            Signout(() => 
                                (
                                    history.push("/")
                                )
                            )
                        }
                            
                        }
                    
                    >
                        Signout
                    </span>
                </li>
                
            )}
        </ul>
    </div>
)

export default withRouter(Menu)
