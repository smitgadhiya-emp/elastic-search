import { PageTitle } from "@/components/common/page-title"
import { PageShell } from "@/components/layout/page-shell"

const DUMMY_QUERIES = [
  "users in ahmedabad",
  "users with phone number",
  "recently updated profiles",
]

export default function SearchPage() {
  return (
    <PageShell>
      <PageTitle
        title="Search"
        subtitle="Dummy search page UI for future Elasticsearch integration."
      />

      <section className="rounded-xl border bg-card p-5">
        <div className="space-y-3">
          <label htmlFor="query" className="text-sm font-medium">
            Query
          </label>
          <input
            id="query"
            placeholder="Try: users in surat"
            className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      </section>

      <section className="rounded-xl border bg-card p-5">
        <h2 className="text-sm font-medium">Suggested Queries</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {DUMMY_QUERIES.map((query) => (
            <span key={query} className="rounded-full border px-3 py-1 text-xs">
              {query}
            </span>
          ))}
        </div>
      </section>
    </PageShell>
  )
}

