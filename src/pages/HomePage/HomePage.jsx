import MovieList from "../../components/MovieList/MovieList";
import { getMovies } from "../../movies-api";
import { useEffect, useState } from "react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        const data = await getMovies();
        setMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);
  return (
    <div>
      <h2>Trending today</h2>
      {loading && <b>Loading payments...</b>}
      {error && <ErrorMessage />}
      {Object.keys(movies).length > 0 && <MovieList movies={movies} />}
    </div>
  );
}
