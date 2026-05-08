import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Movies from './pages/Movies'
import Player from './pages/Player'
import Layout from './components/Layout'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route element={<Layout />}>
        <Route path='/home' element={<Home />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/player/:id' element={<Player />} />
      </Route>
    </Routes>
  )
}

export default App
