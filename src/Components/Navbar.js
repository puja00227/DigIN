import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useCart } from './ContextReducer';
import Modal from '../Screens/Modal';
import Cart from '../Screens/Cart';
import { useSnackbar } from 'notistack';
import { useDispatch } from './ContextReducer';


export default function Navbar() {
    const { enqueueSnackbar } = useSnackbar()
    const [cartView, setCartView] = useState(false)
    const navigate = useNavigate();
    let dispatch = useDispatch();

    const handleSignOut = () => {
        localStorage.removeItem("authToken")
        dispatch({ type: "DROP" });
        enqueueSnackbar("You Signed Out Successfully", { variant: 'success' })
        navigate("/")
    }

    const items = useCart();
    const loadCart = () => {
        setCartView(true)
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-info">
                <div className="container-fluid">
                    <Link className="link-secondary text-light text-decoration-none fs-2 fst-italic mx-2 py-0" to="/">DigIN</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item  my-1" >
                                <Link className="link-secondary text-light text-decoration-none fs-5 mx-2" aria-current="page" to="/home" >Home</Link>
                            </li>
                            {(localStorage.getItem("authToken")) ? (
                                <li className="nav-item  my-1" >
                                    <Link className="link-secondary text-light text-decoration-none fs-5 mx-2" aria-current="page" to="/myorder" >My orders</Link>
                                </li>
                            ) : (""
                            )}
                        </ul>

                        {(!localStorage.getItem("authToken")) ? (
                            <div className="d-flex my-1">
                                <Link type="button" className="btn btn-light btn-outline-primary mx-2" to="/signin">Sign In</Link>
                                <Link type="button" className="btn btn-light btn-outline-primary mx-2" to="/signup">Sign Up</Link>
                            </div>
                        ) : (
                            <div className="d-flex my-1">
                                <div type="button" className="btn btn-light btn-outline-primary mx-2" onClick={loadCart}>
                                    <Badge badgeContent={items.length} overlap="rectangular">
                                        <ShoppingCartIcon />
                                    </Badge>
                                    {" Cart"}
                                </div>
                                {cartView ? <Modal onClose={() => setCartView(false)}> <Cart /> </Modal> : ""}
                                <div type="button" className="btn btn-light mx-2 btn-outline-danger" onClick={handleSignOut}>Sign Out</div>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    )
}
