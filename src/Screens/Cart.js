import React from 'react'
import Delete from '@material-ui/icons/Delete'
import { useCart, useDispatch } from '../Components/ContextReducer';
import axios from 'axios';
import { useSnackbar } from 'notistack';

export default function Cart() {
    const { enqueueSnackbar } = useSnackbar()
    let data = useCart();
    let dispatch = useDispatch();
    if (data.length === 0) {
        return (
            <div>
                <div className='m-5 mt-2 text-center fs-3 text-white'>Your Cart is Empty!</div>
            </div>
        )
    }

    const handleCheckOut = async () => {
        let userEmail = localStorage.getItem("userEmail");
        try {
            const response = await axios.post("https://diginbackend.onrender.com/api/OrderData",
                { order_data: data, Email: userEmail, order_date: new Date().toDateString(), totalP: totalPrice1 },
                { headers: { 'Content-Type': 'application/json' } });
            if (response.status === 200) {
                dispatch({ type: "DROP" });
                enqueueSnackbar("Congratulations! Your order is successfully placed.", { variant: 'success' })
            } else {
                console.error("Unexpected response status:", response.status);
            }
        } catch (error) {
            console.error("Axios Error:", error);
        }
    }

    let totalPrice = data.reduce((total, food) => total + food.price, 0)
    let totalPrice1 = `Total Price: ${totalPrice}/-`

    return (
        <div>
            <div>
                <div className='table-container m-auto my-3 table-bordered rounded' style={{ overflowY: "auto", overflowX: "auto", maxHeight: "360px", maxWidth: "85%" }}>
                    <table className='table table-hover text-center fs-6' >
                        <thead className=' text-success fs-6 table-secondary '>
                            <tr>
                                <th scope='col'>Sl. No.</th>
                                <th scope='col' >Name</th>
                                <th scope='col' >Quantity</th>
                                <th scope='col' >Size</th>
                                <th scope='col' >Amount</th>
                                <th scope='col' className='pe-3'>Delete</th>
                            </tr>
                        </thead>
                        <tbody >
                            {data.map((food, index) => (
                                <tr key={index}>
                                    <th scope='row' >{index + 1}</th>
                                    <td >{food.name}</td>
                                    <td>{food.qty}</td>
                                    <td>{food.size}</td>
                                    <td>{food.price}</td>
                                    <td ><button type="button" className="btn btn-outline-danger p-0"><Delete onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='container d-flex justify-content-center'>
                    <div>
                        <div>
                            <h1 className='fs-5 text-white mb-2'>Total Price: {totalPrice}/-</h1>
                        </div>
                        <div className=' d-flex justify-content-center'>
                            <button className='btn btn-primary mb-3' onClick={handleCheckOut} > Check Out </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


