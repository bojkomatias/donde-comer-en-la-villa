import { siteConfig } from "@/config/site";
import { BaseLayout } from "../layout";

export function MarketingLayout({ children }: { children: any }) {
  return (
    <BaseLayout>
      <header class="flex h-16 items-center justify-between border-b border-border px-4 sm:px-6 lg:px-16">
        <a
          href="/"
          class="font-heading font-black hover:text-accent-foreground"
          tabindex="-1"
        >
          {siteConfig.name}
        </a>
        <div hx-get="/auth/status" hx-trigger="load" hx-swap="outerHTML" />
      </header>
      <main class="min-h-screen px-2 pb-8 sm:px-6 lg:px-16">{children}</main>
    </BaseLayout>
  );
}
