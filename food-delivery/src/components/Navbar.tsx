import { Link, NavLink } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
	return (
		<nav className="navbar">
			<div className="navbar__brand">
				<Link to="/">FoodExpress</Link>
			</div>
			<ul className="navbar__links">
				<li><NavLink to="/" end>Home</NavLink></li>
				<li><NavLink to="/cart">Cart</NavLink></li>
				<li><NavLink to="/admin">Admin</NavLink></li>
			</ul>
		</nav>
	)
}