import { SelectUser } from "@/db/schema/user";
import { DashboardHeading } from "@/ui/dashboard/heading";
import { cx } from "@/utils/cx";
import { dict } from "@/utils/dictionary";
import { PasswordChange } from "./password-change";
import Profile from "./profile";

const Settings = ({ user }: { user: SelectUser }) => (
  <>
    <div>
      <DashboardHeading title={dict.get("settings")} />
      <Profile user={user} />
    </div>

    <div
      class={cx(
        user.password
          ? ""
          : "pointer-events-none select-none opacity-75 saturate-0",
      )}
    >
      <PasswordChange />
    </div>
  </>
);

export default Settings;
