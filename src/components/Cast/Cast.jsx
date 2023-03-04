import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCast } from 'services/movieApi';

const Cast = () => {
  const { id } = useParams();
  const [cast, setCast] = useState(null);

  useEffect(() => {
    fetchCast(id).then(setCast);
  }, [id]);

  if (!cast) {
    return null;
  }

  return (
    <>
      {cast.length === 0 ? (
        <p>Sorry, but there is no cast information here.. 😞</p>
      ) : (
        <ul>
          {cast.map(({ profile_path, id, name, character }) => {
            if (profile_path === null) {
              return null;
            }

            return (
              <li key={id}>
                <img
                  src={`https://image.tmdb.org/t/p/w200${profile_path}`}
                  alt={name}
                />
                <p>{name}</p>
                <p>Character: {character}</p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default Cast;
