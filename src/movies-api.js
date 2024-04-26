import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org";

export const getMovies = async () => {
  const response = await axios.get("/movies");
  return response.data;
};

export const getMovieById = async (movieId) => {
  const response = await axios.get(`/movies/${movieId}`);
  return response.data;
};
