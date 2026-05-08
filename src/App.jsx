import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Movies from './pages/Movies'
import Player from './pages/Player'
import Layout from './components/Layout'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/home' replace />} />
      <Route element={<Layout />}>
        <Route path='/home' element={<Home />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/player/:id' element={<Player />} />
      </Route>
    </Routes>
  )
}

export default App
