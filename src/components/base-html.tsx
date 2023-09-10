export function BaseHtml({ children }: any) {
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
        {/* TailwindCSS */}
        <link href="/public/output.css" rel="preload stylesheet" />
        <link rel="icon" href="/public/elysia.png" />
        <title>Bun + Elysia + HTMX</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
