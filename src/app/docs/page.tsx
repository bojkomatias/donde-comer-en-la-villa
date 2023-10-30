import Elysia from "elysia";
import MarketingTemplate from "../template";
import { BackButton } from "@/ui/back-button";
import { button } from "@/ui/button";

const docsPage = new Elysia({ name: "docs-page", prefix: "/docs" }).get(
  "/",
  () => <Page />,
);

export default docsPage;
const Page = () => (
  <MarketingTemplate>
    <div class="mx-auto max-w-4xl px-2 py-20 sm:px-8 lg:px-16">
      <BackButton />
      <div class="prose dark:prose-invert">
        <h1>¿Sos dueño?</h1>
        <h2>Viste tu negocio y lo querés reclamar</h2>
        <h3>1 - Creá tu cuenta</h3>
        <p>
          Apretá el botón de "Login" de arriba a la izquierda y vinculá tu
          cuenta de Google. Solo tendrémos acceso a tu email y tu nombre para
          generar un usuario local.
        </p>
        <h3>2 - Escribinos un mensaje</h3>
        <p>
          Luego solo queda verificar de que seas dueño, envianos un Whatsapp a{" "}
          <a
            href="https://wa.me/+5493455286829"
            class={button({ intent: "link" })}
          >
            +54 9 345 528-6829
          </a>{" "}
          desde la cuenta de tu local con el email que te diste de alta. En
          breve verificaremos la petición y te asignamos como dueño en la
          plataforma.
        </p>
        <h4>Excelente! Ya podes configurar tu local</h4>
        <hr class="mt-8" />
        <h2>Querés dar de alta tu negocio</h2>
        <h3>1 - Creá tu cuenta</h3>
        <p>
          Apretá el botón de "Login" de arriba a la izquierda y vinculá tu
          cuenta de Google. Solo tendrémos acceso a tu email y tu nombre para
          generar un usuario local.
        </p>
        <h3>2 - Cargá tu propuesta</h3>
        <p>
          Navegá hasta tu panel de usuario desde la esquina superior izquierda.
          Una vez dentro vas a tener la opción de "Crear tu negocio", cargá los
          datos y envialo.
        </p>
        <h3>3 - Esperá la revisión</h3>
        <p>
          Una vez enviada la propuesta, los administradores verificaran los
          datos. Si está todo correcto lo marcaran de acceso publico y se te
          otorgarán más permisos como dueño.
        </p>
        <p>
          Si querés agilizar este paso, mandame un texto{" "}
          <a
            href="https://wa.me/+5493455286829"
            class={button({ intent: "link" })}
          >
            +54 9 345 528-6829
          </a>
        </p>
        <h4>Felicitaciones! Ya diste de alta tu local</h4>
      </div>
    </div>
  </MarketingTemplate>
);
