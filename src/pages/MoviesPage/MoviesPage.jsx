import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import SearchBar from "../../components/SearchBar/SearchBar";
import { getMoviesSearch } from "../../movies-api";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const searchParam = searchParams.get("query") ?? "";

  const handleSearch = (newFilter) => {
    searchParams.set("query", newFilter);
    setSearchParams(searchParams);
    setMovies([]);
  };

  useEffect(() => {
    if (searchParam === "") {
      return;
    }
    async function fetchMovies() {
      try {
        setError(false);
        setLoading(true);
        const data = await getMoviesSearch(searchParam);
        setMovies(data.results);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [searchParam]);

  return (
    <div className={css.conteiner}>
      <SearchBar onSearch={handleSearch} />
      {error && <ErrorMessage />}

      {loading && <b>Loading movies...</b>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}
