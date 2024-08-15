import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../../axios-client';
import MoviesContainer from './MoviesContainer';
import Loader from '../core/Loader';
import TheaterContainer from './TheaterContainer';

function Search() {
    const {search} = useParams();
    const [movies, setMovies] = useState([]);
    const [theaters, setTheaters] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axiosClient.get(`/search/${search}`)
        .then(({data}) => {
            setMovies(data.movies)
            setTheaters(data.theaters)
            setLoading(false)
        })
        .catch((error) => {
            console.error('There was an error!', error);
            setLoading(false)
        });
    }, [search])


    return (
        <div className="container-fluid px-lg-5 vh-100">
            {movies.length === 0 && theaters.length === 0 &&  !loading &&
                <div className="row my-3 d-flex align-items-center justify-content-center">
                        <h1 className="text-common text-uppercase text-center">No Results Found</h1>
                </div>
            }
            {loading && <Loader />}
            {!loading &&  movies.length > 0 &&
                <MoviesContainer title={`Movies Search: ${search}`}  movies={movies} />
            }
            {!loading && theaters.length > 0 &&
                <TheaterContainer title={`Theaters Search: ${search}`} theaters={theaters} />
            }
        </div>
    );
}

export default Search;
