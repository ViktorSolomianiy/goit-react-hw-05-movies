import { Suspense, useEffect, useState, lazy, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchSearchMovie } from 'services/movieApi';
import './Movies.css';

const MovieList = lazy(() => import('../components/MovieList/MovieList'));

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const searchName = searchParams.get('query') ?? '';
  console.log(searchName);

  useEffect(() => {
    fetchSearchMovie(searchName).then(data => {
      setMovies(data);
    });
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

    fetchSearchMovie(nextParams.query).then(setMovies);

    setSearchQuery('');
  };

  return (
    <>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          className="search-label"
          type="text"
          name="name"
          value={searchQuery}
          onChange={handleChange}
        />
        <button className="search-btn" type="submit">
          Search
        </button>
      </form>
      <Suspense fallback={null}>
        <MovieList movies={movies} />
        {/* {movies.length === 0 ? <p>Hello</p> : <MovieList movies={movies} />} */}
      </Suspense>
    </>
  );
};

export default Movies;
