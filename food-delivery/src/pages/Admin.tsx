import { useEffect, useMemo, useState } from 'react'
import type { MenuItem } from '../types'
import { fetchMenu, createMenuItem, updateMenuItem, deleteMenuItem } from '../api'

interface DraftItem {
	name: string
	description: string
	price: string
	image: string
}

const emptyDraft: DraftItem = { name: '', description: '', price: '', image: '' }

export default function Admin() {
	const [items, setItems] = useState<MenuItem[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [draft, setDraft] = useState<DraftItem>(emptyDraft)
	const [editingId, setEditingId] = useState<number | null>(null)

	useEffect(() => {
		fetchMenu().then(setItems).catch(err => setError(err?.message ?? 'Failed to load')).finally(() => setLoading(false))
	}, [])

	const isValid = useMemo(() => {
		return draft.name.trim() !== '' && draft.price.trim() !== '' && !Number.isNaN(Number(draft.price))
	}, [draft])

	async function handleCreate(e: React.FormEvent) {
		e.preventDefault()
		if (!isValid) return
		const payload = { name: draft.name.trim(), description: draft.description.trim(), price: Number(draft.price), image: draft.image.trim() || '/images/placeholder.jpg' }
		const created = await createMenuItem(payload)
		setItems(prev => [...prev, created])
		setDraft(emptyDraft)
	}

	function startEdit(item: MenuItem) {
		setEditingId(item.id)
		setDraft({ name: item.name, description: item.description, price: String(item.price), image: item.image })
	}

	async function handleUpdate(e: React.FormEvent) {
		e.preventDefault()
		if (!isValid || editingId === null) return
		const payload = { name: draft.name.trim(), description: draft.description.trim(), price: Number(draft.price), image: draft.image.trim() }
		const updated = await updateMenuItem(editingId, payload)
		setItems(prev => prev.map(i => (i.id === editingId ? updated : i)))
		setEditingId(null)
		setDraft(emptyDraft)
	}

	async function handleDelete(id: number) {
		await deleteMenuItem(id)
		setItems(prev => prev.filter(i => i.id !== id))
		if (editingId === id) {
			setEditingId(null)
			setDraft(emptyDraft)
		}
	}

	if (loading) return <p>Loading…</p>
	if (error) return <p style={{ color: 'red' }}>{error}</p>

	return (
		<div className="admin">
			<h2>Admin - Manage Menu</h2>

			<form onSubmit={editingId ? handleUpdate : handleCreate} className="admin__form">
				<div>
					<label>Name</label>
					<input value={draft.name} onChange={e => setDraft({ ...draft, name: e.target.value })} />
				</div>
				<div>
					<label>Description</label>
					<input value={draft.description} onChange={e => setDraft({ ...draft, description: e.target.value })} />
				</div>
				<div>
					<label>Price</label>
					<input value={draft.price} onChange={e => setDraft({ ...draft, price: e.target.value })} />
				</div>
				<div>
					<label>Image URL</label>
					<input value={draft.image} onChange={e => setDraft({ ...draft, image: e.target.value })} />
				</div>
				<div className="admin__actions">
					<button type="submit" disabled={!isValid}>{editingId ? 'Update' : 'Add'}</button>
					{editingId && <button type="button" onClick={() => { setEditingId(null); setDraft(emptyDraft) }}>Cancel</button>}
				</div>
			</form>

			<table className="admin__table">
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Price</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{items.map(item => (
						<tr key={item.id}>
							<td>{item.id}</td>
							<td>{item.name}</td>
							<td>${item.price.toFixed(2)}</td>
							<td>
								<button onClick={() => startEdit(item)}>Edit</button>
								<button onClick={() => handleDelete(item.id)} style={{ marginLeft: 8, color: 'red' }}>Delete</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}