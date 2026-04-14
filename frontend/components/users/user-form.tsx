"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import type { UserPayload, UserProfile } from "@/lib/api/users"

type UserFormProps = {
  mode: "create" | "update"
  initialValues?: UserProfile | null
  onSubmit: (payload: UserPayload) => Promise<void>
  submitLabel?: string
  cancelHref?: string
}

type FormErrors = Partial<Record<keyof UserPayload, string>>

const EMPTY_VALUES: UserPayload = {
  name: "",
  email: "",
  phone: "",
  state: "",
  city: "",
  bio: "",
  avatar: "",
}

function toPayload(values: UserPayload): UserPayload {
  return {
    name: values.name.trim(),
    email: values.email.trim(),
    ...(values.phone?.trim() ? { phone: values.phone.trim() } : {}),
    ...(values.state?.trim() ? { state: values.state.trim() } : {}),
    ...(values.city?.trim() ? { city: values.city.trim() } : {}),
    ...(values.bio?.trim() ? { bio: values.bio.trim() } : {}),
    ...(values.avatar?.trim() ? { avatar: values.avatar.trim() } : {}),
  }
}

function validate(values: UserPayload): FormErrors {
  const errors: FormErrors = {}
  if (!values.name.trim()) {
    errors.name = "Name is required"
  }
  if (!values.email.trim()) {
    errors.email = "Email is required"
  }
  return errors
}

export function UserForm({
  mode,
  initialValues,
  onSubmit,
  submitLabel,
  cancelHref = "/users",
}: UserFormProps) {
  const defaultValues = useMemo<UserPayload>(() => {
    if (!initialValues) {
      return EMPTY_VALUES
    }
    return {
      name: initialValues.name ?? "",
      email: initialValues.email ?? "",
      phone: initialValues.phone ?? "",
      state: initialValues.state ?? "",
      city: initialValues.city ?? "",
      bio: initialValues.bio ?? "",
      avatar: initialValues.avatar ?? "",
    }
  }, [initialValues])

  const [formValues, setFormValues] = useState<UserPayload>(defaultValues)
  useEffect(() => {
    setFormValues(defaultValues)
    setErrors({})
  }, [defaultValues])

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const title = mode === "create" ? "Create User" : "Update User"

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validate(formValues)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit(toPayload(formValues))
      if (mode === "create") {
        setFormValues(EMPTY_VALUES)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleChange<K extends keyof UserPayload>(key: K, value: string) {
    setFormValues((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }))
    }
  }

  return (
    <section className="rounded-xl border bg-card p-5">
      <h2 className="text-base font-semibold">{title}</h2>
      <form onSubmit={handleSubmit} className="mt-4 grid gap-4">
        <div className="grid gap-1.5">
          <label htmlFor={`${mode}-name`} className="text-sm font-medium">
            Name *
          </label>
          <input
            id={`${mode}-name`}
            value={formValues.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          {errors.name ? <p className="text-xs text-destructive">{errors.name}</p> : null}
        </div>
        <div className="grid gap-1.5">
          <label htmlFor={`${mode}-email`} className="text-sm font-medium">
            Email *
          </label>
          <input
            id={`${mode}-email`}
            type="email"
            value={formValues.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          {errors.email ? <p className="text-xs text-destructive">{errors.email}</p> : null}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-1.5">
            <label htmlFor={`${mode}-phone`} className="text-sm font-medium">
              Phone
            </label>
            <input
              id={`${mode}-phone`}
              value={formValues.phone ?? ""}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div className="grid gap-1.5">
            <label htmlFor={`${mode}-city`} className="text-sm font-medium">
              City
            </label>
            <input
              id={`${mode}-city`}
              value={formValues.city ?? ""}
              onChange={(e) => handleChange("city", e.target.value)}
              className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </div>
        <div className="grid gap-1.5">
          <label htmlFor={`${mode}-state`} className="text-sm font-medium">
            State
          </label>
          <input
            id={`${mode}-state`}
            value={formValues.state ?? ""}
            onChange={(e) => handleChange("state", e.target.value)}
            className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <div className="grid gap-1.5">
          <label htmlFor={`${mode}-avatar`} className="text-sm font-medium">
            Avatar URL
          </label>
          <input
            id={`${mode}-avatar`}
            value={formValues.avatar ?? ""}
            onChange={(e) => handleChange("avatar", e.target.value)}
            className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <div className="grid gap-1.5">
          <label htmlFor={`${mode}-bio`} className="text-sm font-medium">
            Bio
          </label>
          <textarea
            id={`${mode}-bio`}
            value={formValues.bio ?? ""}
            onChange={(e) => handleChange("bio", e.target.value)}
            rows={3}
            className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button type="submit" className="w-fit" disabled={isSubmitting}>
            {isSubmitting
              ? "Saving..."
              : submitLabel ?? (mode === "create" ? "Create" : "Update")}
          </Button>
          <Button asChild type="button" variant="outline" className="w-fit">
            <Link href={cancelHref}>Cancel</Link>
          </Button>
        </div>
      </form>
    </section>
  )
}

