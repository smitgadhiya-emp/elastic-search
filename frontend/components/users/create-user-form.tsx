"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { UserForm } from "@/components/users/user-form"
import { createUser, type UserPayload } from "@/lib/api/users"

export function CreateUserForm() {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function handleCreate(payload: UserPayload) {
    const result = await createUser(payload)
    if (!result.success) {
      setErrorMessage(result.message)
      return
    }
    setErrorMessage(null)
    router.push("/users")
    router.refresh()
  }

  return (
    <div className="grid gap-4">
      {errorMessage ? (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm">
          {errorMessage}
        </div>
      ) : null}
      <UserForm mode="create" onSubmit={handleCreate} submitLabel="Create user" />
    </div>
  )
}

