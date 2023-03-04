import { NavLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
// import '../../pages/Home.css';

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <div>
      <ul className="home-gallery">
        {movies.map(({ id, title, poster_path }) => {
          return (
            <li key={id} className="home-gallery-item">
              <NavLink
                className="home-gallery-link"
                state={{ from: location }}
                to={`/movies/${id}`}
              >
                <img
                  className="home-gallery-img"
                  src={`https://image.tmdb.org/t/p/original${poster_path}`}
                  alt={title}
                  width="250"
                />
                <h2 className="home-gallery-title">{title}</h2>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

MovieList.propTypes = {
  movies: PropTypes.array.isRequired,
};

export default MovieList;
