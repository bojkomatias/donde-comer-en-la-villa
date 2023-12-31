export const relativeTime = new Intl.RelativeTimeFormat("es", {
  style: "short",
});

export const dayNumberToText: { [key: number]: string } = {
  0: "Domingo",
  1: "Lunes",
  2: "Martes",
  3: "Miércoles",
  4: "Jueves",
  5: "Viernes",
  6: "Sábado",
};
