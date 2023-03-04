import axios from 'axios';

const KEY = '1941688dd41d70d7ab53e7533d9284c1';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

export const fetchTrendingMovie = async () => {
  const response = await axios.get(`/trending/movie/week?api_key=${KEY}`);

  return response;
};

export const fetchSearchMovie = async query => {
  const response = await axios.get(
    `/search/movie?api_key=${KEY}&query=${query}&language=en-US&page=1&include_adult=false`
  );

  return response.data.results;
};

export const getMovieById = async movieId => {
  const response = await axios.get(`/movie/${movieId}?api_key=${KEY}`);

  return response.data;
};

export const fetchGenres = async movieId => {
  const response = await axios.get(`/movie/${movieId}?api_key=${KEY}`);

  return response.data.genres;
};

export const fetchCast = async movieId => {
  const response = await axios.get(`/movie/${movieId}/credits?api_key=${KEY}`);

  return response.data.cast;
};

export const fetchReviews = async movieId => {
  const response = await axios.get(
    `/movie/${movieId}/reviews?api_key=${KEY}&page=1`
  );

  return response.data.results;
};
