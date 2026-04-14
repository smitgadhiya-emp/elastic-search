import Link from "next/link"

import { PageTitle } from "@/components/common/page-title"
import { PageShell } from "@/components/layout/page-shell"
import { UpdateUserForm } from "@/components/users/update-user-form"
import { Button } from "@/components/ui/button"
import { fetchUserById } from "@/lib/api/users"

type EditUserPageProps = {
  params: Promise<{ id: string }>
}

export default async function EditUserPage({ params }: EditUserPageProps) {
  const { id } = await params
  const userResult = await fetchUserById(id)

  return (
    <PageShell>
      <div className="flex items-center justify-between gap-3">
        <PageTitle title="Update User" subtitle="Edit an existing user profile." />
        <Button asChild variant="outline">
          <Link href="/users">Back to Users</Link>
        </Button>
      </div>

      {!userResult.success || !userResult.data ? (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm">
          Failed to load user: {userResult.success ? "User not found" : userResult.message}
        </div>
      ) : (
        <UpdateUserForm user={userResult.data} />
      )}
    </PageShell>
  )
}

