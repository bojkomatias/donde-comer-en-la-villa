import { SelectTag } from "@/db/schema/tag";
import { Search } from "./search";
import { Filters } from "./filters";
import { Results } from "./results";
import { SelectBusiness } from "@/db/schema/business";
import { SelectBusinessHours } from "@/db/schema/business-hours";
import { OpenFilter } from "./open-filter";

/** Refers to Landing page as in '/' app entry point */
const Marketing = ({
  tags,
  initialData,
}: {
  tags: SelectTag[];
  initialData: (SelectBusiness & {
    reviews: number | null;
    businessHours: SelectBusinessHours | null;
  })[];
}) => (
  <>
    <h1 class="mx-auto mt-12 max-w-xl select-none text-center font-heading text-2xl font-black leading-relaxed sm:text-4xl">
      ¿Estás c*gado de hambre?
    </h1>
    <h2 class="mx-auto max-w-xl py-4 text-center text-base font-light sm:text-lg">
      Caíste al lugar correcto. ¿Qué querés comer?
    </h2>

    {/* <div class="mt-4 space-y-2 lg:grid lg:grid-cols-3 lg:space-y-0"> */}
    <div class="mx-1 mb-2 flex gap-2 sm:mx-4">
      {/* Search bar */}
      <Search />
      {/* Open filter */}
      <OpenFilter />
    </div>
    {/* Tag filters */}
    <Filters tags={tags} />
    {/* </div> */}

    {/* List of businesses */}
    <Results businesses={initialData} />
  </>
);

export default Marketing;
