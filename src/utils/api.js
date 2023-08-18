import axios from "axios";
// https://www.themoviedb.org/movie/top-rated
const BASE_URL ="https://api.themoviedb.org/3";
const TMDB_TOKEN=process.env.REACT_APP_TMDB_TOKEN;

const headers ={
    // Authorization:"Bearer TMDB_TOKEN",
   accept: 'application/json',
   Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMWMwNThkZWZkYzYyZDI2MzNjNzg3ZTUxOTdiMjhhMCIsInN1YiI6IjYyNjNmNWMyMmZkZWM2MDBhN2YwNGY5NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LVaK7DTlV3JkuG3kiPS9EfqF8DOS7chEXwGEmO09KaQ'
}
export const fetchDataFromApi= async (url,params)=>{
    console.log("h",TMDB_TOKEN)
    try{
        const data= await fetch(BASE_URL + url,{
            method:'GET',
            headers,
            params
        })
        // const res = await data.json();
        return data;
    }catch(err){
        console.log(err);
        return err;
    }
}