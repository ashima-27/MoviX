import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.scss';
import useFetch from '../../../hooks/useFetch';
import { useSelector } from 'react-redux';
import Img from "../../../components/lazyLoadImage/Img.jsx";
import ContentWrapper from '../../../components/contentWrapper/contentWrapper.jsx';

export default function HeroBanner() {
    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const { url } = useSelector((state) => state.home);
    // console.log("herourl",url)
    const { data, loading } = useFetch("/movie/upcoming");

    useEffect(() => {
        console.log("bgdata:",data)
           const bg = url?.backdrop + data?.results?.[Math.floor(Math.random()*20)]?.backdrop_path;
           setBackground(bg)
           

       
    }, [data, url?.backdrop])

    const searchQueryHandler = (event) => {
        if (event.key === 'Enter' && query.length > 0) {
            navigate(`/search/${query}`)
        }
    }
    return (
        <div className='heroBanner'>

            {true && 
            <div className='backdrop-img'>
                <Img src={background} />
            </div>
            }
            <div className="opacity-layer"></div>

            <ContentWrapper>
                <div className='wrapper'>
                    <div className='heroBannerContent'>
                        <span className='title'>
                            Welcome
                        </span>
                        <span className='subTitle'>
                            Millions of movies ,TV shows and people to discover. Explore Now
                        </span>
                        <div className='searchInput'>
                            <input type="text" placeholder='Search for movie or tv show...' onKeyUp={searchQueryHandler} onChange={(e) => setQuery(e.target.value)} />
                            <button>Search</button>
                        </div>
                    </div>
                </div>
            </ContentWrapper>
        </div>

    )
}
