import React, { useEffect, useState } from 'react';
import { useStateContext } from '../../contexts/ContextProvider';
import axiosClient from '../../axios-client';

function Profile() {
    const {user, setUser} = useStateContext();
    const [errors, setErrors] = useState(null);


    const [name, setName] = useState(user.name || '');
    const [email, setEmail] = useState(user.email || '');

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        setName(user.name || '');
        setEmail(user.email || '');
    }, [user]);

    const [loading1, setLoading1] = useState(false);
    const [success1, setsuccess1] = useState(false);
    const updateProfile = (e) => {
        e.preventDefault();
        setLoading1(true);
        setErrors(null);
        axiosClient.patch('/profile', {
            name: name,
            email: email
        })
        .then(({data})=> {
            console.log(data)
            setUser(data.user);
            setLoading1(false);
            setsuccess1(true);
        })
        .catch((err)=> {
            
            const response = err.response;
            if(response && response.status === 422){
                setErrors(response.data.errors);
            }
            setLoading1(false);
        })
    }

    const [loading2, setLoading2] = useState(false);
    const [success2, setsuccess2] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const updatePassword = (e) => {
        e.preventDefault();
        setLoading2(true);
        setErrors(null);
        axiosClient.put('/password', {
            current_password: currentPassword,
            password: newPassword,
            password_confirmation: passwordConfirmation
        })
        .then(({data})=> {
            setLoading2(false);
            setsuccess2(true);
        })
        .catch((err)=> {
            const response = err.response;
            if(response && response.status === 422){
                setErrors(response.data.errors);
            }
            setLoading2(false);
        })
    }


    return (
        <div className="container my-4">
            <div className="row mb-4">
                <div className="col-12 bg-main2 p-3 rounded">
                    <h4 className="text-capitalize">Profile information</h4>
                    <p className="text-capitalize text-common">Update your account's profile information and email address.</p>
                    <form  method="post" onSubmit={updateProfile}>
                        <div className="mb-3">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" onChange={e=>setName(e.target.value)} value={name} className="form-control"/>
                            <div className="form-error">
                            {errors && errors.name &&<p className='text-danger'>{errors.name}</p>}
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" onChange={e=>setEmail(e.target.value)} value={email} className="form-control"/>
                            <div className="form-error">
                            {errors && errors.email &&<p className='text-danger'>{errors.email}</p>}
                            </div>
                        </div>

                            <div className='d-none'>
                                <p className="text-sm mt-2 text-gray-800 dark:text-gray-200">
                                    Your email address is unverified.

                                    <button form="send-verification" className="btn btn-warning">
                                        Click here to re-send the verification email.
                                    </button>
                                </p>

                                    <p className="mt-2 font-medium text-sm text-green-600 dark:text-green-400">
                                        A new verification link has been sent to your email address.
                                    </p>
                            </div>

                        <div className="mb-3">
                            <button type="submit" className="btn btn-primary">
                            {loading1 ? (
                                    <div className="spinner-border text-light mx-2" style={{ fontSize: 1 , width: '1rem', height: '1rem' }} role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                ) : (
                                    'Save'
                                )}
                            </button>
                        </div>

                            {success1 && <div>
                                <p className="text-sm mt-2 text-gray-800 dark:text-gray-200">
                                    Saved.
                                </p>
                            </div>}
                        


                    </form>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-12 bg-main2 p-3 rounded">
                    <h4 className="text-capitalize">Update Password</h4>
                    <p className="text-capitalize">Ensure your account is using a long, random password to stay secure.</p>
                    <form onSubmit={updatePassword}>

                        <div className="mb-3">
                            <label htmlFor="current_password">Current Password</label>
                            <input type="password" onChange={e=>setCurrentPassword(e.target.value)} name="current_password" className="form-control"/>
                            <div className="form-error">
                                {errors && errors.current_password &&<p className='text-danger'>{errors.current_password}</p>}
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password">New Password</label>
                            <input type="password" onChange={e=>setNewPassword(e.target.value)} name="password" className="form-control"/>
                            <div className="form-error">
                                {errors && errors.password &&<p className='text-danger'>{errors.password}</p>}
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password_confirmation">Confirm Password</label>
                            <input type="password" onChange={e=>setPasswordConfirmation(e.target.value)} name="password_confirmation" className="form-control"/>
                            <div className="form-error">
                                {errors && errors.password_confirmation &&<p className='text-danger'>{errors.password_confirmation}</p>}
                            </div>
                        </div>

                        <div className="mb-3">
                            <button type="submit" className="btn btn-primary">
                            {loading2 ? (
                                    <div className="spinner-border text-light mx-2" style={{ fontSize: 1 , width: '1rem', height: '1rem' }} role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                ) : (
                                    'Save'
                                )}
                            </button>
                        </div>

                            {success2 && <div>
                                <p className="text-sm mt-2 text-gray-800 dark:text-gray-200">
                                    Saved.
                                </p>
                            </div>}
                    </form>
                </div>
            </div>
            
        </div>
        
    );
}

export default Profile;
