import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack';

export default function SignUp() {
    const [credentials, setcredentials] = useState({ Name: "", Email: "", Password: "", Location: "" })
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch("/api/createuser/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...credentials })
            })

            const json = await response.json()
            // console.log(json);

            if (!json.success) {
                enqueueSnackbar(json.message, { variant: 'error' })
            }
            else {
                enqueueSnackbar("Signed Up successfully. Please Sign In now.", { variant: 'success' })
                navigate('/signin')
            }
        } catch (error) {
            console.error("Error during signup:", error);
            enqueueSnackbar("Error during signup:", { variant: 'error' });
        }
    }

    const onChange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value })
    }

    return (
        <div className=" d-flex align-items-center justify-content-center" style={{ backgroundImage: "url('img/signup.jpg')", backgroundSize: 'cover', height: '100vh', }}>

            <div className="container">
                <div className="col-12 col-lg-8 col-xl-8 mx-auto">
                    <div className="p-5 py-4 border border-3 border-info rounded fs-5" style={{ backgroundColor: "#a3bad16e" }}>

                        <div className="container-fluid d-flex justify-content-end p-0">
                            <Link className='btn btn-danger fs-6 btn-sm px-2 py-0 m-0' to="/home"> X </Link>
                        </div>

                        <form className='text-black' style={{ zIndex: "9" }} onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" className="form-control border-info" name="Name" onChange={onChange} placeholder='Enter Your Name' />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <input type="email" className="form-control border-info" name="Email" onChange={onChange} placeholder='Enter Your Email' />
                                <div id="emailHelp" className="form-text text-dark">We'll never share your email with anyone else.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" className="form-control border-info" name="Password" onChange={onChange} placeholder='Enter Your Password' />
                                <div id="emailHelp" className="form-text text-dark">Password must contain minimum 5 charaters.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
                                <input type="text" className="form-control border-info" name="Location" onChange={onChange} placeholder='Enter Your Location' />
                            </div>
                            <button type="submit" className="btn btn-info">Submit</button>
                            <Link to="/signin" className="m-3 btn btn-danger">Sign In</Link>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}
