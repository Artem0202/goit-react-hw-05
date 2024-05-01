import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCredits } from "../../movies-api";

import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

export default function MovieCast() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  const [error, setError] = useState(false);

  const defaultImg =
    "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

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
                    movieInfo.profile_path
                      ? `//image.tmdb.org/t/p/w500/${movieInfo.profile_path}`
                      : defaultImg
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
