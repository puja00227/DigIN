import React, { useRef, useState, useEffect } from 'react';
import { useCart, useDispatch } from './ContextReducer';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom'


export default function Card(props) {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar()
    let options = props.options;
    let priceOptions = Object.keys(options)

    const [qty, setQty] = useState(1)
    const [size, setSize] = useState("")
    const dispatch = useDispatch();
    const data = useCart();
    const priceRef = useRef();

    const handleAddToCart = async () => {
        const existingItem = data.find(item => item.id === props.foodItem._id && item.size === size);
        if (!localStorage.getItem("authToken")) {
            enqueueSnackbar('Please Sign In First.', { variant: 'error' });
            navigate("/signin")
        } else {
            if (existingItem) {
                await dispatch({ type: 'UPDATE', id: existingItem.id, price: finalPrice, qty: qty, size });
            } else {
                await dispatch({
                    type: 'ADD',
                    id: props.foodItem._id,
                    name: props.foodItem.name,
                    price: finalPrice,
                    qty,
                    size,
                    img: props.foodItem.img,
                });
            }
            enqueueSnackbar('Added to Cart.', { variant: 'success' });
        }
    };

    let finalPrice = qty * parseInt(options[size])
    useEffect(() => {
        setSize(priceRef.current.value);
    }, []);

    return (
        <div>
            <div className="card m-3 container-fluid p-0" style={{ "width": "18rem" }}>
                <img src={props.foodItem.img} id="cardimage" className="card-img-top " alt="..." style={{ height: "360px", objectFit: "cover" }} />
                {/* <img src="https://source.unsplash.com/random/300x200/?pizza" id="cardimage" className="card-img-top " alt="..." /> */}
                <div className="card-body">
                    <h5 className="card-title"> {props.foodItem.name} </h5>
                    <p className="card-text" style={{ "marginBottom": "3px", "fontSize": "12px", "textAlign": "justify" }} > {props.foodItem.description} </p>
                    <div className="container w-100 p-0">
                        <div className="mb-2 p-0 ">
                            <select className="m-2 btn btn-info btn-outline-dark rounded px-2 py-0" style={{ "fontSize": "14px" }} onChange={(e) => { setQty(e.target.value) }} >
                                {Array.from(Array(5), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}> {i + 1} </option>
                                    )
                                })}
                            </select>
                            <select className="m-2 btn btn-info btn-outline-dark rounded px-3 py-0" style={{ "fontSize": "14px" }} onChange={(e) => { setSize(e.target.value) }} ref={priceRef}>
                                {priceOptions.map((data) => {
                                    return <option key={data} value={data} > {data} </option>
                                })}
                                .0
                            </select>
                        </div>
                        <div className="fs-3">₹{finalPrice}/-</div>
                    </div>
                    <hr />
                    <button className="btn btn-info btn-outline-dark " onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}
