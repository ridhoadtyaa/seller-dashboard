import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <section className='container mt-3'>
            <p>Home Page</p>

            <Link to='/dashboard' className='btn btn-dark'>Go To Dashboard Seller Page</Link>
        </section>
    );
};

export default Home;