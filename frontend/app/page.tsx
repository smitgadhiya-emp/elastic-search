import { PageShell } from "@/components/layout/page-shell"
import { PageTitle } from "@/components/common/page-title"

export default function Page() {
  return (
    <PageShell>
      <PageTitle
        title="Dashboard"
        subtitle="Starter dashboard with reusable API + page layout."
      />
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">Total Users</p>
          <p className="mt-2 text-2xl font-semibold">132</p>
        </div>
        <div className="rounded-xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">Search Queries Today</p>
          <p className="mt-2 text-2xl font-semibold">1,248</p>
        </div>
        <div className="rounded-xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">Cluster Health</p>
          <p className="mt-2 text-2xl font-semibold text-green-600">Healthy</p>
        </div>
      </section>
      <section className="rounded-xl border bg-card p-5">
        <h2 className="text-base font-semibold">Next Steps</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Use the sidebar to open `Users`, `Search`, and `Settings` dummy pages.
          You can now attach real Elasticsearch APIs into the shared client.
        </p>
        <p className="mt-3 text-xs text-muted-foreground">
          Tip: press <kbd>d</kbd> to toggle dark mode.
        </p>
      </section>
    </PageShell>
  )
}
