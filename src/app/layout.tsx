import { siteConfig } from "@/config/site";
import { button } from "@/ui/button";
import DarkMode from "@/ui/dark-mode-toggle";
import Head from "./head";

export default function Layout({ children }: { children: JSX.Element[] }) {
  return (
    <html lang="en">
      <Head />
      <body
        class="w-screen overflow-x-hidden bg-background text-foreground antialiased"
        hx-boost="true"
        hx-ext="response-targets, preload"
        // Handles click outside for all menus
        _="on click send close to .dropdown end"
      >
        {/* Notifications fall all here! */}
        <div id="notification" />

        {/* Main content */}
        <div id="page-content" class="min-h-[100svh]">
          {children}
        </div>

        {/* Footer */}
        <footer class="border-t border-border bg-card">
          <div class="flex flex-col items-center gap-6 px-2 py-8 sm:flex-row sm:px-6 lg:px-16">
            <i class="i-ic-baseline-restaurant h-6 w-6 text-card-foreground" />
            <p class="flex-auto text-center text-sm leading-loose text-muted-foreground sm:text-left">
              Built by{" "}
              <a
                href={siteConfig.links.twitter}
                class={button({ intent: "link", class: "lowercase" })}
              >
                bojkomatias
              </a>
              .<br class="block sm:hidden" /> Source code available on{" "}
              <a
                href={siteConfig.links.github}
                class={button({ intent: "link" })}
              >
                Github
              </a>
            </p>
            <DarkMode />
          </div>
        </footer>
      </body>
    </html>
  );
}
