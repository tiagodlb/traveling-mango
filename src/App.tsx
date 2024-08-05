import { Component } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import LoginPage from './pages/Login'
import Destiny from './pages/Destiny'
import Attractive from './pages/Attractive'
import About from './pages/About'
import Favourites from './pages/Favorites'
import DestinyId from './pages/DestinyId'
import RegisterPage from './pages/Register'

export class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/entrar" element={<LoginPage />} />
          <Route path="/destinos" element={<Destiny />} />
          <Route path="/destinos/:id" element={<DestinyId />} />
          <Route path="/atrativos" element={<Attractive />} />
          <Route path="/registrar" element={<RegisterPage />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/favoritos" element={<Favourites />} />
        </Routes>
      </BrowserRouter>
    )
  }
}

export default App
