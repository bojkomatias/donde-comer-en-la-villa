import { Elysia, t } from "elysia";
import cookie from "@elysiajs/cookie";
import jwt from "@elysiajs/jwt";
import { html } from "@elysiajs/html";
import { helmet } from "elysia-helmet";
import { BaseLayout } from "@/ui/layout";
import { Action, Column, DataRows, DataTable } from "@/ui/data-table";
import { SelectTag } from "@/db/schema/tag";

if (Bun.env.JWT_SECRET === undefined)
  throw "Missing secret add JWT_SECRET to .env file";

if (Bun.env.DATABASE_URL === undefined)
  throw "Missing secret add DATABASE_URL to .env file";

if (Bun.env.DATABASE_AUTH_TOKEN === undefined)
  throw "Missing secret add DATABASE_AUTH_TOKEN to .env file";

if (Bun.env.GOOGLE_CLIENT_ID === undefined)
  throw "Missing secret add CLIENT_ID to .env file";

if (Bun.env.GOOGLE_CLIENT_SECRET === undefined)
  throw "Missing secret add CLIENT_SECRET to .env file";

/**
 * Can re-use the setup plugin, even if duplicated (used only for typing)
 * Elysia has plugin checksum allowing to de-duplicate plugins on runtime
 * Here is the stuff reusable throughout the app, JWT, Cookie, User decorator (pass user)
 */

const setup = new Elysia({ name: "setup" })
  .use(html())
  .get(
    "/data",
    async ({ query: { page } }) => {
      const columns: Column<SelectTag>[] = [
        {
          accessor: "id",
          header: "UUID",
          cell: ({ id }) => <div>xd{id}</div>,
          hidden: "hidden",
        },
        { accessor: "name", header: "Name" },
      ];
      const data: SelectTag[] = [
        { id: 1, name: "Hambur" },
        { id: 2, name: "Hambur" },
        { id: 2, name: "Hambur" },
        { id: 3, name: "Hambur" },
        { id: 4, name: "Hambur" },
        { id: 5, name: "Hambur" },
        { id: 1, name: "Hambur" },
        { id: 6, name: "Chorizo" },
        { id: 2, name: "Chorizo" },
        { id: 21, name: "Chorizo" },
        { id: 2, name: "Chorizo" },
        { id: 123, name: "Chorizo" },
        { id: 2, name: "Chorizo" },
        { id: 12, name: "Chorizo" },
        { id: 2, name: "Hambur" },
        { id: 3, name: "Hambur" },
        { id: 4, name: "Hambur" },
        { id: 5, name: "Hambur" },
        { id: 1, name: "Hambur" },
        { id: 6, name: "Chorizo" },
        { id: 2, name: "Chorizo" },
        { id: 21, name: "Chorizo" },
        { id: 2, name: "Chorizo" },
        { id: 123, name: "Chorizo" },
        { id: 2, name: "Chorizo" },
        { id: 12, name: "Chorizo" },
        { id: 2, name: "Hambur" },
        { id: 3, name: "Hambur" },
        { id: 4, name: "Hambur" },
        { id: 5, name: "Hambur" },
        { id: 1, name: "Hambur" },
        { id: 6, name: "Chorizo" },
        { id: 2, name: "Chorizo" },
        { id: 21, name: "Chorizo" },
        { id: 2, name: "Chorizo" },
        { id: 123, name: "Chorizo" },
        { id: 2, name: "Chorizo" },
        { id: 12, name: "Chorizo" },
        { id: 2, name: "Hambur" },
        { id: 3, name: "Hambur" },
        { id: 4, name: "Hambur" },
        { id: 5, name: "Hambur" },
        { id: 1, name: "Hambur" },
        { id: 6, name: "Chorizo" },
        { id: 2, name: "Chorizo" },
        { id: 21, name: "Chorizo" },
        { id: 2, name: "Chorizo" },
        { id: 123, name: "Chorizo" },
        { id: 2, name: "Chorizo" },
        { id: 12, name: "Chorizo" },
      ];
      const actions: Action<SelectTag>[] = [
        ({ id }) => ({
          children: "Ver",
        }),
        ({ id }) => ({
          class: "bg-destructive text-destructive-foreground",
          children: "Eliminar",
        }),
      ];

      if (page)
        return (
          <DataRows
            columns={columns}
            data={data.slice(page * 10, page * 10 + 10)}
            actions={actions}
            next={page * 10 >= data.length ? undefined : page + 1}
          />
        );
      return (
        <BaseLayout>
          <div class="mx-auto max-w-5xl py-20">
            <DataTable columns={columns}>
              <DataRows
                columns={columns}
                data={data}
                next={1}
                actions={actions}
              />
            </DataTable>
          </div>
        </BaseLayout>
      );
    },
    { query: t.Object({ page: t.Optional(t.Numeric()) }) },
  )
  // .use(helmet()) // Revisit and configure later on
  .use(cookie())
  .use(
    jwt({
      name: "jwt",
      secret: Bun.env.JWT_SECRET,
      schema: t.Object({
        id: t.String(),
        email: t.String(),
        image: t.Union([t.String(), t.Null()]),
        name: t.String(),
        role: t.Required(
          t.Union([
            t.Literal("customer"),
            t.Literal("owner"),
            t.Literal("admin"),
          ]),
        ),
      }),
      exp: "7d",
    }),
  )
  .model({
    auth: t.Object({
      email: t.String({
        minLength: 6,
        error: "Email has to be at least 6 characters long",
      }),
      password: t.String({
        minLength: 4,
        error: "Password has to be al least 4 characters long",
      }),
      csrfToken: t.String(),
    }),
  })
  // Derive user verification
  .derive(async ({ jwt, cookie }) => {
    const u = await jwt.verify(cookie.auth);
    return { JWTUser: u ? u : null };
  })
  .get("/styles.css", () => Bun.file("./src/output.css"));

export default setup;
