import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCredits } from "../../movies-api";

import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

export default function MovieCast() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchPayment() {
      try {
        const data = await getMovieCredits(movieId);
        setMovie(data);
      } catch (error) {
        setError(true);
      }
    }
    fetchPayment();
  }, [movieId]);

  return (
    <div>
      <p>
        <b>Casts</b>
      </p>

      {error && <ErrorMessage />}

      {movie ? (
        <div>
          <ul>
            {movie.cast.map((movieInfo) => (
              <li key={movieInfo.id}>
                <img
                  src={
                    "https://image.tmdb.org/t/p/w500/" + movieInfo.profile_path
                  }
                  alt={movieInfo.name}
                  width="150"
                />
                <p>{movieInfo.name}</p>
                <p>Character: {movieInfo.character}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>We dont have info about this movie</p>
      )}
    </div>
  );
}
