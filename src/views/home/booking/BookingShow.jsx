import React, { useEffect, useState } from 'react';
import film from '../../../assets/img/icon/film-slate.png'
import clock from '../../../assets/img/icon/clock.png'
import location from '../../../assets/img/icon/location-pin.png'
import film1 from '../../../assets/img/icon/film.png'
import ticket from '../../../assets/img/icon/ticket (1).png'
import chair from '../../../assets/img/icon/chair.png'
import Loader from '../../../components/core/Loader';
import axiosClient from '../../../axios-client';
import { useStateContext } from '../../../contexts/ContextProvider';
import { useParams } from 'react-router-dom';

function BookingShow() {
    const [loading, setLoading] = useState(true);
    const {setNotification, user} = useStateContext();
    const [booking, setBooking] = useState([]);
    const {id} = useParams();
    useEffect(()=>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        setLoading(true)
        axiosClient.get(`/bookings/myBooking/${id}`)
        .then(({data}) => {
            console.log(data)
            setBooking(data)
            setLoading(false)
        })
        .catch(({err}) => {
            setNotification({message: 'Something went wrong', type: 'danger'})
            console.error('There was an error processing the payment!', err);
        })
    }, [])
    return (
        <div>
            {loading && <Loader />}
            {!loading && <div className="container my-4 min-vh-100">
                <h3 className="pb-3 border-bottom">Booking Details</h3>
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
                                    
                                    <td rowSpan="3" className="total text-center mt-3"><h4 className="my_padding">Total <br/> <span>{booking.total_price} EGP</span></h4> </td>
                                </tr>
                                <tr>
                                    <td className="smaler">Ticket Price</td>
                                    <td>{(booking.total_price - 10) / booking.total_seats} EGP &nbsp;&nbsp;&nbsp;</td>
                                </tr>
                                <tr>
                                    <td className="smaler">Booking Fees</td>
                                    <td>10 EG &nbsp;&nbsp;&nbsp;</td>
                                </tr>
                                
                            </tbody>
                        </table>
                    </div>
                    
                    
            
                </div>
            </div>
            }
        </div>
    );
}

export default BookingShow;
