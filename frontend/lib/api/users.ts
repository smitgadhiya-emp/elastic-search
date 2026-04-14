import { apiRequest } from "@/lib/api/client"

export type UserProfile = {
  _id: string
  name: string
  email: string
  phone?: string
  state?: string
  city?: string
  bio?: string
  avatar?: string
  createdAt: string
  updatedAt: string
}

export type UserPayload = {
  name: string
  email: string
  phone?: string
  state?: string
  city?: string
  bio?: string
  avatar?: string
}

export async function fetchUsers(search?: string) {
  const query = search?.trim() ? `?search=${encodeURIComponent(search.trim())}` : ""
  return apiRequest<UserProfile[]>(`/users${query}`)
}

export async function fetchUserById(id: string) {
  return apiRequest<UserProfile>(`/users/${id}`)
}

export async function createUser(payload: UserPayload) {
  return apiRequest<UserProfile>("/users", {
    method: "POST",
    body: payload,
  })
}

export async function updateUser(id: string, payload: Partial<UserPayload>) {
  return apiRequest<UserProfile>(`/users/${id}`, {
    method: "PATCH",
    body: payload,
  })
}

export async function deleteUser(id: string) {
  return apiRequest<null>(`/users/${id}`, {
    method: "DELETE",
  })
}

