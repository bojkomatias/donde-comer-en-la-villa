import { siteConfig } from "@/config/site";

export default function Head() {
  return (
    <head>
      <meta charset="UTF-8" />
      <meta name="description" content={siteConfig.description} />
      <meta name="keywords" content={siteConfig.keywords} />
      <meta name="author" content={siteConfig.author} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      {/* Google tag (gtag.js) */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-EMR1XQ70DL"></script>
      <script>
       {` window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-EMR1XQ70DL');`}
      </script>
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
      <link rel="icon" href="/public/utensils-solid.svg" />
      <title>{siteConfig.name}</title>
    </head>
  );
}
