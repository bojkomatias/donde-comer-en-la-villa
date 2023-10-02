import Dropdown from "@/ui/dropdown";
import { Hover } from "@/ui/hover-transition";
import { dict } from "@/utils/dictionary";

export const OpenFilter = () => (
  <Dropdown>
    <Dropdown.Trigger intent="outline">
      <span id="open-label">Abierto hoy</span>
      <i class="i-lucide-calendar-clock" />
    </Dropdown.Trigger>
    <Dropdown.Content class="w-48">
      <Dropdown.Header class="text-sm font-semibold">
        {dict.get("businessHours")}
      </Dropdown.Header>
      <Dropdown.Separator />
      <Hover>
        <Hover.Item>
          <Dropdown.Item
            hx-get="/q?open=true"
            hx-target="#results"
            hx-swap="outerHTML"
            _={`on click take .text-foreground tell <i/> in me take .i-lucide-check put 'Abierto ahora' into #open-label end
            on click tell .query-listener set @hx-vals to '{"open":"true"}' send removeI to .tag-indicator`}
          >
            Abierto ahora <i />
          </Dropdown.Item>
        </Hover.Item>
        <Hover.Item>
          <Dropdown.Item
            hx-get="/q?today=true"
            hx-target="#results"
            hx-swap="outerHTML"
            _={`init add .text-foreground end
          on click take .text-foreground tell <i/> in me take .i-lucide-check put 'Abierto hoy' into #open-label end
          on click tell .query-listener set @hx-vals to '{"today":"true"}' send removeI to .tag-indicator`}
          >
            Abierto hoy <i class="i-lucide-check" />
          </Dropdown.Item>
        </Hover.Item>
        <Hover.Item>
          <Dropdown.Item
            hx-get="/q"
            hx-target="#results"
            hx-swap="outerHTML"
            _={`on click take .text-foreground tell <i/> in me take .i-lucide-check put 'Todos' into #open-label end
            on click tell .query-listener set @hx-vals to '{}' send removeI to .tag-indicator`}
          >
            Todos <i />
          </Dropdown.Item>
        </Hover.Item>
      </Hover>
    </Dropdown.Content>
  </Dropdown>
);
