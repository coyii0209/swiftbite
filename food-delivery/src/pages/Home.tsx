import { useEffect, useState } from 'react'
import type { MenuItem } from '../types'
import { fetchMenu } from '../api'

export default function Home() {
	const [menu, setMenu] = useState<MenuItem[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		fetchMenu().then(setMenu).catch(err => setError(err?.message ?? 'Failed to load')).finally(() => setLoading(false))
	}, [])

	if (loading) return <p>Loading menu…</p>
	if (error) return <p style={{ color: 'red' }}>{error}</p>

	return (
		<div className="menu-grid">
			{menu.map(item => (
				<div key={item.id} className="menu-card">
					<img src={item.image} alt={item.name} className="menu-card__img" />
					<div className="menu-card__body">
						<h3>{item.name}</h3>
						<p>{item.description}</p>
						<div className="menu-card__footer">
							<span>${item.price.toFixed(2)}</span>
							<button>Add to cart</button>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}