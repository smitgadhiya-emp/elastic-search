"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { UserForm } from "@/components/users/user-form"
import { updateUser, type UserPayload, type UserProfile } from "@/lib/api/users"

type UpdateUserFormProps = {
  user: UserProfile
}

export function UpdateUserForm({ user }: UpdateUserFormProps) {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function handleUpdate(payload: UserPayload) {
    const result = await updateUser(user._id, payload)
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
      <UserForm
        mode="update"
        initialValues={user}
        onSubmit={handleUpdate}
        submitLabel="Update user"
      />
    </div>
  )
}

