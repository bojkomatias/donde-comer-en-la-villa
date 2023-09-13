import { LoginButton, NavMenu } from "../plugins/auth";
import DarkMode from "./ui/dark-mode-toggle";

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
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
        <link href="/public/output.css" rel="preload stylesheet" />
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;800&display=swap"
          rel="stylesheet"
        />

        {/* Favicon + Title */}
        <link rel="icon" href="/public/elysia.png" />
        <title>{title}</title>
      </head>
      <body
        class="bg-white text-gray-800 subpixel-antialiased dark:bg-gray-900 dark:text-white/90"
        hx-boost="true"
        hx-ext="response-targets, preload"
        _="on every htmx:beforeSend in <button /> tell it toggle @disabled until htmx:afterOnLoad"
      >
        <header class="mx-auto flex max-w-7xl items-center justify-end gap-6 py-6">
          {isAuth ? <NavMenu /> : <LoginButton />}
          <DarkMode />
        </header>
        <main
          class="mx-auto min-h-screen max-w-7xl py-8"
          _="on click add .hidden to #dropdown end"
        >
          {children}
        </main>
      </body>
    </html>
  );
}
