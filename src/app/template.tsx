import { siteConfig } from "@/config/site";
import Layout from "./layout";

// Marketing Layout
export default function MarketingTemplate({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <Layout>
      <header class="flex h-12 items-center justify-between pt-2">
        <a
          href="/"
          class="ml-3 font-heading font-black text-muted-foreground hover:text-foreground sm:ml-6"
          tabindex="-1"
        >
          {siteConfig.name}
        </a>
        <div hx-get="/auth/status" hx-trigger="load" hx-swap="outerHTML" />
      </header>
      <main class="mx-auto min-h-screen max-w-5xl pb-8">{children}</main>
    </Layout>
  );
}
