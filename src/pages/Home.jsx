import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import MovieCard from '../components/MovieCard'
import movieBackground from '../assets/moviebackground.jpg'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'

function Home() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const heroInputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetchPopular()
  }, [])

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

  function handleHeroSearch() {
    const value = heroInputRef.current?.value.trim()
    if (value) navigate(`/movies?q=${encodeURIComponent(value)}`)
  }

  function handleHeroKeyDown(e) {
    if (e.key === 'Enter') handleHeroSearch()
  }

  return (
    <>
      <section id="landing">
        <div className="movie__background">
          <figure className="movie__background__wrapper">
            <img src={movieBackground} alt="" className="movie__background__img" />
            <div className="movie__background__text">
              <h1 className="movie__background__title">
                Ticket<span className="textcolor__primary">+</span>
              </h1>
              <h4 className="movie__background__para">
                With over <span className="textcolor__primary">3000 </span>movies on Ticket
                <span className="textcolor__primary">+</span>, the possibilities are endless!
              </h4>
              <div className="movie__background__main__search">
                <div className="movie__input__wrapper">
                  <input
                    ref={heroInputRef}
                    type="text"
                    className="movie__input"
                    placeholder="Find a movie"
                    onKeyDown={handleHeroKeyDown}
                  />
                  <i
                    className="fa-solid fa-magnifying-glass movie__search"
                    onClick={handleHeroSearch}
                    aria-hidden="true"
                  ></i>
                </div>
              </div>
            </div>
          </figure>
        </div>
      </section>

      <section id="movies">
        <div className="container">
          <div className="row">
            <div className="movies__content">

              <div className="movies__list">
                {loading && Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="skeleton skeleton__card" />
                ))}

                {!loading && error && (
                  <div style={{ gridColumn: '1 / -1', color: '#ff6b6b', textAlign: 'center', padding: '40px' }}>
                    <i className="fa-solid fa-exclamation-triangle" style={{ fontSize: '48px', marginBottom: '20px' }}></i>
                    <p>{error}</p>
                  </div>
                )}


                {!loading && !error && movies.map(movie => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
