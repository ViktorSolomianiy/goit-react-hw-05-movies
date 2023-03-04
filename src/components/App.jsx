import { Route, Routes } from 'react-router-dom';
import { useEffect, useState, lazy, Suspense } from 'react';

import Home from 'pages/Home';
import Navigation from './Navigation/Navigation';

import * as API from '../services/movieApi';

const Movies = lazy(() => import('../pages/Movies'));
const MovieDetails = lazy(() => import('./MovieDetails/MovieDetails'));
const Cast = lazy(() => import('./Cast/Cast'));
const Reviews = lazy(() => import('./Reviews/Reviews'));

export const App = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    API.fetchTrendingMovie()
      .then(response => {
        setMovies([...response.data.results]);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <Navigation />

      <Suspense fallback={null}>
        <Routes>
          <Route path="/" index element={<Home movies={movies} />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieDetails movies={movies} />}>
            <Route path="/movies/:id/cast" element={<Cast />} />/
            <Route path="/movies/:id/reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </div>
  );
};
