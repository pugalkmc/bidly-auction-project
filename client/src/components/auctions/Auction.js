import React, { useEffect, useState } from "react";
import api from "../api/api"; // Adjust the import path as needed
import "./css/Auction.css";

const Auction = ({ data }) => {
  const [auctionData, setAuctionData] = useState(data);
  const [bidAmount, setBidAmount] = useState(0);
  const [message, setMessage] = useState("");
  const user = localStorage.getItem("_id");
  const [show, setShow] = useState(false);
  const [biddingErrorMessage, setBiddingErrorMessage] = useState("");
  const [ isWatchList , setIsWatchList ] = useState(false)

  const watchListCheck = async()=>{
    const getWatchList = await api.get(`/auction/watchlist/${data._id}`);
    if (getWatchList.data.data){
      setIsWatchList(true);
    }
  }

  const toggleWatchList = async()=>{
    const toggleWatchList = await api.post(`/auction/watchlist/${data._id}`,{

    })
    setIsWatchList(toggleWatchList.data.data)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/auction/bidding/${auctionData._id}`);
        const getHighestBid = response.data.data.bidAmount;
        if (getHighestBid === undefined) {
          getHighestBid = 0;
        }
        setAuctionData((prevData) => ({
          ...prevData,
          highestBid: getHighestBid,
        }));
      } catch (error) {
        console.error("Error fetching highest bid:", error);
      }
    };
    watchListCheck()
    const interval = setInterval(() => {
      fetchData();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const submitBid = async () => {
    try {
      if (bidAmount <= auctionData.highestBid) {
        biddingErrorMessage(
          `Minimum bit amount cannot be less than previous bid`
        );
      }
      if (bidAmount) {
        const response = await api.post(`/auction/bidding/${auctionData._id}`, {
          bidAmount: bidAmount,
        });
        if (response.status === 200) {
          setMessage("Bid placed successfully!");
          setBiddingErrorMessage("");
          setShow(!show);
        } else {
          setBiddingErrorMessage(response.data.error);
        }
      } else {
        setBiddingErrorMessage("Please enter a valid bid amount.");
      }
    } catch (error) {
      console.error("Error placing bid:", error);
      setBiddingErrorMessage("An error occurred while placing the bid.");
    }
  };

  return (
    <div
      className="card p-3"
      style={{ boxShadow: "0px 0px 5px rgb(200,200,200)" }}
    >
      <div className="card-body">
        <div className="card-title d-flex align-items-center" style={{justifyContent:"space-between"}}> 
          <h3>{auctionData.title}</h3>
          <div onClick={()=>toggleWatchList()}>
          <i class={`bi ${isWatchList ? 'bi-heart-fill' : 'bi-heart'}`} style={{color:'red'}}></i>
          </div>
        </div>
        <p className="card-text">{auctionData.description}</p>
      </div>
      <img
        src={auctionData.imageUrl}
        style={{ borderRadius: "5px", height: "300px" }}
        alt="Auction"
      />
      <p className="card-text">
        <strong>Ends In:</strong> {auctionData.endsIn}
      </p>
      <p className="card-text">
        <strong>Auction By:</strong> {auctionData.username}
      </p>
      <p className="card-text">
        <strong>Initial Bid:</strong> {auctionData.initialBid}
      </p>
      <p className="card-text">
        <strong>Highest Bid:</strong> {auctionData.highestBid}
      </p>
      {user !== auctionData.auctionBy ? (
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target={`${auctionData._id}`}
          onClick={() => setShow(!show)}
        >
          Make a Bid
        </button>
      ) : (
        <div>
          <p className="text-success">You created this auction</p>
        </div>
      )}
      <div className={`modal ${show ? "d-block" : ""}`} id={auctionData._id}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="text">{auctionData.title}</h5>
              <button
                className="btn btn-close"
                onClick={() => setShow(!show)}
              ></button>
            </div>
            <div className="modal-body">
              <form className="form-group">
                <p>{auctionData.highestBid}</p>
                <label htmlFor="inputField" className="form-label">
                  Enter bidding amount in $dollars
                </label>
                <input
                  id="inputField"
                  className="form-control"
                  type="number"
                  placeholder={0}
                  min={auctionData.highestBid + 1}
                  onChange={(e) => setBidAmount(e.target.value)}
                />
              </form>
              <p className="text-danger">{biddingErrorMessage}</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-primary" onClick={submitBid}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <p>{message}</p>
    </div>
  );
};

export default Auction;
