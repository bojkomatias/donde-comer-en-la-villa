import { button } from "@/ui/button";
import { _trigger, _content, dropdown } from "@/ui/dropdown";
import { Hover } from "@/ui/hover-transition";
import { dict } from "@/utils/dictionary";

export const OpenFilter = () => (
  <div class={dropdown().base()}>
    <button _={_trigger} class={button({ intent: "outline" })}>
      <span id="open-label">Abierto hoy</span>
      <i class="i-lucide-calendar-clock" />
    </button>
    <div class={dropdown().content({ class: "w-48" })} _={_content}>
      <div class={dropdown().header({ class: "text-sm font-semibold" })}>
        {dict.get("businessHours")}
      </div>
      <div class={dropdown().separator()} />
      <Hover>
        <Hover.Item>
          <button
            class={dropdown().item()}
            hx-get="/q?open=true"
            hx-target="#results"
            hx-push-url="true"
            hx-swap="outerHTML"
            _={`init if window.location.search is '?open=true' then send changeFilter to me end
            on click send changeFilter to me end
            on changeFilter take .text-foreground tell <i/> in me take .i-lucide-check put 'Abierto ahora' into #open-label tell .query-listener set @hx-vals to '{"open":"true"}' send removeI to .tag-indicator`}
          >
            Abierto ahora <i />
          </button>
        </Hover.Item>
        <Hover.Item>
          <button
            class={dropdown().item()}
            hx-get="/q?today=true"
            hx-target="#results"
            hx-push-url="true"
            hx-swap="outerHTML"
            _={`init if window.location.search is '?today=true' then send changeFilter to me end
            on click send changeFilter to me end
            on changeFilter take .text-foreground tell <i/> in me take .i-lucide-check put 'Abierto hoy' into #open-label tell .query-listener set @hx-vals to '{"today":"true"}' send removeI to .tag-indicator`}
          >
            Abierto hoy <i />
          </button>
        </Hover.Item>
        <Hover.Item>
          <button
            class={dropdown().item()}
            hx-get="/q"
            hx-push-url="true"
            hx-target="#results"
            hx-swap="outerHTML"
            _={`init if window.location.search is '' then send changeFilter to me end
            on click send changeFilter to me end
            on changeFilter take .text-foreground tell <i/> in me take .i-lucide-check put 'Todos' into #open-label tell .query-listener set @hx-vals to '{}' send removeI to .tag-indicator`}
          >
            Todos <i />
          </button>
        </Hover.Item>
      </Hover>
    </div>
  </div>
);
