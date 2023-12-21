import { siteConfig } from "@/config/site";
import { button } from "@/ui/button";
import DarkMode from "@/ui/dark-mode-toggle";
import Head from "./head";

export default function Layout({ children }: { children: JSX.Element[] }) {
  return (
    <html lang="en">
      <Head />
      <body
        class="overflow-x-hidden bg-background text-foreground antialiased"
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
          <div class="flex flex-col items-center justify-between gap-6 px-2 py-8 text-muted-foreground sm:flex-row sm:px-6 lg:px-16">
            <p class="text-center text-sm leading-loose sm:text-left">
              <i class="i-ic-baseline-restaurant -mb-1 mr-2 h-5 w-5 text-card-foreground" />
              Desarrollado por{" "}
              <a
                href={siteConfig.links.twitter[0]}
                class={button({ intent: "link", class: "lowercase" })}
              >
                bojkomatias
              </a>
              {' '} & {' '}
              <a
                href={siteConfig.links.twitter[1]}
                class={button({ intent: "link", class: "lowercase" })}
              >
                nic0horn
              </a>
            </p>
            <div class="space-x-4 flex-grow ml-5">
              <a
                href={siteConfig.links.github[0]}
                class={button({ intent: "link", size: "sm" })}
              >
                Github
              </a>
              <a href="/docs" class={button({ intent: "link", size: "sm" })}>
                Docs
              </a>
              <a
                href="https://wa.me/+5493455286829"
                class={button({ intent: "link", size: "sm" })}
              >
                Contacto
              </a>
            </div>
            <DarkMode />
          </div>
        </footer>
      </body>
    </html>
  );
}
