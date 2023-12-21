export const modalityOptions = [
  { id: 1, name: "En local" },
  { id: 2, name: "Delivery" },
  { id: 3, name: "Take away" },
];

export const inverseModality = (modalities: string) =>
  modalities
    .split(",")
    .map((e) => modalityOptions.find((s) => s.name === e)!.id);
