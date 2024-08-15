import { useEffect, useRef, useState } from "react";
import axiosClient from "../../axios-client";
import { Link, useNavigate } from "react-router-dom";
import wideImage from '../../assets/img/movies/1706539410.jpg'
import poster from '../../assets/img/posters/1706539410.jpg'
import theater from '../../assets/img/cinema_photos/1706299231.png'
import logo from '../../assets/img/logo 102.png'
import movie from '../../assets/img/video-camera.png'
import MovieCard from "../../components/home/MovieCard";
import TheaterCard from "../../components/home/TheaterCard";
import Loader from "../../components/core/Loader";
import MoviesContainer from "../../components/home/MoviesContainer";
import TheaterContainer from "../../components/home/TheaterContainer";



function Home(){
    const [movies, setMovies] = useState([]);
    const [top10, setTop10] = useState([]);
    const [upcomingMoviesp, setUpcomingMoviesp] = useState([]);
    const [theaters, setTheaters] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    useEffect(()=>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
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

    const onClick = (id) => {
        axiosClient.post('/bookings/store', {movie_id: id})
        .then(({data}) => {
            console.log(data)
            navigate('/home/booking/'+data.id)
        })
    }

    return (
        <>
        {loading && 
            <Loader />
        }
        {!loading &&
        (
            <div>
                <main>
                    <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-indicators">
                            {movies.map((movie, index) => (
                                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={index} className={index==0?"active":''} aria-current="true" aria-label={`Slide ${index+1}`} key={movie.id}></button>
                            ))}
                        </div>
                        <div className="carousel-inner">
                            {movies.map((movie, index) => (
                                <div className={"carousel-item "+(index==0?"active":"")} key={movie.id}>
                                    <img src={'http://127.0.0.1:8000/photos/'+movie.photo_url} className="carousel-img" alt="..."/>
                                    <div className="carousel-caption">
                                        <h5 className="text-common text-uppercase">{movie.name}</h5>
                                        <p className="text-capitalize">{movie.director} - {movie.duration} - {movie.rating}/10 - categoty:  {movie.category.title}</p>
                                        <button onClick={() => onClick(movie.id)} className="btn btn-primary btn-bg">Get Tickets</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>

                {/* movies and theaters  */}
                <div className="container-fluid px-3 px-sm-5 px-md-4  my-3">

                    {/* <!-- upcoming movies --> */}
                    <MoviesContainer title={"Upcoming Movies"} movies={upcomingMoviesp} btn={"View All Movies"} btnLink={"/home/movies"} />

                    {/* <!-- top 10 movies --> */}
                    <MoviesContainer title={"Top 5"} movies={top10} btn={"View All Movies"} btnLink={"/home/movies"} top10={true} />

                    {/* <!-- Theaters --> */}
                    <TheaterContainer title={"Theaters"} theaters={theaters}  btn={"View All Theaters"} btnLink={"/home/theaters"} />
                </div>

            </div>
        )}
        </>
    )
}

export default Home;