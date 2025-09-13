import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './tsx/Header.tsx'
import Home from './tsx/Home.tsx'
import Plans from'./tsx/Plans.tsx'
import Checkout from './tsx/Checkout.tsx'

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/plans' element={<Plans />} />
        <Route path='/checkout/:plan' element={<Checkout />} />
      </Routes>
    </Router>
  )
}