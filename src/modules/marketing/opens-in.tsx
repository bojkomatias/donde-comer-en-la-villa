import { SelectBusinessHours } from "@/db/schema/business-hours";
import { Badge } from "@/ui/badge";
import { relativeTime } from "@/utils/date-helpers";
import { open } from "fs";

export const OpensIn = ({
  businessHours,
}: {
  businessHours: SelectBusinessHours | null;
}) => {
  if (!businessHours) return <></>;
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
    return <Badge class="text-emerald-500">Abierto</Badge>;

  if (
    businessHours.day === today &&
    (opensHour > hour || (opensHour === hour && opensMinute > minute))
  )
    return (
      <Badge class="text-accent-foreground">Abre {businessHours.opens} </Badge>
    );

  return <Badge class="text-muted-foreground">Hoy cerrado</Badge>;
};
