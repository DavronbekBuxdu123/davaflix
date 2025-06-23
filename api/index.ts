import { api_key } from "@/constantss";
import { MovieResponse } from "@/types/types.js";
import { apiRequest } from "./axios.js";

const base_url = "https://api.themoviedb.org/3";

const trendingMovie = `${base_url}/trending/movie/day?api_key=${api_key}&include_adult=false`;
const upcomingMovie = `${base_url}/movie/upcoming?api_key=${api_key}&include_adult=false`;
const topratedMovie = `${base_url}/movie/top_rated?api_key=${api_key}&include_adult=false`;
const popularMovie = `${base_url}/movie/popular?api_key=${api_key}&include_adult=false`;

const movieDetail = (id: string | number) =>
  `${base_url}/movie/${id}?api_key=${api_key}`;
const movieCredits = (id: string | number) =>
  `${base_url}/movie/${id}/credits?api_key=${api_key}`;
const movieSimilar = (id: string | number) =>
  `${base_url}/movie/${id}/similar?api_key=${api_key}`;
const personDetail = (id: string | number) =>
  `${base_url}/person/${id}?api_key=${api_key}`;
const personMovie = (id: string | number) =>
  `${base_url}/person/${id}/movie_credits?api_key=${api_key}`;

export const fetchTrendingMovie = async (): Promise<MovieResponse> => {
  const data = await apiRequest(trendingMovie);
  const filtered = data.results.filter((movie: { adult: any }) => !movie.adult);
  return { ...data, results: filtered };
};

export const fetchUpcomingMovie = async (): Promise<MovieResponse> => {
  const data = await apiRequest(upcomingMovie);
  const filtered = data.results.filter((movie: { adult: any }) => !movie.adult);
  return { ...data, results: filtered };
};

export const fetchTopRatedMovie = async (): Promise<MovieResponse> => {
  const data = await apiRequest(topratedMovie);
  const filtered = data.results.filter((movie: { adult: any }) => !movie.adult);
  return { ...data, results: filtered };
};

export const fetchPopularMovie = async (): Promise<MovieResponse> => {
  const data = await apiRequest(popularMovie);
  const filtered = data.results.filter((movie: { adult: any }) => !movie.adult);
  return { ...data, results: filtered };
};

export const fetchMovieDetails = async (id: string | number) => {
  return apiRequest(movieDetail(id));
};

export const fetchMovieCredits = async (id: string | number) => {
  return apiRequest(movieCredits(id));
};

export const fetchMovieSimilar = async (id: string | number) => {
  return apiRequest(movieSimilar(id));
};

export const fetchPersonDetail = async (id: string | number) => {
  return apiRequest(personDetail(id));
};

export const fetchPersonMovie = async (id: string | number) => {
  return apiRequest(personMovie(id));
};

export const image500 = (posterPath: string | null) => {
  return posterPath ? "https://image.tmdb.org/t/p/w500" + posterPath : null;
};

export const image342 = (posterPath: string | null) => {
  return posterPath ? "https://image.tmdb.org/t/p/w342" + posterPath : null;
};

export const image185 = (posterPath: string | null) => {
  return posterPath ? "https://image.tmdb.org/t/p/w185" + posterPath : null;
};
