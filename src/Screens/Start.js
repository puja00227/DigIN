import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { Link } from 'react-router-dom'

export default function Start() {
    return (
        <div>
            <div style={{ backgroundImage: "url('img/start.jpg')", backgroundSize: 'cover', height: '100vh' }}>
                <div><Navbar /></div>

                <div className="container d-flex align-items-center justify-content-center text-black" style={{ height: '80%', }}>
                    <div className="m-5 p-5 py-4 pb-3 border border-3 border-info rounded fs-5 " style={{ backgroundColor: "#a3bad16e" }}>
                        <div className="d-flex justify-content-center flex-wrap">
                            <div className="pt-5">Welcome to </div>
                            <div className="fst-italic pt-1 text-black" style={{ fontSize: '60px', }}>
                                DigIN!
                            </div>
                            <div className='mx-5'></div>
                        </div>
                        <div className="grid justify-between my-3">
                            <span className="text-base font-bold text-sky-700">
                                Embark on a delightful journey through our culinary haven. Explore, order, and savor happiness!
                            </span> <br />
                            <div className='d-flex justify-content-center'>
                                <Link type="button" className="btn btn-info my-3 fs-5" to="/home">Explore Now</Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='fixed-bottom' style={{ backgroundColor: "#b2dfe742" }}><Footer /></div>
            </div>
        </div>
    )
}
