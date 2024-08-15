import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axiosClient from '../../axios-client';

function Timer({ expTime, booking }) {
    const navigate = useNavigate(); 

    const calculateTimeLeft = (expirationTime) => {
        const difference = new Date(expirationTime) - new Date();
        let timeLeft = {};
    
        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        } else {
            timeLeft = {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
            };
        }
    
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(expTime));

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft(expTime));
        }, 1000);
    
        return () => clearTimeout(timer);
    }, [expTime, timeLeft]);

    useEffect(() => {
        // Check if time is up
        if (
            timeLeft.days === 0 &&
            timeLeft.hours === 0 &&
            timeLeft.minutes === 0 &&
            timeLeft.seconds === 0
        ) {
            axiosClient.get(`/bookings/show/${booking.id}`)
                .then(({ data }) => {
                    if (data.status === 404) {
                        navigate('/home/404');
                        setNotification({ message: 'Booking Expired', type: 'danger' });
                    }
                })
                .catch((err) => {
                    setNotification({ message: 'Something went wrong', type: 'danger' });
                });
        }
    }, [timeLeft, booking.id, navigate]);

    return (
        <div className="exp_time text-danger text-center d-flex justify-content-center border-bottom p-1 m-1">
            <div className='text-danger'>This Booking Expires in: </div>
            <div className='mx-2 text-danger'>
                {timeLeft.days > 0 && `${timeLeft.days}d `}
                {timeLeft.hours > 0 && `${timeLeft.hours}h `}
                {timeLeft.minutes > 0 && `${timeLeft.minutes}m `}
                {timeLeft.seconds}s
            </div>
            <div className='text-danger'> if not paid</div>
        </div>
    );
}

export default Timer;
