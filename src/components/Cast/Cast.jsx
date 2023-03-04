import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCast } from 'services/movieApi';
import './Cast.css';

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
        <ul className="cast-list">
          {cast.map(({ profile_path, id, name, character }) => {
            if (profile_path === null) {
              return null;
            }

            return (
              <li key={id} className="cast-item">
                <img
                  src={`https://image.tmdb.org/t/p/w200${profile_path}`}
                  alt={name}
                />
                <p className="cast-name">{name}</p>
                <p>
                  <b>Character:</b> {character}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default Cast;
