import React, { useEffect, useState } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png'; 
import { useParams } from 'react-router-dom';

const Player = () => {
  const { id } = useParams(); // Get the movie ID from URL
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1M2JhZjY3Yjk0ZWQwYTA2ZjVlN2JmNGRmNmFhNjQwYiIsIm5iZiI6MTcyNDM5MDUzNi41NTIsInN1YiI6IjY2YzgxYzg4YjAyNDRmNTMwMjg3NjBhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.a-d63lwN_bfiaFLTihJ6mJbLxTPBbflCYap0RfYr1gc'
    }
  };

  useEffect(() => {
    if (!id) return; // Prevent fetch if ID is missing

    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(res => {
        if (res.results && res.results.length > 0) {
          setApiData(res.results[0]); // Use the first video
        } else {
          setApiData(null);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching video data:', err);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt='Back' />

      {loading ? (
        <p>Loading...</p>
      ) : apiData ? (
        <iframe
          width='90%'
          height='90%'
          src={`https://www.youtube.com/embed/${apiData.key}`}
          title={apiData.name || 'Trailer'}
          frameBorder='0'
          allowFullScreen
        ></iframe>
      ) : (
        <p>No video available</p>
      )}

      <div className='player-info'>
        <p>{apiData?.published_at?.slice(0, 10) || 'N/A'}</p>
        <p>{apiData?.name || apiData?.title || 'No title available'}</p>
        <p>{apiData?.type || 'No type available'}</p>
      </div>
    </div>
  );
};

export default Player;
