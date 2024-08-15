import React from 'react';
import { Link } from 'react-router-dom';
import TheaterCard from './TheaterCard';
import PaginationLinks from '../core/PaginationLinks';

function TheaterContainer({title, theaters, meta, onPageClick, btn, btnLink}) {
    return (
        <div>
            <div className="row my-3  border-bottom">
                <div className="col-6">
                    <h1 className="text-common text-uppercase">{title}</h1>
                </div>
                {btn &&
                <div className="col-6 text-end">
                    <Link to={btnLink} className="btn btn-primary btn-bg-2">{btn}</Link>
                </div>
                }
            </div>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 g-4 mb-5">
                {theaters && theaters.map((theater, index) => (
                    <TheaterCard key={index} id={theater.id}  img={theater.img} name={theater.name} />
                ))}
                
            </div>
            {/* pagination */}
            {meta &&
            <div className="row">
                <PaginationLinks meta={meta} onPageClick={onPageClick} />
            </div>
            }
        </div>
    );
}

export default TheaterContainer;
