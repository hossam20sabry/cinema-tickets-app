import React, { useEffect, useRef, useState } from 'react';
import axiosClient from '../../../axios-client';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../../components/core/Loader';

function BookingPhase1({booking, movie, theaters, setTriger}) {
    const [showTimes, setShowTimes] = useState([]);
    const [showTimes2, setShowTimes2] = useState([]);
    const [lastshowTimes, setLastShowTimes] = useState([]);
    const [screens, setScreens] = useState([]);
    const [onSubmitTheaterLoading, setOnSubmitTheaterLoading] = useState(false);
    const [onSubmitDateLoading, setOnSubmitDateLoading] = useState(false);
    const [onSubmitTimeLoading, setOnSubmitTimeLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
    }, [])


    const onSubmitTheater = (theater_id) => {
        setOnSubmitTheaterLoading(true)
        setShowTimes([])
        setShowTimes2([])
        setLastShowTimes([])
        setScreens([])
        setErrors(null)
        axiosClient.post('/bookings/theater', {booking_id: booking.id, theater_id: theater_id})
        .then(({data}) => {
            if(data.status === 404){
                navigate('/home/404')
            }
            setShowTimes(data)
            setOnSubmitTheaterLoading(false)
            
        })
        .catch(({err}) => {
            console.log(err)
            setOnSubmitTheaterLoading(false)            
        })
    }

    const onSubmitDate = (showtime_id) => {
        setOnSubmitDateLoading(true)
        setErrors(null)
        setShowTimes2([])
        setLastShowTimes([])
        setScreens([])
        axiosClient.post('/bookings/date', {booking_id: booking.id, showtime_id: showtime_id})
        .then(({data}) => {
            if(data.status === 404){
                navigate('/home/404')
            }
            setShowTimes2(data)
            setOnSubmitDateLoading(false)
        })
        .catch(({err}) => {
            console.log(err)
            setOnSubmitDateLoading(false)            
        })
    }

    const onSubmitTime = (showtime_id) => {
        setErrors(null)
        setLastShowTimes([])
        setScreens([])
        setOnSubmitTimeLoading(true)
        axiosClient.post('/bookings/time', {booking_id: booking.id, showtime_id: showtime_id})
        .then(({data}) => {
            console.log(data)
            if(data.status === 404){
                navigate('/home/404')
            }
            setLastShowTimes(data.show_time)
            setScreens(data.screens)
            setOnSubmitTimeLoading(false)
        })
        .catch(({err}) => {
            console.log(err)
            setOnSubmitTimeLoading(false)            
        })
    }

    const theater_id = useRef();
    const date = useRef();
    const time = useRef();
    const screen_id = useRef();

    const [submitLoading, setSubmitLoading] = useState(false);
    const onSubmit = (e) => {
        e.preventDefault();
        setErrors(null)
        setSubmitLoading(true)
        const payLoad = {
            booking_id: booking.id,
            theater_id: theater_id.current.value,
            date: date.current.value,
            time: time.current.value,
            screen_id: screen_id.current.value,
            showtime_id: lastshowTimes.id
        }
        axiosClient.post('/bookings/store2', payLoad)
        .then(({data}) => {
            if(data.status === 404){
                navigate('/home/404')
            }
            if(data.status === 403){
                navigate('/403')
            }
            setSubmitLoading(false)
            setTriger({
                phase1: false,
                phase2: true,
                phase3: false
            })
        })
        .catch((err) => {
            setSubmitLoading(false)
            const response = err.response;
            if(response.data.errors){
                setErrors(response.data.errors);
            }
            else{
                setErrors({
                    email: [response.data.msg]
                })
            }
        })
    }

    return (
        <div className="row mt-3">
            <div className="col-12 col-sm-6 col-md-4 my-3 ">
                <img src={import.meta.env.VITE_IMG_BASE_URL+'/posters/'+movie.poster_url} className="img-fluid" alt="..." />
            </div>
            <div className="col-12 col-sm-6 col-md-4 my-3">
                <form className="row g-3" onSubmit={onSubmit}>
                    <h3 className="text-center">Booking Details</h3>

                    {/* theater */}
                    <div className="col-12">
                        <label htmlFor="theaterSelect" className="form-label"> Theater</label>
                        <select 
                            id="theaterSelect" 
                            className="form-select bg-main2" 
                            ref={theater_id} 
                            defaultValue="" 
                            onChange={(e) => onSubmitTheater(e.target.value)}
                        >
                            <option disabled value="">Choose theater...</option>
                            {theaters && theaters.map((theater, index) => (
                                <option value={theater.id} key={index}>{theater.name}</option>
                            ))}
                        </select>
                        {errors && errors.theater_id && <p className="text-danger">{errors.theater_id[0]}</p>}
                    </div>
                    {onSubmitTheaterLoading && (
                        <div className="col-12 d-flex align-items-center justify-content-center">
                            <div className="spinner-border text-light" style={{ fontSize: 1, width: '2rem', height: '2rem' }} role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    )}

                    {/* date */}
                    {!onSubmitTheaterLoading && (
                        <div className="col-12">
                            <label htmlFor="dateSelect" className="form-label"> Date</label>
                            <select 
                                id="dateSelect" 
                                className="form-select bg-main2" 
                                ref={date} 
                                defaultValue="" 
                                onChange={(e) => onSubmitDate(e.target.value)}
                            >
                                <option disabled value="">Choose Date...</option>
                                {showTimes && showTimes.map((showTime, index) => (
                                    <option value={showTime.id} key={index}>{showTime.date}</option>
                                ))}
                            </select>
                            {errors && errors.date && <p className="text-danger">{errors.date[0]}</p>}
                        </div>
                    )}
                    {onSubmitDateLoading && (
                        <div className="col-12 d-flex align-items-center justify-content-center">
                            <div className="spinner-border text-light" style={{ fontSize: 1, width: '2rem', height: '2rem' }} role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    )}

                    {/* time */}
                    {!onSubmitDateLoading && (
                        <div className="col-12">
                            <label htmlFor="timeSelect" className="form-label"> Time</label>
                            <select 
                                id="timeSelect" 
                                className="form-select bg-main2" 
                                ref={time} 
                                defaultValue="" 
                                onChange={(e) => onSubmitTime(e.target.value)}
                            >
                                <option disabled value="">Choose time...</option>
                                {showTimes2 && showTimes2.map((showTime, index) => (
                                    <option value={showTime.id} key={index}>{showTime.start_time}</option>
                                ))}
                            </select>
                            {errors && errors.time && <p className="text-danger">{errors.time[0]}</p>}
                        </div>
                    )}
                    {onSubmitTimeLoading && (
                        <div className="col-12 d-flex align-items-center justify-content-center">
                            <div className="spinner-border text-light" style={{ fontSize: 1, width: '2rem', height: '2rem' }} role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    )}

                    {/* screen */}
                    {!onSubmitTimeLoading && (
                        <div className="col-12">
                            <label htmlFor="screenSelect" className="form-label"> Screen</label>
                            <select 
                                id="screenSelect" 
                                className="form-select bg-main2" 
                                ref={screen_id} 
                                defaultValue=""
                            >
                                <option disabled value="">Choose screen...</option>
                                {screens && screens.map((screen, index) => (
                                    <option value={screen.id} key={index}>{screen.screen_number}</option>
                                ))}
                            </select>
                            {errors && errors.screen_id && <p className="text-danger">{errors.screen_id[0]}</p>}
                        </div>
                    )}

                    {/* submit */}
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary btn-bg-2 w-100">
                            {submitLoading ? (
                                <div className="spinner-border text-dark" style={{ fontSize: 1, width: '1rem', height: '1rem' }} role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            ) : 'Book'}
                        </button>
                    </div>

                
                </form>
            </div>
            <div className="col-12 col-sm-6 col-md-4 my-3 d-flex justify-content-end  ">
                <div className="table-responsive py-3 w-100">
                    <h3 className="text-center">Movie Details</h3>
                    <table className="table table-dark table-hover">
                        <tbody>
                            <tr>
                                <td className="left-td">Name</td>
                                <td className='text-uppercase'>{movie.name}</td>
                            </tr>
                            <tr>
                                <td className="left-td">Rate</td>
                                <td>{movie.rating}</td>
                            </tr>
                            <tr>
                                <td className="left-td">Language</td>
                                <td className='text-uppercase'>{movie.lang}</td>
                            </tr>
                            <tr>
                                <td className="left-td">Kind</td>
                                <td>
                                    {movie.kinds && movie.kinds.map( (kind, ind)=> (<span key={ind}>{!ind == 0 ? ',' : ''} {kind.title}</span>) )}
                                </td>
                            </tr>
                            <tr>
                                <td className="left-td">Category</td>
                                <td>{movie.category && movie.category.title}</td>
                            </tr>
                            <tr>
                                <td className="left-td">Duration</td>
                                <td>{movie.duration}</td>
                            </tr>
                            <tr>
                                <td className="left-td">Release Date</td>
                                <td>{movie.release_date}</td>
                            </tr>
                            <tr>
                                <td className="left-td">Revenue</td>
                                <td>${movie.movie_renevues}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default BookingPhase1;
