import React, { useEffect, useRef, useState } from "react";
import "./TitileCards.css";
import { Link } from "react-router-dom";

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]); // Initialize as an empty array
  const cardsRef = useRef();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1M2JhZjY3Yjk0ZWQwYTA2ZjVlN2JmNGRmNmFhNjQwYiIsIm5iZiI6MTcyNDM5MDUzNi41NTIsInN1YiI6IjY2YzgxYzg4YjAyNDRmNTMwMjg3NjBhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.a-d63lwN_bfiaFLTihJ6mJbLxTPBbflCYap0RfYr1gc",
    },
  };

  const handleWheel = (event) => {
    event.preventDefault();
    if (cardsRef.current) {
      cardsRef.current.scrollLeft += event.deltaY;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${category ?? "now_playing"}?language=en-US&page=1`,
          options
        );
        const data = await res.json();
        setApiData(data.results || []); 
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();

    const refCurrent = cardsRef.current;
    if (refCurrent) {
      refCurrent.addEventListener("wheel", handleWheel);
    }

    return () => {
      if (refCurrent) {
        refCurrent.removeEventListener("wheel", handleWheel);
      }
    };
  }, [category]); // Add category as a dependency

  return (
    <div className="title-cards">
      <h1>{title || "Popular on Netflix"}</h1>
      <div className="card-list" ref={cardsRef}>
        {apiData.length > 0 ? (
          apiData.map((card) => (
            <Link to={`/player/${card.id}`} className="card" key={card.id}>
              <img
                src={card.backdrop_path
                  ? `https://image.tmdb.org/t/p/w500${card.backdrop_path}`
                  : "fallback_image_url"}
                alt={card.title || "No title available"}
              />
              <p>{card.original_title}</p>
            </Link>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default TitleCards;
