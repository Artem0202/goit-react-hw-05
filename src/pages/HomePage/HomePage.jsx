import MovieList from "../../components/MovieList/MovieList";
import { getMovies } from "../../movies-api";
import { useEffect, useState } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import css from "./HomePage.module.css";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        const data = await getMovies();
        setMovies(data.results);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);
  return (
    <div className={css.list}>
      <h2 className={css.title}>Trending today</h2>
      {loading && <b>Loading movies...</b>}
      {error && <ErrorMessage />}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}
