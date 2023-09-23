import { siteConfig } from "@/config/site";
import DarkMode from "./dark-mode-toggle";

export function Layout({ children }: { children?: any }) {
  return (
    <>
      {`<!DOCTYPE html>`}
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="description" content={siteConfig.description} />
          <meta name="keywords" content={siteConfig.keywords} />
          <meta name="author" content={siteConfig.author} />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          {/* HTMX */}
          <script
            src="https://unpkg.com/htmx.org@1.9.5"
            integrity="sha384-xcuj3WpfgjlKF+FXhSQFQ0ZNr39ln+hwjN3npfM9VBnUskLolQAcN80McRIVOPuO"
            crossorigin="anonymous"
          />
          {/* Preload Ext */}
          <script src="https://unpkg.com/htmx.org/dist/ext/preload.js"></script>
          {/* Target Response Ext */}
          <script src="https://unpkg.com/htmx.org/dist/ext/response-targets.js"></script>
          {/* htmx configuration */}
          <script>htmx.config.globalViewTransitions = true;</script>

          {/* Hyperscript */}
          <script src="https://unpkg.com/hyperscript.org@0.9.11"></script>
          {/* TailwindCSS */}
          <link href="/styles.css" rel="preload stylesheet" />
          {/* Fonts */}
          <link
            href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@1&f[]=bespoke-stencil@2,1&f[]=outfit@1&display=swap"
            rel="stylesheet"
          />

          {/* Favicon + Title */}
          <link rel="icon" href="/public/vercel.svg" />
          <title>{siteConfig.name}</title>
        </head>
        <body
          class="bg-white text-black/80 subpixel-antialiased dark:bg-gray-950 dark:text-white/80"
          hx-boost="true"
          hx-ext="response-targets, preload"
          _="on click add .hidden .opacity-0 .scale-95 to .dropdown end"
          // Handles click outside for all menus
        >
          {/* Notifications fall all here! */}
          <div id="notification" />
          <div>
            <header class="border-b py-3 dark:border-gray-700">
              <div class="container mx-auto flex h-11 items-center justify-between px-4 sm:px-6 lg:px-16">
                <a
                  href="/"
                  class="font-heading font-black hover:text-black dark:hover:text-white"
                  tabindex="-1"
                >
                  {siteConfig.name}
                </a>
                <div
                  hx-get="/auth/status"
                  hx-trigger="load"
                  hx-swap="outerHTML"
                />
              </div>
            </header>
            <main class="container mx-auto min-h-screen px-0 pb-8 sm:px-6 lg:px-16">
              {children}
            </main>
          </div>
          <footer class="border-t dark:border-gray-700">
            <div class="container mx-auto flex flex-col items-center gap-6 px-2 py-8 sm:flex-row sm:px-6 lg:px-16">
              <i class="i-lucide-activity h-8 w-8" />
              <p class="flex-auto text-center text-sm leading-loose text-gray-600 dark:text-gray-400 sm:text-left">
                Built by{" "}
                <a
                  href={siteConfig.links.twitter}
                  class="text-black underline underline-offset-2 dark:text-white"
                >
                  bojkomatias
                </a>
                .<br class="block sm:hidden" /> Source code available on{" "}
                <a
                  href={siteConfig.links.github}
                  class="text-black underline underline-offset-2 dark:text-white"
                >
                  Github
                </a>
              </p>
              <DarkMode />
            </div>
          </footer>
        </body>
      </html>
    </>
  );
}
