import { HashRouter, Routes, Route } from 'react-router-dom'
import { PhoneFrame } from './components/PhoneFrame'
import { Login } from './screens/Login'
import { Home } from './screens/Home'

export default function App() {
  return (
    <HashRouter>
      <PhoneFrame>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </PhoneFrame>
    </HashRouter>
  )
}
