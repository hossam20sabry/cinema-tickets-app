import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import TheaterCard from "../../../components/home/TheaterCard";
import PaginationLinks from "../../../components/core/PaginationLinks";
import Loader from "../../../components/core/Loader";
import TheaterContainer from "../../../components/home/TheaterContainer";


function Theaters(){
    const [theaters, setTheaters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [meta, setMeta] = useState({});

    const getTheaters = (url) => {
        url = url || '/theaters';
        setLoading(true)
        axiosClient.get(url)
        .then(({data})=>{
            setTheaters(data.theaters.data)
            setMeta(data.theaters)
            setLoading(false)
        })
    }

    const onPageClick = (link) => {
        getTheaters(link.url);
    }

    useEffect(()=>{
        getTheaters();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, [])



    return (
        <>
            <div className="container-fluid vh-100 px-lg-5">
                {loading && 
                    <Loader />
                }
                {!loading &&
                    <div className="vh-100">
                        <TheaterContainer theaters={theaters} meta={meta} onPageClick={onPageClick} title={"Theaters"} btn={"View All Theaters"} btnLink={'/theaters'} />
                    </div>
                }
            </div>
        </>
    )
}

export default Theaters;