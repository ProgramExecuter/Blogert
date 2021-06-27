import React from 'react';
import LandingPage from '../../components/home/LandingPage';
import HomePage from '../../components/home/HomePage';
import isUserLogin from '../../utils/isUserLogin';
import './home.css';

const Home = () => {
  if(isUserLogin())
    return <HomePage />
  else
    return <LandingPage />
};

export default Home;