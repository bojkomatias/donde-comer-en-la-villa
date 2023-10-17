import { SelectUser } from "@/db/schema/user";
import { DashboardHeading } from "@/ui/dashboard/heading";
import { dict } from "@/utils/dictionary";
import Profile from "./profile";
import { DashboardContent } from "@/ui/dashboard/wrapper";

const Settings = ({ user }: { user: SelectUser }) => (
  <>
    <DashboardHeading title={dict.get("settings")} />
    <DashboardContent>
      <Profile user={user} />
    </DashboardContent>
  </>
);

export default Settings;
