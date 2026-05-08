import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import MovieCard from '../components/MovieCard'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

function Movies() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [inputValue, setInputValue] = useState(searchParams.get('q') || '')

  useEffect(() => {
    const q = searchParams.get('q')
    if (q) {
      fetchSearch(q)
    } else {
      fetchPopular()
    }
  }, [searchParams.get('q')])

  async function fetchPopular() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
      const data = await res.json()
      setMovies(data.results.slice(0, 6))
    } catch {
      setError('Failed to load movies.')
    } finally {
      setLoading(false)
    }
  }

  async function fetchSearch(query) {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US&page=1`
      )
      const data = await res.json()
      setMovies(data.results ? data.results.slice(0, 6) : [])
    } catch {
      setError('Search failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  function handleSubmit() {
    if (inputValue.trim()) {
      setSearchParams({ q: inputValue.trim() })
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div className="movies__page">
      <div className="movies__searchbar">
        <input
          type="text"
          className="movies__searchbar__input"
          placeholder="Search for a movie"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
        <button className="movies__searchbar__btn" onClick={handleSubmit}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>

      <div className="container">
        <div className="row">
          <div className="movies__list">
            {loading && Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="skeleton skeleton__card" />
            ))}

            {!loading && error && (
              <div style={{ gridColumn: '1 / -1', color: '#ff6b6b', textAlign: 'center', padding: '40px' }}>
                <p>{error}</p>
              </div>
            )}

            {!loading && !error && movies.length === 0 && (
              <div style={{ gridColumn: '1 / -1', color: 'white', textAlign: 'center', padding: '40px' }}>
                <i className="fa-solid fa-magnifying-glass" style={{ fontSize: '48px', color: 'crimson', marginBottom: '20px', display: 'block' }}></i>
                <p>No movies found. Try a different search.</p>
              </div>
            )}

            {!loading && !error && movies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Movies
