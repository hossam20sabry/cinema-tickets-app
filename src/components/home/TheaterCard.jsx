import React from 'react';
import movie from '../../assets/img/video-camera.png'
import axiosClient from '../../axios-client';
import { Link } from 'react-router-dom';
function TheaterCard({id, img, name}) {
    return (
        <div className="d-flex align-items-center justify-content-center">
            <div className="movie-card2">
                <img src={'http://127.0.0.1:8000/cinema_photos/'+img} alt=""/>
                <div className="movie-card-content pt-5">
                    <h3 className="pt-5 text-capitalize">{name}</h3>
                    <Link to={`/home/theater/${id}`} className="btn btn-primary btn-bg-3">
                        <img src={movie} className="btn-logo" alt=""/>
                        See Movies
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default TheaterCard;
