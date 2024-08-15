import React, { useEffect, useState } from 'react';
import Loader from '../../components/core/Loader';
import { useParams } from 'react-router-dom';
import axiosClient from '../../axios-client';
import MoviesContainer from '../../components/home/MoviesContainer';

function KindMovies() {
    const {id} = useParams();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        setLoading(true)
        axiosClient.get(`/movies/Kind/${id}`)
        .then(({data})=>{
            setMovies(data.movies)
            setLoading(false)
        })
        .catch(() => {
            setLoading(false);
        })
    }, [id])


    return (
        <div className="container-fluid px-lg-5 vh-100">
            {loading && <Loader />}
            {!loading &&  movies.length > 0 &&
            <div >
                <MoviesContainer
                    movies={movies}
                    title={`Movies`}
                />
            </div>
            }
            {!loading &&  movies.length === 0 &&
                <div className="vh-100 d-flex justify-content-center align-items-center">
                    <p className="text-center">No movies found</p>
                </div>
            }
            
        </div>
    );
}

export default KindMovies;
