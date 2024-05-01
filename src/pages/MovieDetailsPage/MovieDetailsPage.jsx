import { Suspense, useEffect, useRef, useState } from "react";
import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import { getMovieById } from "../../movies-api";
import css from "./MovieDetailsPage.module.css";

import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const location = useLocation();
  const backLinkURLRef = useRef(location.state ?? "/movies");

  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

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
    <div className={css.module}>
      <div className={css.back}>
        <Link to={backLinkURLRef.current}>Go back</Link>
      </div>
      {error && <ErrorMessage />}

      {loading && <b>Loading movies...</b>}

      {movie && (
        <div className={css.descr}>
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : defaultImg
            }
            alt={movie.title}
            width="250"
          />
          <div className={css.info}>
            <h2>{movie.title + " (" + movie.release_date.slice(0, 4) + ")"}</h2>
            <p>User Score: {Math.round(movie.vote_average * 10) + "%"}</p>
            <h4>Overview</h4>
            <p>{movie.overview}</p>
            <h4>Geners</h4>
            <p>
              {movie.genres.map((ganre) => {
                return ganre.name + "  ";
              })}
            </p>
          </div>
        </div>
      )}
      <div className={css.add}>
        <p>Additional Information</p>
        <ul>
          <li>
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
      </div>

      <Suspense fallback={<b>Loading nested route...</b>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
