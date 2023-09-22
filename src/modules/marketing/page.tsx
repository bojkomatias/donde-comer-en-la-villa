/** Refers to Landing page as in '/' app entry point */
const Marketing = () => (
  <>
    <h1 class="mx-auto mt-12 max-w-xl text-center font-heading text-2xl font-black leading-relaxed sm:text-4xl">
      ¿Estás{" "}
      <span class="relative inline-block line-through decoration-8 after:absolute after:inset-0 after:-top-4 after:text-2xl after:content-['*muerto'] sm:after:text-3xl">
        <div class="translate-y-2 text-2xl text-gray-500/20 sm:text-4xl ">
          cagado
        </div>
      </span>{" "}
      de hambre?
    </h1>
    <h2 class="mx-auto max-w-xl py-4 text-center text-lg font-thin">
      Si es así, caíste al lugar correcto. ¿Qué querés comer?
    </h2>
    {/* Get the tag filters */}
    {/* <div hx-get="/filters" hx-trigger="load" hx-swap="outerHTML" /> */}

    {/* Search bar */}

    {/* List of businesses */}
    <div hx-get="/results" hx-trigger="load" hx-swap="outerHTML" />
  </>
);

export default Marketing;
