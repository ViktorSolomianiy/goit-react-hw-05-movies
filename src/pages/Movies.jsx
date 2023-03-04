import { Suspense, useEffect, useState, lazy } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchSearchMovie } from 'services/movieApi';

const MovieList = lazy(() => import('../components/MovieList/MovieList'));

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const searchName = searchParams.get('query') ?? '';

  useEffect(() => {
    fetchSearchMovie(searchName).then(setMovies);
  }, [searchName]);

  const handleChange = e => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (searchQuery.trim() === '') {
      return;
    }

    const query = e.target.name.value;
    const nextParams = query !== '' ? { query } : {};
    setSearchParams(nextParams);

    fetchSearchMovie(nextParams.query);

    setSearchQuery('');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={searchQuery}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
      <Suspense fallback={null}>
        <MovieList movies={movies} />
        {/* {movies.length === 0 ? <p>Hello</p> : <MovieList movies={movies} />} */}
      </Suspense>
    </>
  );
};

export default Movies;
