## App Routing

#### Stuff listed below, is merely convention, be sure to stick to it, nothing magical will happen

- Layout: Shell that persists across routing (eg. DashboardLayout) (layouts are just consumed by nested layouts down the line, nothing magical)
- Template: Shell that is arbitrarily consumed by pages on this level (eg. MarketingTemplate)
- Page: A page visible and navegable as such by the user ('/' , '/q?open=true')
- Route: Route files, that return hypermedia, attached to page, and from the level forward. (Route can go deeper internally (`id/:foo/:bar`), but no segments should be created just if route.tsx gets deeper)
- Head: Html `<head />` tag, consumed in the layout of the segment

** Page is the norm for creating a new segment level **
