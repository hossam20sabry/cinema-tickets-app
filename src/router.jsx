import { Navigate, createBrowserRouter } from 'react-router-dom';
import GuestLayout from './components/GuestLayout';
import AppLayout from './components/AppLayout';
import NotFound from './views/errors/NotFound';
import Unauthorized from './views/errors/Unauthorized';
import Register from './views/auth/Register';
import Login from './views/auth/Login';
import Home from './views/home/Home';
import Movies from './views/home/movies/Movies';
import Theaters from './views/home/theaters/Theaters';
import GuestPage from './components/GuestPage';
import TheaterShow from './views/home/theaters/TheaterShow';
import Top10 from './views/home/movies/Top10';
import Search from './components/home/Search';
import KindMovies from './views/home/KindMovies';
import Profile from './views/auth/Profile';
import Booking from './views/home/booking/Booking';
import Thanks from './components/home/Thanks';
import MyBookings from './views/home/booking/MyBookings';
import BookingShow from './views/home/booking/BookingShow';
const router = createBrowserRouter([
    {
        path: '/',
        element: <GuestLayout></GuestLayout>,
        children: 
        [
            {
                path: '/',
                element: <Navigate to="/login"></Navigate>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            
        ]
    },

    {
        path: '/',
        element: <AppLayout></AppLayout>,
        children: 
        [
            {
                path: '/',
                element: <Navigate to="/home"></Navigate>
            },
            {
                path: '/home',
                element: <Home></Home>
            },
            {
                path: '/home/profile',
                element: <Profile></Profile>
            },
            {
                path: '/home/movies',
                element: <Movies></Movies>
            },
            {
                path: '/home/top-10-movies',
                element: <Top10 />
            },
            {
                path: '/home/search/:search',
                element: <Search></Search>
            },
            {
                path: '/home/movies/kind/:id',
                element: <KindMovies />
            },
            {
                path: '/home/theaters',
                element: <Theaters></Theaters>
            },
            {
                path: '/home/theater/:id',
                element: <TheaterShow />
            },
            {
                path: '/home/bookings',
                element: <MyBookings />
            },
            {
                path: '/home/bookings/:id',
                element: <BookingShow />
            },
            {
                path: '/home/booking/:id',
                element: <Booking />
            },
            {
                path: '/home/booking/:id/theater/:theater_id',
                element: <Booking />
            },
            {
                path: '/home/booking/thanks/:id',
                element: <Thanks />
            },

        ]
    },



    {
        path: '*',
        element: <NotFound></NotFound>
    },
    {
        path: '/403',
        element: <Unauthorized></Unauthorized>
    }
])

export default router;