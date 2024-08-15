import React from 'react';
import logo from '../../assets/img/logo 102.png'
import axiosClient from '../../axios-client';
import { useNavigate } from 'react-router-dom';
function MovieCard({id, name, poster_url, index=null, top10 = null}) {

    const navigate = useNavigate();

    const onClick = () => {
        axiosClient.post('/bookings/store', {movie_id: id})
        .then(({data}) => {
            navigate('/home/booking/'+data.id)
        })
    }
    return (
        <div className="d-flex align-items-center justify-content-center" key={id}>
            <div className="movie-card">
                <img src={import.meta.env.VITE_IMG_BASE_URL+'/posters/'+poster_url} alt=""/>
                <div className="movie-card-content pt-5">
                    {top10 ? <h3>{index+1}</h3> : null}
                    <h3 className="pt-5 text-capitalize">{name}</h3>
                    <button className="btn btn-primary btn-bg-2" onClick={onClick}>
                        <img src={logo} className="btn-logo" alt=""/>
                        Tickets
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MovieCard;
