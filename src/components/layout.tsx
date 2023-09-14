import { NavMenu } from "@/handlers/auth/components/nav-menu";
import DarkMode from "./ui/dark-mode-toggle";
import { LoginButton } from "@/handlers/auth/components/login-button";

export function Layout({
  title,
  isAuth,
  children,
}: {
  title: string;
  isAuth: boolean;
  children?: any;
}) {
  return (
    <>
      {`<!DOCTYPE html>`}
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
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
          <link href="/public/output.css" rel="preload stylesheet" as="style" />
          {/* Google Fonts */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin
            as="font"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />

          {/* Favicon + Title */}
          <link rel="icon" href="/public/favicon.ico" />
          <title>{title}</title>
        </head>
        <body
          class="bg-white text-black/70 subpixel-antialiased dark:bg-gray-950 dark:text-white/70"
          hx-boost="true"
          hx-ext="response-targets, preload"
          _={`on every htmx:beforeSend in <button /> tell it toggle @disabled until htmx:afterOnLoad end
        on click add .hidden .opacity-0 .scale-95 to .dropdown end`}
          // Handles click outside for all menus
        >
          <header class="border-b py-3 dark:border-gray-700">
            <div class="mx-auto flex max-w-7xl items-center justify-between px-8">
              <a
                href="/"
                class="flex items-end gap-3 text-xl font-black"
                tabindex="-1"
              >
                <i class="i-lucide-activity h-8 w-8" />
                <span>Activity</span>
              </a>

              {isAuth ? <NavMenu /> : <LoginButton />}
            </div>
          </header>
          <main class="mx-auto min-h-screen max-w-7xl px-0 lg:px-6">
            {children}
          </main>
          <footer class="border-t dark:border-gray-700">
            <div class="mx-auto flex max-w-7xl flex-col items-center gap-6 p-8 sm:flex-row">
              <i class="i-lucide-activity h-8 w-8" />
              <p class="flex-auto text-center text-sm leading-loose text-gray-600 dark:text-gray-400 sm:text-left">
                Built by{" "}
                <a class="text-black underline underline-offset-2 dark:text-white">
                  bojkomatias
                </a>
                . Source code available on{" "}
                <a class="text-black underline underline-offset-2 dark:text-white">
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
