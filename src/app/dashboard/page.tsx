import Elysia from "elysia";
import BusinessPage from "./business/page";
import SettingsPage from "./settings/page";
import TagsPage from "./tags/page";
import UsersPage from "./users/page";

const dashboard = new Elysia({ name: "dashboard", prefix: "/d" })
  .use(BusinessPage)
  .use(SettingsPage)
  .use(TagsPage)
  .use(UsersPage);

export default dashboard;
