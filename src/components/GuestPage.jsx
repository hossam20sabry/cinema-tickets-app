import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axiosClient from '../axios-client';
import logo from '../assets/img/logo 102.png'
import wideImage from '../assets/img/movies/1706539410.jpg'
import poster from '../assets/img/posters/1706539410.jpg'
import theater from '../assets/img/cinema_photos/1706299231.png'
import movie from '../assets/img/video-camera.png'

function GuestPage() {


    const [movies, setMovies] = useState([]);
    const [top10, setTop10] = useState([]);
    const [upcomingMoviesp, setUpcomingMoviesp] = useState([]);
    const [theaters, setTheaters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [searchTheater, setSearchTheater] = useState('');
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        setLoadingMovies(true)
        axiosClient.get('/movies/search', { params: { search } })
        .then(({data})=>{
            setLoadingMovies(false)
            setMovies(data.movies)
        })
        .catch(({err})=>{
            setLoadingMovies(false)
            console.log(err)
        })
    }

    const onSubmitTheater = (e) => {
        e.preventDefault();
        setLoadingTheaters(true)
        axiosClient.get('/theaters/search', { params: { searchTheater } })
        .then(({data})=>{
            setLoadingTheaters(false)
            setTheaters(data.theaters)
        })
        .catch(({err})=>{
            setLoadingTheaters(false)
            console.log(err)
        })
    }

    useEffect(()=>{
        document.title = "Cinema Tickets . Home"
        axiosClient.get('/home')
        .then(({data})=>{
            setMovies(data.explores)
            setUpcomingMoviesp(data.upcomingMovies)
            setTop10(data.top10)
            setTheaters(data.theaters)
            setLoading(false)
        })
    }, [])

    return (
        <>
        {loading && 
        <div className="container">
            <div className="row vh-100">
                <div className="col-12 my-3 d-flex align-items-center justify-content-center">
                    Loading...
                </div>
            </div>
        </div>
        }
        {!loading &&
        (
            <div>
                <main>
                    <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-indicators">
                            {movies.map((movie, index) => (
                                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={index} className="active" aria-current="true" aria-label={`Slide ${index+1}`} key={movie.id}></button>
                            ))}
                        </div>
                        <div className="carousel-inner">
                            {movies.map((movie, index) => (
                                <div className={"carousel-item "+(index==0?"active":"")} key={movie.id}>
                                    <img src={'http://127.0.0.1:8000/photos/'+movie.photo_url} className="carousel-img" alt="..."/>
                                    <div className="carousel-caption">
                                        <h5 className="text-common text-uppercase">{movie.name}</h5>
                                        <p className="text-capitalize">{movie.director} - {movie.duration} - {movie.rating}/10</p>
                                        <button type="button" className="btn btn-primary btn-bg">Get Tickets</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>

                {/* movies and theaters  */}
                <div className="container-fluid px-3 px-sm-5 px-md-4  my-3">

                    {/* <!-- upcoming movies --> */}
                    <div className="row mb-3  border-bottom">
                        <div className="col-6">
                            <h1 className="text-common text-uppercase">Upcoming Movies</h1>
                        </div>
                        <div className="col-6 text-end">
                            <a href="#" className="btn btn-primary btn-bg-2">View All Movies</a>
                        </div>
                    </div>
                    <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-4 mb-5">
                        {upcomingMoviesp && upcomingMoviesp.map((movie, index) => (
                            <div className="d-flex align-items-center justify-content-center" key={movie.id}>
                                <div className="movie-card">
                                    <img src={'http://127.0.0.1:8000/posters/'+movie.poster_url} alt=""/>
                                    <div className="movie-card-content pt-5">
                                        <h3 className="pt-5 text-capitalize">{movie.name}</h3>
                                        <button className="btn btn-primary btn-bg-2">
                                            <img src={logo} className="btn-logo" alt=""/>
                                            Tickets
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        
                        
                    </div>

                    {/* <!-- top 10 movies --> */}
                    <div className="row mb-3  border-bottom">
                        <div className="col-6">
                            <h1 className="text-common text-uppercase">top 10 movies</h1>
                        </div>
                        <div className="col-6 text-end">
                            <a href="#" className="btn btn-primary btn-bg-2">View All Movies</a>
                        </div>
                    </div>
                    <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-4 mb-5">
                        {top10 && top10.map((movie, index) => (
                            <div className="d-flex align-items-center justify-content-center" key={index}>
                                <div className="movie-card">
                                    <img src={'http://127.0.0.1:8000/posters/'+movie.poster_url} alt=""/>
                                    <div className="movie-card-content pt-5">
                                        <h3 className="p-5">{index+1}</h3>
                                        <h3 className="pt-5 text-capitalize">{movie.name}</h3>
                                        <button className="btn btn-primary btn-bg-2">
                                            <img src={logo} className="btn-logo" alt=""/>
                                            Tickets
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        
                    </div>

                    {/* <!-- Theaters --> */}
                    <div className="row mb-3  border-bottom">
                        <div className="col-6">
                            <h1 className="text-common text-uppercase">Theaters</h1>
                        </div>
                        <div className="col-6 text-end">
                            <a href="#" className="btn btn-primary btn-bg-2">View All Theaters</a>
                        </div>
                    </div>
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 g-4 mb-5">
                        {theaters && theaters.map((theater, index) => (
                            <div className="d-flex align-items-center justify-content-center" key={index}>
                                <div className="movie-card2">
                                    <img src={'http://127.0.0.1:8000/cinema_photos/'+theater.img} alt=""/>
                                    <div className="movie-card-content pt-5">
                                        <h3 className="pt-5 text-capitalize">{theater.name}</h3>
                                        <button className="btn btn-primary btn-bg-3">
                                            <img src={movie} className="btn-logo" alt=""/>
                                            See Movies
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        
                        
                    </div>
                </div>

            </div>
        )}
        </>
    );
}

export default GuestPage;
