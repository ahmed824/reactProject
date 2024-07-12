import React, { useContext } from 'react'
import Logo from "../../images/freshcart-logo.svg"
import { NavLink } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'

export default function Navbar({ userData }) {
    const { count, numOfCartItems } = useContext(StoreContext)
    const handleLogout = () => {
        localStorage.removeItem('token'); 
    };
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-main-light ">
                <div className="container">
                    <NavLink className="navbar-brand" to="/">
                        <img src={Logo} alt="" />
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {userData !== null ? <ul className="navbar-nav ms-5 mb-2 mb-lg-0">

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">Home</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/products">Products</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">Categories</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className="nav-link" to="/">Brands</NavLink>
                            </li>

                        </ul> : null}


                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 my-2">

                            <NavLink to='/cart' type="button" className="btn border-0 me-3 position-relative">
                                Cart <i className="fa-solid fa-cart-shopping" />
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success" >
                                    {count}
                                    <span className="visually-hidden">unread messages</span>
                                </span>
                            </NavLink>

                            {userData === null ? <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/register">Register</NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/login">Login</NavLink>
                                </li>
                            </> : <li className="nav-item">
                                <NavLink className="nav-link" to="/login" onClick={handleLogout}>Logout</NavLink>
                            </li>}




                        </ul>

                    </div>
                </div>
            </nav>

        </>
    )
}
