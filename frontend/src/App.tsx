import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './tsx/Header.tsx'
import Home from './tsx/Home.tsx'
import Plans from'./tsx/Plans.tsx'
import Checkout from './tsx/Checkout.tsx'
import Gallery from './tsx/Gallery.tsx' 

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/plans' element={<Plans />} />
        <Route path='/checkout/:plan' element={<Checkout />} />
        <Route path='/gallery/:galleryId' element={<Gallery />} />
      </Routes>
    </Router>
  )
}