"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { deleteUser, type UserProfile } from "@/lib/api/users"

type UserListProps = {
  users: UserProfile[]
  emptyMessage?: string
}

export function UserList({ users, emptyMessage = "No users found." }: UserListProps) {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  async function handleDelete(user: UserProfile) {
    const confirmed = window.confirm(`Delete user "${user.name}"? This action cannot be undone.`)
    if (!confirmed) {
      return
    }

    setDeletingId(user._id)
    const result = await deleteUser(user._id)
    setDeletingId(null)

    if (!result.success) {
      setErrorMessage(result.message)
      return
    }

    setErrorMessage(null)
    router.refresh()
  }

  return (
    <section className="grid gap-3">
      {errorMessage ? (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm">
          {errorMessage}
        </div>
      ) : null}

      {users.length === 0 ? (
        <div className="rounded-xl border bg-card p-4 text-sm text-muted-foreground">
          {emptyMessage}
        </div>
      ) : (
        users.map((user) => (
          <article key={user._id} className="rounded-xl border bg-card p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {user.city ?? "-"}, {user.state ?? "-"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href={`/users/${user._id}/edit`}>Edit</Link>
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  disabled={deletingId === user._id}
                  onClick={() => void handleDelete(user)}
                >
                  {deletingId === user._id ? "Deleting..." : "Delete"}
                </Button>
              </div>
            </div>
          </article>
        ))
      )}
    </section>
  )
}

