import { SelectUser } from "@/db/schema/user";
import { DashboardHeading } from "@/ui/dashboard/heading";
import { cx } from "@/utils/cx";
import { dict } from "@/utils/dictionary";
import { PasswordChange } from "./password-change";
import Profile from "./profile";
import { DashboardContent } from "@/ui/dashboard/wrapper";

const Settings = ({ user }: { user: SelectUser }) => (
  <>
    <DashboardHeading title={dict.get("settings")} />
    <DashboardContent>
      <Profile user={user} />

      <div
        class={cx(
          "mt-20",
          user.password
            ? ""
            : "pointer-events-none select-none opacity-75 saturate-0",
        )}
      >
        <PasswordChange />
      </div>
    </DashboardContent>
  </>
);

export default Settings;
