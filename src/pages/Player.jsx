import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import MovieCard from '../components/MovieCard'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'
const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500'
const FALLBACK = 'https://placehold.co/300x450/1e1e1e/white?text=No+Poster'

function PlayerSkeleton() {
  return (
    <div className="player__page">
      <div className="player__detail">
        <div className="skeleton skeleton__poster" />
        <div className="player__info">
          <div className="skeleton skeleton__title" />
          <div className="skeleton skeleton__meta" />
          <div className="player__overview__block">
            <div className="skeleton skeleton__label" />
            <div className="skeleton skeleton__line" />
            <div className="skeleton skeleton__line" />
            <div className="skeleton skeleton__line skeleton__line--short" />
          </div>
          <div className="skeleton skeleton__btn" />
        </div>
      </div>
      <div className="player__recommended">
        <div className="skeleton skeleton__rec__title" />
        <div className="movies__list">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton skeleton__card" />
          ))}
        </div>
      </div>
    </div>
  )
}

function Player() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [recommended, setRecommended] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    setLoading(true)
    async function fetchData() {
      try {
        const [movieRes, recRes] = await Promise.all([
          fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`),
          fetch(`${BASE_URL}/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`)
        ])
        const [movieData, recData] = await Promise.all([
          movieRes.json(),
          recRes.json()
        ])
        setMovie(movieData)
        setRecommended((recData.results || []).slice(0, 6))
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  if (loading) return <PlayerSkeleton />

  if (!movie) return null

  const poster = movie.poster_path ? `${IMAGE_BASE}${movie.poster_path}` : FALLBACK

  const releaseDate = movie.release_date
    ? new Date(movie.release_date + 'T00:00:00').toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    : 'N/A'

  const runtime = movie.runtime ? `${movie.runtime} min` : 'N/A'
  const rating = movie.vote_average ? `${movie.vote_average.toFixed(1)}/10` : 'N/A'

  return (
    <div className="player__page">

      <div className="player__detail">
        <img
          src={poster}
          alt={movie.title}
          className="player__poster"
          onError={e => { e.target.src = FALLBACK }}
        />

        <div className="player__info">
          <h1 className="player__title">{movie.title}</h1>

          <div className="player__meta">
            <span>{releaseDate}</span>
            <span className="player__meta__dot">·</span>
            <span>{runtime}</span>
            <span className="player__meta__dot">·</span>
            <span>{rating}</span>
          </div>

          <div className="player__overview__block">
            <p className="player__overview__label">Overview:</p>
            <p className="player__overview__text">{movie.overview}</p>
          </div>

          <button className="player__watch__btn" onClick={() => navigate('#')}>
            <i className="fa-solid fa-play"></i>
            Watch
          </button>
        </div>
      </div>

      {recommended.length > 0 && (
        <div className="player__recommended">
          <h2 className="player__recommended__title">Recommended Movies</h2>
          <div className="movies__list">
            {recommended.map(m => (
              <MovieCard key={m.id} movie={m} />
            ))}
          </div>
        </div>
      )}

    </div>
  )
}

export default Player
