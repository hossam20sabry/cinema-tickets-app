import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../../components/core/Loader';
import BookingPhase1 from './BookingPhase1';
import axiosClient from '../../../axios-client';
import BookingPhase2 from './BookingPhase2';
import { useStateContext } from '../../../contexts/ContextProvider';
import Timer from '../../../components/core/Timer';
import BookingPhase3 from './BookingPhase3';

function Booking() {
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [triger, setTriger] = useState({
        phase1: true,
        phase2: false,
        phase3: false
    });
    const [movie, setMovie] = useState([]);
    const [theaters, setTheaters] = useState([]);
    const {setNotification} = useStateContext();
    const [booking, setBooking] = useState({});
    const navigate = useNavigate();


    useEffect(() => {
        axiosClient.get(`/bookings/show/${id}`)
        .then(({data}) => {
            if(data.status === 404){
                navigate('/home/404')
            }
            if(data.status === 403){
                navigate('/403')
            }
            setMovie(data.movie)
            setTheaters(data.movie.theaters)
            setBooking(data)
            setLoading(false)
        })
        .catch(({err}) => {
            console.log(err)
            setLoading(false)
            setNotification({message: 'Something went wrong', type: 'danger'})
        })
    }, [])


    return (
        <div className="container min-h-100 mt-3">
            {booking.exp_time && <Timer  expTime={booking.exp_time} booking={booking}/>}
            {loading && <Loader />}
            {triger.phase1 &&
                <BookingPhase1  booking={booking} movie={movie} theaters={theaters}  setTriger={setTriger} triger={triger} />
            }
            {triger.phase2 && 
                <BookingPhase2 booking={booking} key={id} setBooking={setBooking} setTriger={setTriger} triger={triger}/>
            }
            {triger.phase3 && <BookingPhase3 booking={booking} setBooking={setBooking} key={id} setTriger={setTriger} triger={triger}/>}
        </div>
    );
}

export default Booking;
