"use client"

import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import { useDebounce } from "@/hooks/use-debounce"
import type { UserProfile } from "@/lib/api/users"
import { UserList } from "@/components/users/user-list"

type UsersListSectionProps = {
  users: UserProfile[]
}

export function UsersListSection({ users }: UsersListSectionProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const searchFromUrl = searchParams.get("search") ?? ""

  const [searchInput, setSearchInput] = useState(searchFromUrl)
  const debouncedQuery = useDebounce(searchInput, 400)

  useEffect(() => {
    setSearchInput(searchFromUrl)
  }, [searchFromUrl])

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    const trimmedQuery = debouncedQuery.trim()

    if (trimmedQuery) {
      params.set("search", trimmedQuery)
    } else {
      params.delete("search")
    }

    const nextQueryString = params.toString()
    const nextUrl = nextQueryString ? `${pathname}?${nextQueryString}` : pathname
    const currentQueryString = searchParams.toString()
    const currentUrl = currentQueryString ? `${pathname}?${currentQueryString}` : pathname

    if (nextUrl !== currentUrl) {
      router.replace(nextUrl)
    }
  }, [debouncedQuery, pathname, router, searchParams])

  const emptyMessage =
    debouncedQuery.trim().length > 0
      ? "No users match your search."
      : "No users found. Click Add User to create one."

  return (
    <div className="grid gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="search"
          placeholder="Search by name, email, city, state..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring sm:max-w-md"
        />
        <Button asChild>
          <Link href="/users/create">Add User</Link>
        </Button>
      </div>

      <UserList users={users} emptyMessage={emptyMessage} />
    </div>
  )
}

