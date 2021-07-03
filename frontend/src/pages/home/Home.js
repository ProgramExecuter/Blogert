import './home.css';
import HomePage from '../../components/home/HomePage';
import LandingPage from '../../components/home/LandingPage';
import isUserLogin from '../../utils/isUserLogin';

const Home = () => {
  if(isUserLogin())
    return <HomePage />;
  return <LandingPage />
};

export default Home;