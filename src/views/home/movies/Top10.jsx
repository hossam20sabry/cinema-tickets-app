import React, { useEffect, useState } from 'react';
import axiosClient from '../../../axios-client';
import MoviesContainer from '../../../components/home/MoviesContainer';
import Loader from '../../../components/core/Loader';

function Top10() {
    const [loading, setLoading] = useState(false);
    const [movies, setMovies] = useState([]);

    

    const getMovies = () => {
        setLoading(true);
        axiosClient.get('/movies/top-10-movies')
            .then(({ data }) => {
                setLoading(false);
                setMovies(data.movies);
            })
            .catch(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        getMovies();
    }, []);


    return (
        <div className="container-fluid px-lg-5">
            {loading && 
                <Loader />
            }
            <MoviesContainer title={"Top 10 Movies"} movies={movies} top10={true}/>
        </div>
    );
}

export default Top10;
