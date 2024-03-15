import React, { useEffect, useState } from "react";
import api from "../api/api.js";
import Auction from "./Auction";
import NoAuction from "./NoAuction";
import "./css/ActiveAuction.css";

const ActiveAuction = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/auction");
        setAuctions(response.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <h1 className="loadingText">Loading...</h1>; // Corrected class name reference
  }

  if (auctions.length === 0) {
    return <NoAuction />;
  }

  const handleBid = (auctionId, bidAmount) => {
    console.log(`Bid of ${bidAmount} placed on auction ${auctionId}`);
    // Placeholder for your implementation of bid logic
  };

  return (
    <div className="container p-3">
      {auctions ? (
        <div>
          <h3>Active Auctions</h3>
          <div className="row g-3">
            {auctions.map((auction, index) => (
              <div className="col-sm-12 col-md-6" key={index}>
                <Auction data={auction} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <NoAuction />
      )}
    </div>
  );
};

export default ActiveAuction;
