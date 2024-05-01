import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieRewiews } from "../../movies-api";

import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchPayment() {
      try {
        const data = await getMovieRewiews(movieId);
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
        <b>Reviews</b>
      </p>

      {error && <ErrorMessage />}

      {movie ? (
        <div>
          <ul>
            {movie.results.map((movieInfo) => (
              <li key={movieInfo.id}>
                <h4>{movieInfo.author}</h4>
                <p>{movieInfo.content}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>We dont have reviews about this movie</p>
      )}
    </div>
  );
}
