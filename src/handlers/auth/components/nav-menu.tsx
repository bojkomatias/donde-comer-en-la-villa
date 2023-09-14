import { Button } from "@/components/ui/button";

export const NavMenu = () => (
  <div
    id="menu"
    class="relative inline-block text-left"
    hx-target="body"
    hx-swap="innerHTML"
  >
    <Button
      _="on click toggle .hidden on #dropdown end
        on keyup
         if the event's key is 'Escape'
           add .hidden to #dropdown
           trigger keyup
        end"
      intent="secondary"
    >
      Menu
      <i class="i-lucide-chevron-down" />
    </Button>

    <div
      id="dropdown"
      role="menu"
      class="absolute right-0 z-10 mt-1 hidden w-56 origin-top-right rounded-md bg-gray-100 shadow-lg ring-1 ring-gray-400/20 focus:outline-none dark:bg-gray-850"
    >
      <div class="py-1">
        <a
          href="/"
          hx-push-url="true"
          class="flex items-center gap-3 px-4 py-3 text-sm opacity-80 hover:bg-gray-400/10 hover:opacity-100"
        >
          <i class="i-lucide-home" />
          Home
        </a>

        <a
          href="/dashboard"
          hx-push-url="true"
          class="flex items-center gap-3 px-4 py-3 text-sm opacity-80 hover:bg-gray-400/10 hover:opacity-100"
        >
          <i class="i-lucide-file-box" />
          Dashboard
        </a>

        <button
          hx-post="/auth/logout"
          hx-push-url="true"
          class="flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold opacity-80 hover:bg-gray-400/10 hover:opacity-100"
        >
          <i class="i-lucide-log-out" />
          Logout
        </button>
      </div>
    </div>
  </div>
);
