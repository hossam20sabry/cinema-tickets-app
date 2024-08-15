import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../../../axios-client';
import MovieCard from '../../../components/home/MovieCard';
import Loader from '../../../components/core/Loader';
function TheaterShow() {
    const {id} = useParams();
    const [theater, setTheater] = useState([]);
    const [movies, setMovies] = useState([]);
    const [commingMovies, setCommingMovies] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        axiosClient(`/theaters/${id}`)
        .then(({data}) => {
            setTheater(data.theater);
            setMovies(Object.values(data.movies));
            setCommingMovies(Object.values(data.commingMovies));
            setLoading(false);
        });
    }, [id]);
    

    return (
        <div>
            {loading && 
                <Loader />
            }
            {!loading && 
            <div>
                <div className="theater-show">
                    <img src={'http://127.0.0.1:8000/cinema_photos/'+theater.img} alt="" />
                    <div className="content">
                        <div className="bg-main3 justify-content-between align-items-center flex-column p-3">
                            <h2 className="text-center text-uppercase">{theater.name} Cinemas</h2>
                            <h4 className="text-center text-uppercase">{theater.city} . {theater.location}</h4>
                        </div>
                    </div>
                    
                </div>


                {/* movies */}
                {movies.length === 0 && commingMovies.length === 0 &&
                    <h3 className="text-center text-capitalize mt-3">No Movies in {theater.name} Cinemas right now</h3>
                }
                {movies && movies.length > 0 &&
                <div className="container-fluid px-3 px-sm-5 px-md-4 mt-5">
                    <div className="row my-3  border-bottom">
                        <div className="col-6">
                            <h1 className="text-common text-uppercase">Movies in theater</h1>
                        </div>
                        
                    </div>
                    
                    <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-4 mb-5">
                        {movies && movies.map((movie, index) => (
                            <MovieCard 
                            key={index} 
                            id={movie.id} 
                            name={movie.name} 
                            index={index}  
                            poster_url={movie.poster_url}
                            
                            />
                        ))}
                    </div>
                </div>
                }

                {/* comming movies */}
                {commingMovies && commingMovies.length > 0 &&
                <div className="container-fluid px-3 px-sm-5 px-md-4 mt-5">
                    <div className="row my-3  border-bottom">
                        <div className="col-6">
                            <h1 className="text-common text-uppercase">Comming Movies</h1>
                        </div>
                        
                    </div>
                    
                    <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-4 mb-5">
                        {commingMovies && commingMovies.map((movie, index) => (
                            <MovieCard key={index} id={movie.id} name={movie.name} index={index}  poster_url={movie.poster_url} />
                        ))}
                    </div>
                </div>
                }
            </div>
                

            }
        </div>
    );
}

export default TheaterShow;
