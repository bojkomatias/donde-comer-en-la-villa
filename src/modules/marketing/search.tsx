import { SearchBar } from "@/ui/search-bar";

export const Search = () => {
  return (
    <SearchBar
      id="search"
      name="search"
      placeholder="Busca locales, comidas ..."
      hx-get="/search"
      hx-trigger="keyup changed delay:500ms, search"
      hx-target="#results"
      hx-swap="outerHTML"
      hx-include="this"
      key="k"
      class="mx-4 lg:mr-0"
    />
  );
};
