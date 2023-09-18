const Marketing = () => (
  <>
    <h2 class="pt-16 text-center text-4xl font-semibold">
      Donde pingo se puede comer!!
    </h2>
    <p class="mb-12 text-center text-lg font-light italic">
      Estas cagado de hambre y no sabes donde mierda buscar? Llegaste al lugar
      correcto.
    </p>
    <div hx-get="/tags" hx-swap="outerHTML" hx-trigger="load" />
    <div id="businesses" />
  </>
);

export default Marketing
