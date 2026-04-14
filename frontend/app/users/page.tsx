import { PageTitle } from "@/components/common/page-title"
import { PageShell } from "@/components/layout/page-shell"
import { UsersListSection } from "@/components/users/users-list-section"
import { fetchUsers } from "@/lib/api/users"

type UsersPageProps = {
  searchParams: Promise<{ search?: string }>
}

export default async function UsersPage({ searchParams }: UsersPageProps) {
  const { search } = await searchParams
  const usersResult = await fetchUsers(search)

  return (
    <PageShell>
      <PageTitle
        title="Users"
        subtitle="Browse all users and open dedicated create/edit pages."
      />

      {!usersResult.success ? (
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm">
          Failed to load users: {usersResult.message}
        </div>
      ) : (
        <UsersListSection users={usersResult.data ?? []} />
      )}
    </PageShell>
  )
}

