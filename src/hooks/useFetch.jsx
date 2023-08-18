import { useEffect,useState } from "react";
import { fetchDataFromApi } from "../utils/api";

const useFetch=(url)=>{

    const[ data,setData]=useState('');
    const [loading ,setLoading]=useState('');
    const[error,setError]=useState('');

    useEffect(()=>{
        setLoading('loading..');
        setData(null);
        setError(null);

       fetchDataFromApi(url).then(async(res)=>{
        const data = await res.json();
        setLoading(false);
        setData(data)
        console.log(data)
       }).catch((err)=>{
        setLoading(false);
        setError("something went wrong....!!");
       })
       
    },[url]);
 return {data,loading,error}

 
}

export default useFetch;