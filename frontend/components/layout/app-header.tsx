import { getApiBaseUrl } from "@/lib/config"

export function AppHeader() {
  return (
    <header className="border-b">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4">
        <div>
          <p className="text-sm text-muted-foreground">Elastic Search Practice</p>
          <p className="text-base font-semibold">Frontend Playground</p>
        </div>
        {/* <code className="rounded bg-muted px-2 py-1 text-xs">{getApiBaseUrl()}</code> */}
      </div>
    </header>
  )
}

