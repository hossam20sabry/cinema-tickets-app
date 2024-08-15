import React from 'react';
import PaginationLinks from '../core/PaginationLinks';
import MovieCard from './MovieCard';
import { Link } from 'react-router-dom';

function MoviesContainer({title, movies, meta, onPageClick, btn, btnLink, top10}) {
    return (
        
        <div>
            <div className="row my-3  border-bottom">
                <div className="col-6">
                    <h1 className="text-common text-uppercase">{title}</h1>
                </div>
                {btn && <div className="col-6 text-end">
                    <Link to={btnLink} className="btn btn-primary btn-bg-2">{btn}</Link>
                </div>}
                
            </div>
            <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-4 mb-5">
                {movies && movies.map((movie, index) => (
                    <MovieCard key={index} id={movie.id} name={movie.name} index={index}  top10={top10}  poster_url={movie.poster_url} />
                ))}
            </div>
            
            {/* pagination */}
            {meta &&
                <div className="row ">
                    <PaginationLinks meta={meta} onPageClick={onPageClick} />
                </div>
            }
        </div>
        
    );
}

export default MoviesContainer;
