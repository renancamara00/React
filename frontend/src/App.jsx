import './App.css'

import { BrowserRouter } from 'react-router-dom'
import Logo from './components/templates/Logo'
import Footer from './components/templates/Footer'
import AppRoutes from './Routes.jsx'
import Nav from './components/templates/Nav'

export default function App() {
  return (
    <BrowserRouter>
      <div className='app'>
        <Logo />
        <Nav />
        <AppRoutes />
        <Footer />
      </div>
    </BrowserRouter>
  )
}