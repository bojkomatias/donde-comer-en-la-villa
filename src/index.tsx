import { Elysia } from "elysia";
import html from "@elysiajs/html";
import BaseTemplate from "./components/base-template";
import * as elements from "typed-html";
import { UserView } from "./components/user/view";
import { UserForm } from "./components/user/form";
import { editUser } from "./data";

const app = new Elysia()
  .use(html())
  .get("/", ({ html }) =>
    html(
      <BaseTemplate>
        <body>
          <div class="mt-20 mx-auto max-w-xs font-bold text-xl">
            Hello there!
          </div>
          <div hx-get="/user/1" hx-trigger="load" hx-swap="innerHTML"></div>
        </body>
      </BaseTemplate>
    )
  )
  .get("/user/1", () => <UserView />)
  .get("/user/1/edit", () => <UserForm />)
  .put("/user/1", ({ body }) => {
    editUser(body);
    console.log("User saved on the server!");
    return <UserView />;
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
