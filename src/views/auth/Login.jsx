import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo.png'
import axiosClient from '../../axios-client'
import { useEffect, useRef, useState } from 'react';
import { useStateContext } from "../../contexts/ContextProvider";


function Login(){

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    })
    const emailRef = useRef();
    const passwordRef = useRef();
    const remember_me = useRef();
    const {setUser, setToken, setKinds} = useStateContext();
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        setErrors(null)
        setLoading(true)
        const payLoad = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        axiosClient.post('/login', payLoad)
        .then(({data})=>{
            setToken(data.token);
            setUser(data.user);
            setKinds(data.kinds);
            setLoading(false)
        })
        .catch((err)=>{
            const response = err.response;
            if(response.data.errors){
                setErrors(response.data.errors);
            }
            else{
                setErrors({
                    email: [response.data.msg]
                })
            }
            console.log(response.data.msg)
            console.log(errors)
            setLoading(false)
        })

        
    }

    return(
        <div >
            <div className="container">
                <div className="row login-page d-flex justify-content-center align-items-center">
                    <div className="col-md-4 ">

                        <h1 className="text-center">Login</h1>
                        <form className='border-top' onSubmit={submit}>
                            <div className="mb-3">
                                <label htmlFor="Email" className="form-label">Email</label>
                                <input type="text" ref={emailRef} className="form-control" id="Email" placeholder="Enter Email"/>
                                {errors && errors.email &&<p className='text-danger'>{errors.email}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" ref={passwordRef} className="form-control" id="password" placeholder="Enter password"/>
                                {errors && errors.password &&<p className='text-danger'>{errors.password}</p>}
                            </div>
                            <div className="mb-3 form-check">
                                <input type="checkbox" ref={remember_me} className="form-check-input" id="remember"/>
                                <label className="form-check-label" htmlFor="remember">Remember me</label>
                            </div>
                            <button type="submit" className="btn btn-primary w-100">
                            {loading ? (
                                <div className="spinner-border text-light" style={{ fontSize: 1 , width: '1rem', height: '1rem' }} role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            ) : (
                                'Login'
                            )}
                            </button>  
                            <div className="mt-3">
                                <p className="text-center">Don't have an account? <Link to="/register">signup</Link></p>
                            </div>  
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;