import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../../axios-client';
import { useStateContext } from '../../../contexts/ContextProvider';
// import {spinner} from '../../../assets/img/spinner.gif';


function Seat({booking, seat}) {  

    const [seatLoading, setSeatLoading] = useState(false);
    const [classs, setClasss] = useState('seat');
    const {setNotification, user} = useStateContext();
    const navigate = useNavigate();
    
    useEffect(() => {
        if(seat.apearance === 1){
            setClasss('fake_seat')
        }
        

        let booked = 0;
        for(let i = 0; i < seat.bookings.length; i++){
            if(seat.bookings[i].show_time_id === booking.show_time_id){
                booked = 1; 
                break;
            }
        }
        if(booked === 1){
            setClasss('seat occupied')
        }

        let ch = 0;
        for(let i = 0; i < seat.bookings.length; i++){
            if(seat.bookings[i].show_time_id === booking.show_time_id && seat.bookings[i].user_id === user.id && seat.bookings[i].id == booking.id){
                ch = 1;
                break;
            }
        }
        if(ch === 1){
            setClasss('seat selected')
        }

    }, [seat, booking])

    const onSubmitSeat = (seat_id) => {
        setSeatLoading(true)
        if(classs.includes('selected')){
            axiosClient.post('/bookings/seat/unSelect', {booking_id: booking.id, seat_id: seat_id})
            .then(({data}) => {
                if(data.status === 404){
                    navigate('/home/404')
                    
                } else if(data.status === 400){
                    setNotification({message: data.msg, type: 'danger'})
                    setSeatLoading(false)
                }
                else
                {
                    console.log(data)
                    setSeatLoading(false)
                    setClasss('seat')
                }
            })
            .catch(({err}) => {
                console.log(err)
                setSeatLoading(false)
            })
        }
        else if(classs.includes('occupied')){
            setSeatLoading(false)
            setNotification({message: 'This seat is already booked', type: 'danger'})
        }
        else{
            axiosClient.post('/bookings/seat/select', {booking_id: booking.id, seat_id: seat_id})
            .then(({data}) => {
                if(data.status === 404){
                    navigate('/home/404')
                } else if(data.status === 400){
                    setNotification({message: data.msg, type: 'danger'})
                    setSeatLoading(false)
                }
                else{
                    console.log(data)
                    setSeatLoading(false)
                    setClasss('seat selected')
                }

            })
            .catch(({err}) => {
                console.log(err)
                setSeatLoading(false)
            })
            
        }
    }
    
    return (
        <div>
            {seatLoading ? 
            <div className={classs}>
                <div className="spinner-border text-light" style={{ fontSize: 1 , width: '1rem', height: '1rem' }} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            </div> 
            : 
            <a className={classs}  data-seat-id="" onClick={() => onSubmitSeat(seat.id)}>
                {seat.apearance === 0 ? seat.number : ''}
            </a>
            }
        </div>
    );
}

export default Seat;
