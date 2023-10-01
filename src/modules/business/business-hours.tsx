import { SelectBusinessHours } from "@/db/schema/business-hours";
import { Button } from "@/ui/button";
import Card from "@/ui/card";
import { DashboardHeading } from "@/ui/dashboard/heading";
import { DashboardContent } from "@/ui/dashboard/wrapper";
import { Input } from "@/ui/input";
import { cx } from "@/utils/cx";
import { dict } from "@/utils/dictionary";

const days = [
  { day: 0, label: "domingo" },
  { day: 1, label: "lunes" },
  { day: 2, label: "martes" },
  { day: 3, label: "miércoles" },
  { day: 4, label: "jueves" },
  { day: 5, label: "viernes" },
  { day: 6, label: "sábado" },
];

/* Pattern to validate range of fields HH:MM
pattern="^([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$" */

export const BusinessHours = ({
  id,
  businessHours,
}: {
  id: number;
  businessHours?: SelectBusinessHours[];
}) => (
  <div hx-target="this">
    <DashboardHeading title={dict.get("yourBusiness")} />
    <DashboardContent>
      <Card>
        <Card.Header>
          <Card.Title>{dict.get("businessHours")}</Card.Title>
          <Card.Description>
            Configura tus horarios de atención
          </Card.Description>
        </Card.Header>

        <form hx-post="/d/business/hours" hx-swap="none">
          <input type="hidden" name="business" value={id.toString()} />
          <Card.Content>
            {days.map(({ day, label }) => (
              <div class="flex -space-x-px">
                <Input
                  type="checkbox"
                  name={`${day}`}
                  label={label}
                  value="true"
                  inputClass="top-5"
                  labelClass="mb-3.5"
                  class={cx(
                    "w-24 lg:w-40",
                    day === 0 && "rounded-tl-lg",
                    day === 6 && "rounded-bl-lg",
                  )}
                  _={`on change toggle @disabled='true' on <input/> in next <fieldset/> `}
                />
                <fieldset class="flex flex-grow -space-x-px">
                  <Input
                    name={`open-${day}`}
                    label="Hora de apertura"
                    type="time"
                    class="flex-grow"
                    disabled={true}
                    required="true"
                  />
                  <Input
                    name={`close-${day}`}
                    label="Hora de cierre"
                    type="time"
                    class={cx(
                      "flex-grow",
                      day === 0 && "rounded-tr-lg",
                      day === 6 && "rounded-br-lg",
                    )}
                    disabled={true}
                    required="true"
                  />
                </fieldset>
              </div>
            ))}
          </Card.Content>
          <Card.Footer>
            <Button intent="primary">Save</Button>
          </Card.Footer>
        </form>
      </Card>
    </DashboardContent>
  </div>
);
