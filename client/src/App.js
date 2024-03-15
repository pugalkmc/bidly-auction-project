import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import LoginPage from './components/auth/Login'; // Adjust the import path and component name
import PageNotFound from './components/common/PageNotFound';
import ActiveAuctions from './components/auctions/ActiveAuction';
import './App.css';
import SignUpPage from './components/auth/SignUp';
import MyAuctions from './components/auctions/MyAuction';
import CreateAuction from './components/auctions/CreateAuction';
import WatchList from './components/watchlist/WatchList';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';


function App() {
    return (
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path='/signup' element={<SignUpPage/>} />
                    <Route path="/auction" element={<ActiveAuctions/>}/>
                    <Route path="/my-auctions" element={<MyAuctions/>} />
                    <Route path="/new-auction" element={<CreateAuction/>}/>
                    <Route path="/watch-list" element={<WatchList/>}/>
                    <Route path="/home" element={<ActiveAuctions/>}/>
                    <Route path="*" element={<PageNotFound/>}/>
                </Routes>
                <Footer />
            </BrowserRouter>
    );
}

export default App;
