import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import axios from 'axios';

const backgroundStyle = {
    backgroundImage: "url('img/order.jpg')",
    backgroundSize: 'cover',
    height: '100vh',
    backgroundAttachment: 'fixed',
    backgroundColor: '#0213254f',
    position: 'fixed',
    width: '100%',
    zIndex: -1,
};

export default function MyOrder() {
    const [orderData, setOrderData] = useState({})
    const fetchMyOrder = async () => {
        try {
            const response = await axios.post("http://localhost:5551/api/myOrderData",
                { email: localStorage.getItem('userEmail') });
            const data = response.data;
            setOrderData(data);
        } catch (error) {
            console.error("Axios Error:", error);
        }
    }

    useEffect(() => {
        fetchMyOrder()
    }, [])

    return (
        <div>
            <div style={backgroundStyle}></div>
            <div><Navbar /></div>
            <div className='container text-white p-5 my-5 rounded border border-3 border-info ' style={{ width: '90%', backgroundColor: "#0213254f" }}>
                <div className="text-white fs-3 mb-0 pb-0 border-bottom">MY ORDER HISTORY </div>
                <div>
                    {Object.keys(orderData).length !== 0 ? Array(orderData).map(data => {
                        return (
                            data.orderData ?
                                data.orderData.order_data.slice(0).reverse().map((item) => {
                                    return (
                                        item.map((arrayData, index) => {
                                            return (
                                                <div className='mb-1' key={index}>
                                                    {arrayData.Order_date || arrayData.totalPrc ?
                                                        (
                                                            arrayData.Order_date ? (
                                                                <div className='pt-5 fs-6'>
                                                                    {data = arrayData.Order_date}
                                                                    <hr />
                                                                </div>
                                                            ) : (
                                                                <div>
                                                                    <h1 className='fs-4 text-white mb-3 fst-italic'>{arrayData.totalPrc}</h1>
                                                                </div>
                                                            ))
                                                        :
                                                        <div>
                                                            <div >
                                                                <table className='bg-light text-black text-center fs-6' style={{ width: '100%' }}>
                                                                    <tbody>
                                                                        <tr>
                                                                            <th scope='row' className='col-1 '>{index - 1}.</th>
                                                                            <td className='col-4'>{arrayData.name}</td>
                                                                            <td>{arrayData.qty}</td>
                                                                            <td className='col-2'>{arrayData.size}</td>
                                                                            <td className='col-3'>₹{arrayData.price}/-</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            )
                                        })
                                    )
                                })
                                : (<div className="pt-4 text-white fs-4">NO ORDERS TO DISPLAY! </div>)
                        )
                    }) : ""}
                </div>
                <div className="m-4"></div>
            </div>
            <div className='mt-4 fixed-bottom' style={{ backgroundColor: "#b2dfe742" }}><Footer /></div>
        </div>
    )
}
