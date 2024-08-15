import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import check from '../../assets/img/check.png';
import { useStateContext } from '../../contexts/ContextProvider';
import axiosClient from '../../axios-client';
import Loader from '../core/Loader';

function Thanks() {
    const [loading, setLoading] = useState(true);
    const {booking, setBooking, user} = useStateContext();
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        axiosClient.get(`/bookings/thanks`, { headers: { 'Content-Type': 'application/json' }, params: { booking_id: id } })
        .then(({data}) => {
            setBooking(data.booking)
            setLoading(false)
            if(data.status === 404){
                navigate('/home/404')
            }
        })
    }, [])

    return (
        <div className="container min-h-100 d-flex align-items-center justify-content-center">
            {loading && <Loader />}
            {!loading && <div className="cards text-center">
                <img src={check} className="img-fluid" width={100} alt=""/>
                <h3 className="text-center">Thank you for your booking</h3>
                <p className="text-center">We will send you an email shortly with details</p>
                <Link to={'/home'} className="btn btn-primary">Back to Home</Link>
            </div>}
        </div>
    );
}

export default Thanks;
