import Link from "next/link"

import { PageTitle } from "@/components/common/page-title"
import { PageShell } from "@/components/layout/page-shell"
import { CreateUserForm } from "@/components/users/create-user-form"
import { Button } from "@/components/ui/button"

export default function CreateUserPage() {
  return (
    <PageShell>
      <div className="flex items-center justify-between gap-3">
        <PageTitle title="Create User" subtitle="Create a new user profile." />
        <Button asChild variant="outline">
          <Link href="/users">Back to Users</Link>
        </Button>
      </div>
      <CreateUserForm />
    </PageShell>
  )
}

