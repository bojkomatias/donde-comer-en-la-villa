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
      <span class="relative inline-block line-through decoration-8 after:absolute after:inset-0 after:-top-4 after:text-2xl after:content-['*muerto'] sm:after:text-3xl">
        <div class="translate-y-2 text-2xl text-gray-500/20 sm:text-4xl ">
          cagado
        </div>
      </span>
      de hambre?
    </h1>
    <h2 class="mx-auto max-w-xl py-4 text-center text-lg font-thin">
      Si es así, caíste al lugar correcto. ¿Qué querés comer?
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
