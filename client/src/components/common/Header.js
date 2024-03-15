import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { checkAuth } from "./auth";
import './Header.css'

const Header = () => {
    var navigate = useNavigate();
    const logOut = ()=>{
        localStorage.removeItem('token');
        navigate('/login');
        return
    }

  useEffect(() => {
    if (!checkAuth(localStorage.getItem("token"))) {
      navigate("/login");
    }
  });

  const isLoggedIn = true;

  return (
    <div className="navbar navbar-expand" style={{backgroundColor:'rgb(240,240,240)', boxShadow:'0px 0px 5px 0px rgb(100,100,100)'}}>
      <div className="container-fluid">
              {/* <img url="" alt="logo" id="logo" src={'./logo.jpg'}></img> */}
      <a className="navbar-brand">Bidly</a>
      {isLoggedIn ? (
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
          <li className="nav-item"><Link to='/home' className="nav-link">Auctions</Link></li>
          <li className="nav-item"><Link to="/watch-list" className="nav-link">Watch List</Link></li>
          <li className="nav-item"><Link to="/my-auctions" className="nav-link">My Auctions</Link></li>
          <li className="nav-item"><Link to="/new-auction" className="nav-link">New Auctions</Link></li>
        </ul>
        </div>
        
      ) : (
        <form className="d-flex">
        <button className="btn btn-outline-secondary btn-sm" onClick={()=>logOut()}>  Log out</button>
        </form>
      )}
                <form className="d-flex">
          <button className="btn btn-outline-secondary btn-sm" onClick={()=>logOut()}>  Log out</button>
          </form>
      </div>
    </div>
  );
};

export default Header;
