import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo.png'
import axiosClient from '../../axios-client'
import { useEffect, useRef, useState } from 'react';
import { useStateContext } from "../../contexts/ContextProvider";

function Register(){
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    })
    const nameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    const {setUser, setToken, setKinds} = useStateContext();


    const submit = (e) => {
        e.preventDefault();
        setErrors(null);
        setLoading(true)

        const payLoad = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            phone: phoneRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value
        }
    
        axiosClient.post('/register', payLoad)
        .then(({data}) => {
            console.log('Response Data:', data);
            setUser(data.user);
            setToken(data.token);
            setKinds(data.kinds);
            setLoading(false)
        })
        .catch(err => {
            console.error('Error during registration:', err);
            const response = err.response;
            if(response && response.status === 422){
                setErrors(response.data.errors);
            }
            setLoading(false)
        })

    }

    return(
        <div className="container">
            <div className="row login-page d-flex justify-content-center align-items-center">
                
                <div className="col-md-4">
                    
                    <h3 className='text-center mt-1'>Sign up</h3>

                    <form className='border-top' onSubmit={submit}>
                        <div className="mb-3 mt-1">
                            <label  className="form-label">Name</label>
                            <input type="text" ref={nameRef} className="form-control" id="name" name="name" placeholder='Name' />
                            {errors && errors.name &&<p className='text-danger'>{errors.name}</p>}
                        </div>
                        
                        <div className="mb-3">
                            <label  className="form-label" >Email </label>
                            <input type="email" ref={emailRef} className="form-control" id="email" name="email" placeholder='Email'/>
                            {errors && errors.email &&<p className='text-danger'>{errors.email}</p>}
                        </div>
                    
                        <div className="mb-3">
                            <label  className="form-label" >Phone</label>
                            <input type="phone" ref={phoneRef} className="form-control" id="phone" name="phone" placeholder='Phone' />
                            {errors && errors.phone &&<p className='text-danger'>{errors.phone}</p>}
                        </div>
                    
                        <div className="mb-3">
                            <label  className="form-label">Password</label>
                            <input type="password" ref={passwordRef} className="form-control" id="password" name="password" placeholder='Password'  />
                            {errors && errors.password &&<p className='text-danger'>{errors.password}</p>}
                        </div>
                        
                        <div className="mb-3">
                            <label  className="form-label">Confirm Password</label>
                            <input type="password" ref={passwordConfirmationRef} className="form-control" id="password_confirmation" placeholder='Confirm Password' name="password_confirmation"  />
                        </div>
                        

                        <button type="submit" className="btn btn-primary w-100 spiner color-white">
                            {loading ? (
                                    <div className="spinner-border text-light" style={{ fontSize: 1 , width: '1rem', height: '1rem' }} role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                ) : (
                                    'Register'
                                )}
                            </button>

                        <div className="center mt-2">
                        <p class="text-center">Already have an account? <Link to={'/login'}>Login</Link></p>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Register;