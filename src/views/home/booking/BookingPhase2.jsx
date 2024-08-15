import React, { useEffect, useState } from 'react';
import '../../../theater.css'
import rightArrow from '../../../assets/img/right-arrow.png'
import leftArrow from '../../../assets/img/left-arrow.png'
import axiosClient from '../../../axios-client';
import Seat from './Seat';
import Timer from '../../../components/core/Timer';
import Loader from '../../../components/core/Loader';
import { useStateContext } from '../../../contexts/ContextProvider';
import { useNavigate } from 'react-router-dom';

function BookingPhase2({booking, setBooking ,setTriger, triger}) {
    const [screen, setScreen] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const {setNotification} = useStateContext();
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        setLoading(true)
        axiosClient.get(`/bookings/screen/${booking.id}`)
        .then(({data}) => {
            console.log(data)
            setScreen(data.screen)
            setBooking(data.booking)
            setLoading(false)
        })
        .catch(({err}) => {
            console.log(err)
        })
    }, [triger])

    const onClickNext = (e) => {
        e.preventDefault();
        axiosClient.post(`/bookings/storeSeats`, {booking_id: booking.id})
        .then(({data}) => {
            console.log(data)
            if(data.status === 404){
                navigate('/home/404')
            }
            if(data.status === 400){
                setNotification({message: data.msg, type: 'danger'})
            }
            else{
                console.log(data)
                setTriger({
                    phase1: false,
                    phase2: false,
                    phase3: true
                })
            }
        })
        .catch(({err}) => {
            console.log(err)
        })
    }

    const onClickCancel = (e) => {
        e.preventDefault();
        axiosClient.post(`/bookings/destroy`, {booking_id: booking.id})
        .then(({data}) => {
            setNotification({message: data.msg, type: 'success'})
            navigate('/home')
        })
        .catch(({err}) => {
            console.log(err)
        })
    }

    return (
        <div>
            {loading && <Loader />}
            {!loading && <section>
            <div className="row content_center">
                <div className="container my">
                    <div className="row" id="movies-page">
                        <div className="movie-container">
                            <div className="container">
                                <div className="row mt-5">
                                    <div className="col-12">
                                        <div className="alert alert-danger d-none" id="msg">
                                            
                                        </div>
                                    </div>
                                    <div className="col-sm-12 mb-3 d-flex justify-content-center">
                                        <label className="text-uppercase">{booking.movie ? booking.movie.name : ''} in {screen.theater ? screen.theater.name : ''}</label>
                                    </div>
                                    <div className="col-sm-12 d-flex justify-content-center" >
                                        <ul className="showcase">
                                            <li>
                                                <label className="pt-1 text-center">screen <br/> {screen.screen_number}</label>
                                            </li>
                                            <li>
                                                <div className="top_seat"></div>
                                                <small>N/A</small>
                                            </li>
                                            <li>
                                                <div className="top_seat selected"></div>
                                                <small>Selected</small>
                                            </li>
                                            <li>
                                                <div className="top_seat occupied"></div>
                                                <small>Occupied</small>
                                            </li>    
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="container" id="container">
                                <div className="screen"></div>
                            </div>

                            <form  id="seatsForm" method="post">
                                <div className="mmy">
                                    <div className="seaats-container d-flex justify-content-center align-items-center">
                                        
                                        <div id="col">
                                            {screen.rows && screen.rows.map((row, index) => (<div className="my_row" key={index}>   
                                                <div className="row_letter">{row.letter}</div> 
                                                    {row.seats && row.seats.map((seat, index) => (
                                                    <div key={index}>
                                                        <Seat 
                                                        seat={seat} 
                                                        booking={booking} 
                                                        key={index} classs={seat.apearance === 1 ? "fake_seat" : "seat"} 
                                                        />
                                                        
                                                    </div>
                                                        
                                                    ))}
                                                <div className="row_letter">{row.letter}</div>
                                            </div>))}
                                        </div>
                                    </div>
                                </div>

                                {/* final buttons */}
                                <div className="my-2">
                                    {/* <p className="text-center">
                                        You have selected <span>{totalSeats ? totalSeats : 0}</span> seats <br/> for the total price of Rs. <span>{totalPrice ? totalPrice : 0}</span>
                                    </p> */}
                                    <p className="text-center">Ticket Price: {screen.rows && screen.rows[0].seats && screen.rows[0].seats[0].price} EGP</p>
                                    <div className="col d-flex justify-content-between ">
                                        <div>
                                            <button type="button" onClick={() => setTriger({phase1: true, phase2: false, phase3: false})} className="btn btn-primary">
                                                <img src={leftArrow} className="left-arrow" alt=""/> Previous
                                            </button>
                                            <button type="button" onClick={onClickCancel} className="btn btn-danger mx-3">
                                            
                                                Cancel
                                            </button>
                                        </div>
                                        <button type="submit" onClick={onClickNext} className="btn btn-primary ">
                                            Next
                                            <img src={rightArrow} className="right-arrow" alt=""/>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>}
        </div>
    );
}

export default BookingPhase2;
