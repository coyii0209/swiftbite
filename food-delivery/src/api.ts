import axios from 'axios'
import type { MenuItem } from './types'

const api = axios.create({ baseURL: '/api' })

export async function fetchMenu(): Promise<MenuItem[]> {
	const { data } = await api.get<MenuItem[]>('/menu')
	return data
}

export async function createMenuItem(item: Omit<MenuItem, 'id'>): Promise<MenuItem> {
	const { data } = await api.post<MenuItem>('/menu', item)
	return data
}

export async function updateMenuItem(id: number, item: Partial<Omit<MenuItem, 'id'>>): Promise<MenuItem> {
	const { data } = await api.patch<MenuItem>(`/menu/${id}`, item)
	return data
}

export async function deleteMenuItem(id: number): Promise<void> {
	await api.delete(`/menu/${id}`)
}