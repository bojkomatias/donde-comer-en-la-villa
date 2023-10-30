import { SearchBar } from "@/ui/search-bar";

export const Search = () => {
  return (
    <SearchBar
      id="search"
      name="search"
      placeholder="Busca locales, comidas ..."
      hx-get="/q"
      hx-vals='{"today":"true"}'
      hx-trigger="keyup changed delay:500ms, search"
      hx-target="#results"
      hx-swap="outerHTML"
      hx-include="this"
      key="k"
      // class to listen to changes on business hours change
      class="query-listener flex-grow"
    />
  );
};
