import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import logo from '../../../assets/img/logo.png'
import { Link } from "react-router-dom";
import MovieCard from "../../../components/home/MovieCard";
import PaginationLinks from "../../../components/core/PaginationLinks";
import MoviesContainer from "../../../components/home/MoviesContainer";
import Loader from "../../../components/core/Loader";
function Movies(){

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [meta, setMeta] = useState({});

    const getMovies = (url) => {
        url = url || '/movies';
        setLoading(true)
        axiosClient.get(url)
        .then(({data})=>{
            setMovies(data.movies.data)
            setMeta(data.movies)
            setLoading(false)
        })
    }
    const onPageClick = (link) => {
        getMovies(link.url);
    }

    useEffect(()=>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        getMovies();
    }, [])

    return(
        <>
            <div className="container-fluid px-lg-5">
                {loading && 
                    <Loader />
                }
                {!loading &&
                <div className="vh-100">
                    <MoviesContainer
                        movies={movies}
                        meta={meta}
                        onPageClick={onPageClick}
                        title={"Movies"}
                    />
                </div>
                }
            </div>
        </>
    )
}

export default Movies;