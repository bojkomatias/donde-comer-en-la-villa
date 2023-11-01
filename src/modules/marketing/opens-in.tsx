import { SelectBusinessHours } from "@/db/schema/business-hours";
import { badge } from "@/ui/badge";

export const OpensIn = ({
  businessHours,
}: {
  businessHours: SelectBusinessHours | null;
}) => {
  if (!businessHours) return <span class={badge()}></span>;
  const today = new Date().getDay();
  const hour = new Date().getHours();
  const minute = new Date().getMinutes();
  const [opensHour, opensMinute] = businessHours.opens
    .split(":")
    .map((e) => parseInt(e));
  const [closesHour, closesMinute] = businessHours.closes
    .split(":")
    .map((e) => parseInt(e));

  if (
    (opensHour < hour || (opensHour === hour && opensMinute < minute)) &&
    (closesHour > hour || (closesHour === hour && closesMinute > minute))
  )
    return <span class={badge()}>Abierto</span>;

  if (
    businessHours.day === today &&
    (opensHour > hour || (opensHour === hour && opensMinute > minute))
  )
    return <span class={badge()}>Abre {businessHours.opens}</span>;

  if (businessHours.day !== today)
    return <span class={badge()}>Hoy cerrado</span>;

  return <span class={badge()}>-</span>;
};
