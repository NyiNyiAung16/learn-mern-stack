import { useEffect, useState } from "react";
import axios from "../helpers/axios";

function useFetch(api) {
    let [data,setData] = useState(null);
    let [error,setError] = useState(null);
    let [loading,setLoading] = useState(true);
    let [links,setLinks] = useState(null);

    useEffect(() => {
        // let abortController = new AbortController();
        // let signal = abortController.signal;
        let fetch = async () => {
            try{
                let res = await axios.get(api);
                if(res.status === 200) {
                    setData(res.data.data);
                    setLinks(res.data.links);
                    setLoading(false);
                    window.scroll({left:0,top:0,behavior: 'smooth'});
                }
            }catch(e) {
                setError(e.message);
                setLoading(false);
            }
        };
        fetch();
        //clean up function
        // return () => {
        //     abortController.abort();
        // }
    },[api]);
    return {data,error,loading,links,setData};
}

export default useFetch;