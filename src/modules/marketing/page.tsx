import { SelectTag } from "@/db/schema/tag";
import { Search } from "./search";
import { Filters } from "./filters";
import { Results } from "./results";
import { SelectBusiness } from "@/db/schema/business";

/** Refers to Landing page as in '/' app entry point */
const Marketing = ({
  tags,
  initialData,
}: {
  tags: SelectTag[];
  initialData: SelectBusiness[];
}) => (
  <>
    <h1 class="mx-auto mt-12 max-w-xl select-none text-center font-heading text-2xl font-black leading-relaxed sm:text-4xl">
      ¿Estás{" "}
      <span class="relative inline-block line-through decoration-gray-500 decoration-4 after:absolute after:inset-0 after:-top-2 after:text-xl after:content-['*muerto'] sm:after:-top-4 sm:after:text-3xl">
        <div class="mr-2 translate-y-2 text-2xl text-gray-500/50 sm:text-4xl ">
          cagado
        </div>
      </span>
      de hambre?
    </h1>
    <h2 class="mx-auto max-w-xl py-4 text-center text-sm font-thin sm:text-lg">
      Caíste al lugar correcto. ¿Qué querés comer?
    </h2>

    <div class="mt-4 space-y-2 lg:grid lg:grid-cols-3 lg:space-y-0">
      {/* Search bar */}
      <Search />
      {/* Tag filters */}
      <Filters tags={tags} />
    </div>

    {/* List of businesses */}
    <Results businesses={initialData} />
  </>
);

export default Marketing;
