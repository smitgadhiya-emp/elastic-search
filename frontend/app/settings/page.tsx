import { PageTitle } from "@/components/common/page-title"
import { PageShell } from "@/components/layout/page-shell"
import { getApiBaseUrl } from "@/lib/config"

export default function SettingsPage() {
  return (
    <PageShell>
      <PageTitle
        title="Settings"
        subtitle="Project-level config preview for the frontend boilerplate."
      />

      <section className="grid gap-4 sm:grid-cols-2">
        {/* <div className="rounded-xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">API Base URL</p>
          <code className="mt-2 block rounded bg-muted px-2 py-1 text-xs">
            {getApiBaseUrl()}
          </code>
        </div> */}
        <div className="rounded-xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">Theme toggle</p>
          <p className="mt-2 text-sm">Press keyboard key `d` to switch dark/light mode.</p>
        </div>
      </section>
    </PageShell>
  )
}

