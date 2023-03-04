import { NavLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <div>
      <ul>
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
    </div>
  );
};

MovieList.propTypes = {
  movies: PropTypes.array.isRequired,
};

export default MovieList;
