import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
import { Link, Navigate, Outlet } from "react-router-dom";
import logo from '../assets/img/logo 102.png'
import menu from '../assets/img/menu.png'
import search from '../assets/img/search-icon.png'
import userProfileIcon from '../assets/img/profile-user.png'
import movieIcon from '../assets/img/video-camera.png'
import theaterIcon from '../assets/img/theater.png'
import categoriesIcon from '../assets/img/categories.png'
import logoutIcon from '../assets/img/logout.png'
import { useNavigate } from 'react-router-dom';
import Toast from "./core/Toast";


function AppLayout(){

    const {user, token, kinds, error, notification, setKinds, setUser, setToken, setError, setNotification} = useStateContext();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    if(!token) {
        return <Navigate to="/login"></Navigate>
    }
    const [searchInput, setSearchInput] = useState('');

    const onSubmitSearch = (e) => {
        e.preventDefault();
        navigate(`/home/search/${searchInput}`);
    }

    useEffect(() => {
        
        setLoading(true);
        axiosClient.get('/user')
            .then(({ data }) => {
                setUser(data.user);
                setKinds(data.kinds);
                setLoading(false);
            })
            .catch(({ err }) => {
                setLoading(false)
                setError(err);
                setNotification({message: 'Something went wrong', type: 'danger'});
            }); 
        
    }, []);

    const logout = (e) => {
        e.preventDefault();
        axiosClient.post('/logout')
        .then(()=> {
            setUser({});
            setToken(null);
            setKinds({});
            navigate('/login')
        })
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-main2">
                <div className="container-fluid px-sm-3 px-lg-5 px-xl-5 px-1 ">
                    <Link to="/" className="navbar-brand">
                        CINEMA
                        <img src={logo} alt="Logo" width="24" height="24" className="d-inline-block align-text-top"/>
                    </Link>
                    <button className="navbar-toggler  border-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <img src={menu}></img>
                    </button>
                    <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/home" className="nav-link active" aria-current="page">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/home/movies'} className="nav-link" >Movies</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/home/theaters'} className="nav-link">Theaters</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/home/top-10-movies'} className="nav-link" >Top 10 Movies</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Kinds
                                </a>
                                <ul className="dropdown-menu bg-main mb-3">
                                    {!loading && kinds.map((kind) => (
                                        <li key={kind.id}><Link to={`/home/movies/kind/${kind.id}`} className="dropdown-item">{kind.title}</Link></li>
                                    ))}
                                </ul>
                            </li>
                            
                        </ul>
                        <div className="d-flex">
                            <form className="d-flex" role="search" onSubmit={onSubmitSearch}>
                                <input className="form-control me-2 search-input" 
                                value={searchInput} onChange={(e) => setSearchInput(e.target.value)}  
                                type="search" name="search" placeholder="Search movies or theaters" aria-label="Search"/>

                                <button className="btn btn-primary btn-bg-2 search-btn" type="submit">
                                    <img src={search} className="btn-logo" alt=""/>
                                </button>
                            </form>
                            <div className="btn-group">
                                <button type="button" className="btn border-none bg-black profile-icon" data-bs-toggle="dropdown" aria-expanded="true">
                                    <img src={userProfileIcon} width="24" alt=""/>
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end bg-main">
                                    <li><Link to={'/home/profile'} className="dropdown-item " ><img src={userProfileIcon} className="btn-logo" width="24" alt=""/> Profile</Link></li>
                                    <li><Link to={'/home/bookings'} className="dropdown-item " > <img src={movieIcon} className="btn-logo" width="24" alt=""/> My Bookings</Link></li>
                                    <li><Link to={'/home/theaters'} className="dropdown-item " > <img src={theaterIcon} className="btn-logo" width="24" alt=""/> Theaters</Link></li>
                                    <li><Link to={'/home/top-10-movies'} className="dropdown-item" > <img src={categoriesIcon} className="btn-logo" width="24" alt=""/> Top 10</Link></li>
                                    <li>
                                        <button className="dropdown-item" type="button" onClick={logout}>
                                            <img src={logoutIcon} className="btn-logo" width="24" alt=""/>
                                            logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="min-h-100">
                <Outlet></Outlet>
            </div>

            <footer className="bg-main2 mt-5">
                <div className="container">
                    <div className="row row-cols-2 row-cols-md-2">
                        <div className="col d-flex justify-content-start align-items-center flex-column">
                            <img src={logo} alt="Logo" width="100" height="100" className="d-inline-block mt-5"/>
                            <p className=" text-uppercase text-center py-4">Copyright © {new Date().getFullYear()}. All Rights Reserved</p>
                        </div>
                        <div className="col py-5 d-flex justify-content-end align-items-center flex-column">
                            <h5 className="text-uppercase">Quick Links</h5>
                            <ul className="">
                                <li className="nav-item">
                                    <Link to={'/home/movies'} className="nav-link text-uppercase" >Movies</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/home/theaters'} className="nav-link text-uppercase" >Theaters</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/home/top-10-movies'} className="nav-link text-uppercase" >Top 10 Movies</Link>
                                </li>
                                <li className="nav-item">
                                    <button onClick={logout} className="nav-link text-uppercase" href="#">logout</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>

            {notification && <Toast />}
        </>
    )
}

export default AppLayout;