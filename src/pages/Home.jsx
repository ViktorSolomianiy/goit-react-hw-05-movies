import { NavLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Home.css';

const Home = ({ movies }) => {
  const location = useLocation();

  return (
    <>
      <h2 className="home-title">Trending Today</h2>

      <ul className="home-gallery">
        {movies.map(({ id, title }) => {
          return (
            <li key={id}>
              <NavLink state={{ from: location }} to={`/movies/${id}`}>
                {title}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </>
  );
};

Home.propTypes = {
  movies: PropTypes.array,
};

export default Home;
