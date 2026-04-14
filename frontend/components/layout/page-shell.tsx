import type { ReactNode } from "react"

type PageShellProps = {
  children: ReactNode
}

export function PageShell({ children }: PageShellProps) {
  return (
    <main className="flex-1 p-4 md:p-6">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">{children}</div>
    </main>
  )
}

