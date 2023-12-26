import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


export const Carousel = () => {
    return (
        <div>
            <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner" id="carousel">
                    <div className="carousel-item active">
                        <img src="img/carousel/pizza.jpg" className="d-block w-100" alt="..." style={{ height: "360px", objectFit: "cover" }} />
                    </div>
                    <div className="carousel-item">
                        <img src="img/carousel/burger.jpg" className="d-block w-100" alt="..." style={{ height: "360px", objectFit: "cover" }} />
                        {/* <img src="https://source.unsplash.com/random/1200x500/?fried-chicken" className="d-block w-100" alt="..." /> */}
                    </div>
                    <div className="carousel-item">
                        <img src="img/carousel/chicken.jpg" className="d-block w-100" alt="..." style={{ height: "360px", objectFit: "cover" }} />
                    </div>
                    <div className="carousel-item">
                        <img src="img/carousel/rice.jpg" className="d-block w-100" alt="..." style={{ height: "360px", objectFit: "cover" }} />
                    </div>
                    <div className="carousel-item">
                        <img src="img/carousel/chicken2.jpg" className="d-block w-100" alt="..." style={{ height: "360px", objectFit: "cover" }} />
                    </div>
                    <div className="carousel-item">
                        <img src="img/carousel/iceCream.jpg" className="d-block w-100" alt="..." style={{ height: "360px", objectFit: "cover" }} />
                    </div>

                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}
