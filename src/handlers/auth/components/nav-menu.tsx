import { Button } from "@/components/ui/button";

export const NavMenu = () => (
  <div
    id="menu"
    class="relative inline-block text-left"
    hx-target="body"
    hx-swap="innerHTML"
  >
    <Button
      _="on click halt 
        on click send change to #dropdown end
        on keyup
         if the event's key is 'Escape'
           add .hidden to #dropdown
           trigger keyup
        end"
      class="rounded-full p-0"
    >
      <img
        src="https://avatars.githubusercontent.com/u/55543631?s=48&v=4"
        class="h-8 w-8 overflow-hidden rounded-full"
        alt="User image"
      />
    </Button>

    <div
      id="dropdown"
      role="menu"
      class="dropdown absolute right-0 z-10 mt-1 hidden w-56 origin-top-right scale-95 divide-y divide-gray-100 rounded-md bg-gray-50 opacity-0 shadow-lg ring-1 ring-gray-400/20 transition duration-150 ease-in-out focus:outline-none dark:divide-gray-800 dark:bg-gray-950"
      _="on change 
        if @class contains 'hidden' 
          then toggle .hidden on me wait
            then toggle .opacity-0 .scale-95 on me
        else toggle .opacity-0 .scale-95 on me settle then add .hidden to me"
    >
      <div
        hx-get="/auth/navigation"
        hx-target="this"
        hx-swap="outerHTML"
        hx-trigger="load"
      />
      <button
        hx-post="/auth/logout"
        hx-push-url="true"
        class="flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold hover:bg-gray-400/10"
        tabindex="-1"
      >
        <i class="i-lucide-log-out h-4 w-4 text-gray-500" />
        Logout
      </button>
    </div>
  </div>
);
