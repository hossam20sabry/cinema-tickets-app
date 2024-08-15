import { Link, Navigate, Outlet } from "react-router-dom";
import { useContext, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import logo from '../assets/img/logo 102.png'
import menu from '../assets/img/menu.png'
import search from '../assets/img/search-icon.png'
import userProfileIcon from '../assets/img/profile-user.png'
import movieIcon from '../assets/img/video-camera.png'
import theaterIcon from '../assets/img/theater.png'
import categoriesIcon from '../assets/img/categories.png'
import logoutIcon from '../assets/img/logout.png'
function GuestLayout(){

    const {token} = useStateContext();
    
    const [loading, setLoading] = useState(true);
    if(token){
        return <Navigate to="/home"></Navigate>
    }

    return(
        <>
        
        <nav class="navbar navbar-expand-lg bg-main2">
            <div class="container-fluid px-sm-3 px-lg-5 px-xl-5 px-1 ">
                <Link to={'/'} class="navbar-brand" >
                    CINEMA
                    <img src={logo} alt="Logo" width="24" height="24" class="d-inline-block align-text-top"/>
                </Link>
                <button class="navbar-toggler border-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <img src={menu}></img>
                </button>
                <div class="collapse navbar-collapse justify-content-between" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Movies</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Theaters</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Top 10 Movies</a>
                        </li>
                        
                        
                    </ul>
                    <div class="d-flex">
                        <form class="d-flex" role="search">
                            <input class="form-control me-2 search-input" type="search" placeholder="Search movies or theaters" aria-label="Search"/>
                            <button class="btn btn-primary btn-bg-2 search-btn" type="submit">
                                <img src={search} class="btn-logo" alt=""/>
                            </button>
                        </form>
                        <Link to={'/login'} class="btn btn-primary bg-black border-none mx-2">Login</Link>
                        <Link to={'/register'} class="btn btn-primary btn-bg-2  border-none">Register</Link>
                    </div>
                </div>
            </div>
        </nav>
            <Outlet></Outlet>
        <footer class="bg-main2 mt-5">
            <div class="container">
                <div class="row row-cols-2 row-cols-md-2">
                    <div class="col d-flex justify-content-start align-items-center flex-column">
                        <img src={logo} alt="Logo" width="100" height="100" class="d-inline-block mt-5"/>
                        <p class=" text-uppercase text-center py-4">Copyright © {new Date().getFullYear()}. All Rights Reserved</p>
                    </div>
                    <div class="col py-5 d-flex justify-content-end align-items-center flex-column">
                        <h5 class="text-uppercase">Quick Links</h5>
                        <ul class="">
                            <li class="nav-item">
                                <a class="nav-link text-uppercase" href="#">Movies</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-uppercase" href="#">Theaters</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-uppercase" href="#">Top 10 Movies</a>
                            </li>
                            <li class="nav-item">
                                <Link to={'/register'} class="nav-link text-uppercase">Signup</Link>
                            </li>
                            <li class="nav-item">
                                <Link to={'/login'} class="nav-link text-uppercase">login</Link>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </footer>
        </>
    )
}

export default GuestLayout;