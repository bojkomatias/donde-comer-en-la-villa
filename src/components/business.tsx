import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Business = () => (
  <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
    <div>
      <h1 className="font-heading text-xl font-black leading-loose">Profile</h1>
      <p className="mt-1 text-sm leading-6 text-gray-500">
        This information will be displayed publicly so be careful what you
        share.
      </p>
    </div>
  </div>
);

Business.Form = () => (
  <form class="" hx-swap="none" hx-post="/business">
    <Input name="name" label="nombre" />
    <Input name="description" label="descripción" />
    <Input
      name="phone"
      label="teléfono"
      type="tel"
      pattern="[+549]{4}[0-9]{10}"
      title="Numero con prefijo (+549) seguido de 10 dígitos"
      placeholder="+54934551111"
    />
    <Input name="location" label="dirección" />
    <Input
      name="socials"
      label="sociales"
      type="url"
      placeholder="https://www.instagram.com/sample/, https://www.instagram.com/sample2/"
    />
    <Input
      name="webpage"
      label="pagina web"
      type="url"
      placeholder="https://www.matiasbojko.com"
    />
    <Input
      name="tags"
      label="tags"
      options={[
        "Hamburguesas",
        "Pizzas",
        "Empanadas",
        "Helados",
        "Momento",
        "Facturas",
      ]}
      multiple="true"
    />
    <Input name="featured" label="Promocionado" type="checkbox" />
    <Input
      name="owner"
      label="Owner"
      options={["Matias Bojko", "Nicolas Horn", "Amilcar Rey"]}
    />
    <Button class="float-right my-4" intent="primary">
      Guardar
    </Button>
  </form>
);

export default Business;
