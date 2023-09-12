export function BaseHtml({ title, children }: any) {
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
          href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100;0,300;0,400;0,600;0,700;1,100;1,300;1,400;1,500;1,700&display=swap"
          rel="stylesheet"
        />

        {/* Favicon + Title */}
        <link rel="icon" href="/public/elysia.png" />
        <title>{title}</title>
      </head>

      <body
        class="mx-auto max-w-7xl bg-white p-4 subpixel-antialiased dark:bg-gray-800"
        hx-boost="true"
        hx-ext="response-targets, preload"
      >
        {children}
      </body>
    </html>
  );
}
