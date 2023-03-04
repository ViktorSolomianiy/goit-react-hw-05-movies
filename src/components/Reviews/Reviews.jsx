import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchReviews } from 'services/movieApi';
import './Reviews.css';

const Reviews = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    fetchReviews(id).then(setReviews);
  }, [id]);

  if (!reviews) {
    return null;
  }

  return (
    <>
      {reviews.length === 0 ? (
        <p>Sorry, but there are no reviews here.. 😞 </p>
      ) : (
        <ul>
          {reviews.map(({ id, author, content }) => {
            return (
              <li key={id}>
                <h4>{author}</h4>
                <p>{content}</p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default Reviews;
