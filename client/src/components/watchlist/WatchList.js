import { useEffect, useState } from "react";
import api from "../api/api";
import Auction from "../auctions/Auction";
import NoAuction from "../auctions/NoAuction";

const WatchList = ()=>{
    const [watchList , setWatchList ] = useState([])

    useEffect(()=>{
        const fetchWatchList = async ()=>{
            try {
                const response = await api.get('/auction/watchlist/all');
                if (response.status===200){
                    const getWatchList = [];
                    for (const data of response.data.data) {
                        const getEachAuction = await api.get(`/auction/${data.auctionId}`);
                        getWatchList.push(getEachAuction.data.data);
                    }
                    setWatchList(getWatchList);
                } else {
                    alert('Error occurred while fetching watchlist data');
                }
            } catch (error) {
                console.error('Error fetching watchlist data:', error);
                alert('Error occurred while fetching watchlist data');
            }
        };
        fetchWatchList();
    },[]);

    console.log("WatchList:", watchList);

    return (
        <div className="container pt-4">
            {
                watchList.length ? (
                    <div className="row">
                     {watchList.map((data,index)=> (
                        <div className="col-sm-12 col-md-6" key={index}>
                            <Auction data={data}></Auction>
                        </div>
                    ))}
                    </div>
                ) : (
                    <NoAuction></NoAuction>
                )
            }
        </div>
    );
};

export default WatchList;
