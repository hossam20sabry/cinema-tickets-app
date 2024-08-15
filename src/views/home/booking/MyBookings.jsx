import React, { useEffect, useState } from 'react';
import axiosClient from '../../../axios-client';
import { useStateContext } from '../../../contexts/ContextProvider';
import Loader from '../../../components/core/Loader';
import { Link } from 'react-router-dom';

function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const { setNotification } = useStateContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = 'My Bookings';
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        axiosClient.get('/bookings/my-bookings')
            .then(({ data }) => {
                setBookings(data.bookings);
                console.log(data.bookings);
                setLoading(false);
            })
            .catch((err) => {
                setNotification({ message: 'Something went wrong', type: 'danger' });
                console.log(err);
            });

    }, []);

    return (
        <div className="container px-lg-5 mt-5">
            {loading && <Loader />}
            {bookings.length > 0 ? (
                <div>
                    <h3 className="pb-1 mb-2 border-bottom">My Bookings</h3>
                    <table className="table table-dark table-striped text-center">
                        <thead>
                            <tr>
                                <th className="text-uppercase">movie</th>
                                <th className="text-uppercase">theater</th>
                                <th className="text-uppercase">time</th>
                                <th className="text-uppercase table_responsive">tickets</th>
                                <th className="text-uppercase table_responsive">total price</th>
                                <th className="text-uppercase">show</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking) => (
                                <tr key={booking.id}>
                                    <td className="text-capitalize">{booking.movie.name}</td>
                                    <td className="text-capitalize">{booking.show_time.theater.name}</td>
                                    <td className="text-capitalize ">{new Date(booking.show_time.date).toLocaleDateString()} <br /> {booking.show_time.start_time}</td>
                                    <td className="text-capitalize table_responsive">{booking.total_seats}</td>
                                    <td className="text-capitalize table_responsive">{booking.total_price}</td>
                                    <td>
                                        <Link to={`/home/bookings/${booking.id}`} className="btn btn-primary">show</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <h3>No bookings found</h3>
            )}
        </div>
    );
}

export default MyBookings;
