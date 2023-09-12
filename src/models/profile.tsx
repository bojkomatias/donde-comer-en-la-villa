import Elysia from "elysia";

export const profileHandler = (app: Elysia) => app.get("/profile", ({s}) => s());
