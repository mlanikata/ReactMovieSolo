import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500'
const FALLBACK = 'https://placehold.co/198x288/1e1e1e/white?text=No+Poster'

function MovieCard({ movie }) {
  const navigate = useNavigate()
  const [btnDimmed, setBtnDimmed] = useState(false)

  const poster = movie.poster_path ? `${IMAGE_BASE}${movie.poster_path}` : FALLBACK

  function handleWrapperEnter() {
    setBtnDimmed(true)
  }

  function handleWrapperLeave() {
    setBtnDimmed(false)
  }

  function handleClick() {
    setBtnDimmed(true)
    navigate(`/player/${movie.id}`)
  }

  return (
    <div className="movie" style={{ cursor: 'pointer' }}>
      <figure
        className="movie__img__wrapper"
        onMouseEnter={handleWrapperEnter}
        onMouseLeave={handleWrapperLeave}
      >
        <img
          src={poster}
          alt={movie.title}
          className="movie__img"
          onError={e => { e.target.src = FALLBACK }}
        />
        <div className="movie__hover__overlay">
          <h3 className="movie__info__title">{movie.title}</h3>
          <button
            className={`movie__find__btn${btnDimmed ? ' movie__find__btn--dimmed' : ''}`}
            onClick={handleClick}
          >
            Find Out More
          </button>
        </div>
      </figure>
    </div>
  )
}

export default MovieCard
