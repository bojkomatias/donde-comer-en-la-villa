import { SelectBusiness } from "@/db/schema/business";
import { Badge } from "@/ui/badge";

export const Results = ({ businesses }: { businesses?: SelectBusiness[] }) => {
  const Abusinesses = [
    {
      id: 1,
      name: "Sir Pane",
      description: "Las burgers que te van a dejar con hambre",
      phone: "+5493435444630",
      instagram: "sir.pane",
      twitter: "",
      address: "",
      location: "",
      webpage: "",
      image:
        "https://scontent.cdninstagram.com/v/t51.2885-19/341345283_1065553787735492_6192540832691458609_n.jpg?stp=dst-jpg_s160x160&_nc_cat=104&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=iT5bSWvDxrUAX-8vgyY&_nc_ht=scontent.cdninstagram.com&oh=00_AfCl_beSY_wbgJ6u2mKhqGAXFzc_17gf87QZL_OtHX9N8A&oe=651169D2",
      tags: [
        "Hamburguesas",
        "Pizzas",
        "Piedra",
        "Horno",
        "Hamburguesas",
        "Pizzas",
        "Piedra",
        "Horno",
      ],
      featured: true,
      enabled: true,
      owner: 1,
      createdAt: "2023-09-21 22:45:40",
      updatedAt: "2023-09-21 22:45:40",
    },
    {
      id: 2,
      name: "Lage Pizzas",
      description: "Las burgers que te van a dejar con hambre",
      phone: "+5493435444630",
      instagram: "lagepizzas",
      twitter: "",
      address: "",
      location: "",
      webpage: "pedix.app/sirpane",
      image:
        "https://scontent.cdninstagram.com/v/t51.2885-19/354561959_3444065439181557_5700418834955808138_n.jpg?stp=dst-jpg_s160x160&_nc_cat=109&ccb=1-7&_nc_sid=8ae9d6&_nc_ohc=Kp4BzhWbPfAAX-7LTQr&_nc_ht=scontent.cdninstagram.com&oh=00_AfAjdyf6MPUoFvIzuZMpsGPx0ge-5fXvsoaV_mlGDel5tw&oe=65120429",
      tags: ["Hamburguesas", "Empanadas"],

      featured: true,
      enabled: true,
      owner: 1,
      createdAt: "2023-09-21 22:45:40",
      updatedAt: "2023-09-21 22:45:40",
    },
  ];
  return (
    <div class="space-y-6 p-3 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
      {Abusinesses.map((business) => (
        <BusinessItem business={business} />
      ))}
    </div>
  );
};

const BusinessItem = ({ business }: { business: SelectBusiness }) => (
  <div class="rounded-lg bg-gray-50 p-2 dark:bg-gray-900/50">
    <div class="flex gap-3">
      <img
        src={business.image}
        height="50"
        width="50"
        class="h-20 w-20 rounded-full p-2"
        alt="business image"
      />
      <div class="flex-grow">
        <div class="font-bold leading-loose">{business.name}</div>
        <div class="text-xs font-thin">{business.description}</div>
        <div class="flex gap-4 pt-2">
          <a
            href="#"
            class="flex items-center gap-1 text-xs underline-offset-2 hover:underline"
          >
            <i class="i-simple-icons-whatsapp h-3.5 w-3.5" />
            {business.phone}
          </a>
          <a
            href="#"
            class="flex items-center gap-1 text-sm underline-offset-2 hover:underline"
          >
            <i class="i-simple-icons-instagram h-3.5 w-3.5" />@
            {business.instagram}
          </a>
        </div>
      </div>
    </div>
    <div class="mt-4 flex gap-1 overflow-hidden">
      {business.tags?.map((e, i) => <Badge>{e}</Badge>)}
    </div>
  </div>
);
