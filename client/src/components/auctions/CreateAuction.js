import React, { useState } from "react";
import api from "../api/api";
import "./css/CreateAuction.css";

const CreateAuction = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    initialBid: "",
    endsIn: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auction", {
        ...formData,
        active: true,
        username: localStorage.getItem("username"),
      });
      console.log("Auction created:", response.data);
      alert("Auction created successfully!");
    } catch (error) {
      console.error("Error creating auction:", error);
      alert("Failed to create auction.");
    }
  };

  return (
    <div className="container-fluid">
      <h2>Create New Auction</h2>
      <form onSubmit={handleSubmit} className="form-group" style={{width:'50%'}}>
        <div className="form-group">
          <label className="form-label">Title:</label>
          <input
            className="form-control"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Description:</label>
          <textarea
            className="form-control"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label className="form-label">Initial Bid:</label>
          <input
            className="form-control"
            type="number"
            name="initialBid"
            value={formData.initialBid}
            onChange={handleChange}
            required
            min="1"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Image Link</label>
          <input
            className="form-control"
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Ends In</label>
          <input
            className="form-control"
            type="datetime-local"
            name="endsIn"
            value={formData.endsIn}
            onChange={handleChange}
            required
          />
        </div>
        <button className="btn btn-primary mt-3" type="submit">Create Auction</button>
      </form>
    </div>
  );
};

export default CreateAuction;
