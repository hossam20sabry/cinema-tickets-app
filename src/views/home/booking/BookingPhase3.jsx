import React, { useEffect, useState } from 'react';
import rightArrow from '../../../assets/img/right-arrow.png'
import leftArrow from '../../../assets/img/left-arrow.png'
import film from '../../../assets/img/icon/film-slate.png'
import clock from '../../../assets/img/icon/clock.png'
import location from '../../../assets/img/icon/location-pin.png'
import film1 from '../../../assets/img/icon/film.png'
import ticket from '../../../assets/img/icon/ticket (1).png'
import chair from '../../../assets/img/icon/chair.png'
import axiosClient from '../../../axios-client';
import { useStateContext } from '../../../contexts/ContextProvider';
import Loader from '../../../components/core/Loader';
import { useNavigate } from 'react-router-dom';

function BookingPhase3({booking, setBooking, setTriger}) {
    const {user} = useStateContext();
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
        axiosClient.get(`/bookings/show/${booking.id}`)
        .then(({data}) => {
            setBooking(data)
            setLoading(false)
        })
    }, [setTriger])

    const onClickNext = (e) => {
        e.preventDefault();
        setSubmitLoading(true)
        axiosClient.post('/checkout', {booking_id: booking.id}, {
            headers: {
                'Content-Type': 'application/json'
            }})
        .then(({data}) => {
            window.location.href = data.url
        })
        .catch(({err}) => {
            setSubmitLoading(false)
            console.error('There was an error processing the payment!', err);
        })
    }

    const onClickCancel = (e) => {
        e.preventDefault();
        axiosClient.post(`/bookings/destroy`, {booking_id: booking.id})
        .then(({data}) => {
            setNotification({message: data.msg, type: 'success'})
            navigate('/home')
        })
        
    }

    return (
        <div>
            {loading && <Loader />}
            {!loading && <div className="container">
                <h3 className="pb-3 border-bottom">Check all your Reservation Details</h3>
                <div className="row mt-3">
                    <div className="col m-3">
                        <div className="diiv">
                            <img src={film} className="top-img" alt=""/>
                            <p className="movie-name text-uppercase">{booking.movie ? booking.movie.name : ''}</p>
                        </div>
                    </div>
                    <div className="col m-3">
                        <div className="diiv">
                            <img src={clock} className="top-img" alt=""/>
                            <p>{booking.show_time ? booking.show_time.start_time : ''} <br/> {booking.show_time ? booking.show_time.date : ''}</p>
                        </div>
                    </div>
                    <div className="col m-3">
                        <div className="diiv">
                            <img src={location} className="top-img" alt=""/>
                            <p className="text-uppercase">{booking.show_time ? booking.show_time.theater.location : ''} <br/>{booking.show_time ? booking.show_time.theater.city : ''}</p>
                        </div>
                    </div>
                    <div className="col m-3">
                        <div className="diiv">
                            <img src={film1} className="top-img" alt=""/>
                            <p className="text-uppercase">{booking.show_time ? booking.show_time.theater.name : ''} CINEMAS</p>
                        </div>
                    </div>
                    <div className="col m-3">
                        <div className="diiv">
                            <img src={ticket} className="top-img" alt=""/>
                        <p id="tickets_nums">{booking.total_seats} Tickets</p>
                        </div>
                    </div>
                    <div className="col m-3">
                        <div className="diiv">
                            <img src={chair} className="top-img" alt=""/>
                            <div id="ticket_num" className='d-flex justify-content-center align-items-center flex-wrap'>
                                {booking.seats && booking.seats.map((seat, index) => (
                                    <p key={index} className='m-2'>{seat.row.letter}{seat.number}</p>
                                ))} 
                            </div>  
                        </div>
                    </div>
                </div>
                <div className="row py-3 ">
                    <div className="col-md-6">
                        <table className="table table-dark table-striped-columns table-hover p-3">
                            <tbody>
                                <tr>
                                    <td>Name</td>
                                    <td className="text-uppercase">{user.name}</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>{user.email}</td>
                                </tr>
                                <tr>
                                    <td>Phone</td>
                                    <td>{user.phone}</td>
                                </tr>
                                
                            </tbody>
                        </table>
                    </div>
            
                    <div className="col-md-6">
                        <table className="table table-dark table-striped-columns  p-3">
                            <tbody>
                                <tr>
                                    <td>Tickets</td>
                                    <td>{booking.total_seats}</td>
                                    
                                    <td rowSpan="3" className="total text-center mt-3"><h4 className="my_padding">Total <br/> <span>{booking.total_price +10} EGP</span></h4> </td>
                                </tr>
                                <tr>
                                    <td className="smaler">Ticket Price</td>
                                    <td>{booking.total_price / booking.total_seats} EGP &nbsp;&nbsp;&nbsp;</td>
                                </tr>
                                <tr>
                                    <td className="smaler">Booking Fees</td>
                                    <td>10 EG &nbsp;&nbsp;&nbsp;</td>
                                </tr>
                                
                            </tbody>
                        </table>
                    </div>
                    <div className="col-12 d-flex justify-content-between">
                        <div className="d-flex">
                            <button type="button" onClick={() => setTriger({phase1: false, phase2: true, phase3: false})} className="btn btn-primary d-flex align-items-center ">
                                <img src={leftArrow} className="left-arrow" alt=""/>
                                Previous
                            </button>

                            <button type="button" onClick={onClickCancel} className="btn btn-danger mx-3">
                                Cancel
                            </button>

                        </div>
                        
                        
                        <button type="button" onClick={onClickNext} className="btn btn-primary d-flex align-items-center">
                                {submitLoading ? 
                                    <div className="spinner-border text-light mx-2" style={{ fontSize: 1, width: '1rem', height: '1rem' }} role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                : ''}
                                Pay Now
                        </button>
                        
                    </div>
                    
                </div>
            </div>}
        </div>
    );
}

export default BookingPhase3;
