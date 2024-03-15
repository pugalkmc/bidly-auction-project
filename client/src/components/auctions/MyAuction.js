import React, { useEffect, useState } from "react";
import api from "../api/api"; // Adjust this import path to your project's structure
import Auction from "./Auction"; // Reuse the Auction component for displaying each item
import NoAuction from "./NoAuction";
import "./css/ActiveAuction.css"; // Reuse or create specific CSS for MyAuctions if needed

const MyAuctions = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Adjust the endpoint as per your backend API
        const response = await api.get("/auction/my-auctions");
        setAuctions(response.data.data);
      } catch (err) {
        console.error("Error fetching my auctions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>; // Or any other loading indicator
  }

  if (auctions.length === 0) {
    return <NoAuction />;
  }

  return (
    <div className="container p-3">
      <h3>My Auctions</h3>
      <div className="row row-cols-2 g-3">
        {auctions.map((auction) => (
          <div key={auction._id} className="col">
            <Auction data={auction} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAuctions;
