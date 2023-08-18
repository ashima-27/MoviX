import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import "./style.scss";

import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/contentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";


const SearchResult = () => {
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const { query } = useParams();
    const headers ={
        // Authorization:"Bearer TMDB_TOKEN",
       accept: 'application/json',
       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMWMwNThkZWZkYzYyZDI2MzNjNzg3ZTUxOTdiMjhhMCIsInN1YiI6IjYyNjNmNWMyMmZkZWM2MDBhN2YwNGY5NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LVaK7DTlV3JkuG3kiPS9EfqF8DOS7chEXwGEmO09KaQ'
    }
    const fetchInitialData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://api.themoviedb.org/3/search/multi?query=${query}&page=${pageNum}`, {
                headers
            });
                    const data = await response.json();
            setData(data);
            setPageNum((prev) => prev + 1);
            setLoading(false);
        } catch (error) {
            console.error(error);
           return error;
        }
        
       
    };

   const  fetchNextPageData = async() => {

    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/multi?query=${query}&page=${pageNum}`, {
            headers
        });
                const res = await response.json();
                if (data?.results) {
                    setData({
                        ...data,
                        results: [...data?.results, ...res.results],
                    });
              
                } else {
                    setData(res);
                }
                setPageNum((prev) => prev + 1);
     
    } catch (error) {
        console.error(error);
       return error;
    }
    
 
    };

    useEffect(() => {
        setPageNum(1);
        fetchInitialData();
    }, [query]);

    return (
        <div className="searchResultsPage">
            {loading && <Spinner initial={true} />}
            {!loading && (
                <ContentWrapper>
                    {data?.results?.length > 0 ? (
                        <>
                            <div className="pageTitle">
                                {`Search ${
                                    data?.total_results > 1
                                        ? "results"
                                        : "result"
                                } of '${query}'`}
                            </div>
                            <InfiniteScroll
                                className="content"
                                dataLength={data?.results?.length || []}
                                next={fetchNextPageData}
                                hasMore={pageNum <= data?.total_pages}
                                loader={<Spinner />}
                            >
                                {data?.results.map((item, index) => {
                                    if (item.media_type === "person") return;
                                    return (
                                        <MovieCard
                                            key={index}
                                            data={item}
                                            fromSearch={true}
                                        />
                                    );
                                })}
                            </InfiniteScroll>
                        </>
                    ) : (
                        <span className="resultNotFound">
                            Sorry, Results not found!
                        </span>
                    )}
                </ContentWrapper>
            )}
        </div>
    );
};

export default SearchResult;