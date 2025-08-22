import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Admin from './pages/Admin'

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<div className="container">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/admin" element={<Admin />} />
				</Routes>
			</div>
		</BrowserRouter>
	)
}

export default App
