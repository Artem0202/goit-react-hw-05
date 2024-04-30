import { Suspense, useEffect, useRef, useState } from "react";
import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import { getMovieById } from "../../movies-api";

import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();
  const backLinkURLRef = useRef(location.state ?? "/movies");

  useEffect(() => {
    async function fetchPayment() {
      try {
        const data = await getMovieById(movieId);
        setMovie(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchPayment();
  }, [movieId]);

  return (
    <div>
      <p>
        <b>MovieDetailsPage</b>
      </p>

      <div>
        <Link to={backLinkURLRef.current}>Go back</Link>
      </div>
      {error && <ErrorMessage />}

      {loading && <b>Loading payments...</b>}

      {movie && (
        <div>
          <img
            src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}
            alt={movie.title}
          />
          <h2>{movie.title + " (" + movie.release_date.slice(0, 4) + ")"}</h2>
          <p>User Score: {Math.round(movie.popularity) + "%"}</p>
          <h4>Overview</h4>
          <p>{movie.overview}</p>
          <h4>Geners</h4>
          <p>
            {movie.genres.map((ganre) => {
              return ganre.name + "  ";
            })}
          </p>
        </div>
      )}

      <ul>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>

      <Suspense fallback={<b>Loading nested route...</b>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
