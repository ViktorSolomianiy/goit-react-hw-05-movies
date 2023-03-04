import { Suspense, useEffect, useState } from 'react';
import {
  useParams,
  Link,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { getMovieById, fetchGenres } from 'services/movieApi';
import './MovieDetails.css';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [genres, setGenres] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    getMovieById(id).then(setMovie);
  }, [id]);

  useEffect(() => {
    fetchGenres(id).then(setGenres);
  }, [id]);

  if (!movie) {
    return null;
  }

  if (!genres) {
    return null;
  }

  const handleClick = () => navigate(location?.state?.from ?? '/');

  const { title, poster_path, release_date, vote_average, overview } = movie;

  return (
    <>
      <button className="movie_details-btn" onClick={handleClick}>
        Back
      </button>
      <div className="movie_details-container">
        <img
          className="movie_details-img"
          src={`https://image.tmdb.org/t/p/original${poster_path}`}
          alt={title}
          width="250"
        />
        <div className="movie_details-info">
          <h2 className="movie_details-title">
            {title} ({release_date.split('-')[0]})
          </h2>
          <p className="movie_details-info-text">
            <b>User score:</b> {Math.floor(vote_average) * 10}%
          </p>

          <h3 className="movie_details-info-title">Overview</h3>
          <p className="movie_details-info-text">{overview}</p>

          <h3 className="movie_details-info-title">Genres</h3>
          <div className="movie_details-genres">
            {genres.map(genre => {
              return <p key={genre.id}>{genre.name}</p>;
            })}
          </div>
        </div>
      </div>

      <ul className="movie_details-list">
        <p className="movie_details-text">
          <b>Additional information</b>
        </p>
        <li>
          <Link className="text" to="cast" state={location.state}>
            Cast
          </Link>
        </li>
        <li>
          <Link className="text" to="reviews" state={location.state}>
            Reviews
          </Link>
        </li>
      </ul>

      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default MovieDetails;
