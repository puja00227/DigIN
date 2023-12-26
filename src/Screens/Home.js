import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Card from '../Components/Card'
import { Carousel } from '../Components/Carousel'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack';
import { useCart } from '../Components/ContextReducer';
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Modal from './Modal'
import Cart from './Cart'

const STYLES = {
  position: 'fixed',
  top: '90%',
  left: '90%',
  transform: 'translate(-50%, -50%)',
  zIndex: 10,
}

export default function Home() {
  const [foodCat, setFoodCat] = useState([])
  const [foodItem, setFoodItem] = useState([])
  const [search, setSearch] = useState('')

  const loadData = async () => {
    try {
      const response = await axios.post("http://localhost:5551/api/foodData")
      const data1 = response.data;
      setFoodItem(data1[0])
      setFoodCat(data1[1])
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }

  const { enqueueSnackbar } = useSnackbar()
  const [cartView, setCartView] = useState(false)
  const navigate = useNavigate();
  const items = useCart();

  const loadCart = async () => {
    if (!localStorage.getItem("authToken")) {
      enqueueSnackbar('Please Sign In First.', { variant: 'error' });
      navigate("/signin")
    } else {
      setCartView(true)
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div><Navbar /></div>

      <div style={{ filter: "brightness(85%)" }} ><Carousel /></div>
      <div className="mb-0 p-1 " style={{ backgroundColor: "#0dcaf059" }}>
        <div className=" container w-50 mt-0 ">
          <div className="d-flex justify-content-center " role="search">
            <input className="form-control me-2 outline-info " type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
          </div>
        </div>
      </div>

      <div className='container-fluid'>
        <div className="m-4 mt-2">
          {foodCat.length > 0 ? (
            foodCat.map((data) => {
              return (
                <div key={data._id} className='row m-0'>
                  <div className='fs-3 m-3 p-0'>{data.CategoryName}</div>
                  <hr />
                  {foodItem.length > 0 ? (
                    foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                      .map((filteredItem) => {
                        return (

                          <div key={filteredItem._id} className='col-12 col-md-6 col-lg-4 col-xl-3 fs-3 p-0'>
                            <Card foodItem={filteredItem} options={filteredItem.options[0]} />
                          </div>
                        );
                      })

                  ) : <div>No Such Data Found</div>}

                </div>
              );
            })
          ) : ""}

        </div>
      </div>

      <div type="button" className="btn btn-danger btn-lg rounded-circle fs-2 m-0 " onClick={loadCart} style={STYLES}>
        <Badge badgeContent={items.length} overlap="rectangular" className='m-1'>
          <ShoppingCartIcon />
        </Badge>
      </div>
      {cartView ? <Modal onClose={() => setCartView(false)}> <Cart /> </Modal> : ""}

      <div style={{ backgroundColor: "#b2dfe742" }}><Footer /></div>
    </div>
  )
}
