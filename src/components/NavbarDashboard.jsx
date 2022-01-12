import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import sellerProfile from '../assets/img/sellerProfile.png';

const NavbarDashboard = () => {
    const location = useLocation();

    return (
        <section className='container mt-3'>
            <div className="row">
                <div className="col-md-6">
                    <div className='d-flex align-items-center'>
                        <img src={sellerProfile} alt="Logo" width={139} />
                        <div className='flex-column'>
                            <p className="silvia-text ms-4 d-block">Sivali Factory</p>
                            <p className="joined-text ms-4">Joined on :  20 Feb 2020</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mt-5">
                    <div className='d-flex navigate'>
                        <div className="border border-dark">
                            <Link className={`btn ${location.pathname === '/add-product' ? 'btn-dark' : ''}`} to='/add-product'>Add Product</Link>
                            <Link className={`btn ${location.pathname === '/my-product' ? 'btn-dark' : ''}`} to='/my-product'>My Product</Link>
                            <Link className={`btn ${location.pathname === '/dashboard' ? 'btn-dark' : ''}`} to='/dashboard'>Dashboard</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NavbarDashboard;