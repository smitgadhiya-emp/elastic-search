import type { ReactNode } from "react"

import { AppHeader } from "@/components/layout/app-header"
import { SideNav } from "@/components/layout/side-nav"

type AppShellProps = {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen">
      <AppHeader />
      <div className="mx-auto flex w-full max-w-7xl flex-col md:flex-row">
        <SideNav />
        {children}
      </div>
    </div>
  )
}

