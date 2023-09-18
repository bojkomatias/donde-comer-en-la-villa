import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { User } from "@/db/schema/user";
import { cx } from "@/utils/cx";

const Profile = ({ user }: { user: User }) => (
  <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
    <div>
      <h1 className="font-heading text-xl font-black leading-loose">Profile</h1>
      <p className="mt-1 text-sm leading-6 text-gray-500">
        This information will be displayed publicly so be careful what you
        share.
      </p>

      <dl className="mt-6 space-y-6 divide-y border-t-2 text-sm leading-6 dark:divide-gray-700 dark:border-gray-700">
        <div className="pt-6 sm:flex">
          <dt className="font-medium sm:w-64 sm:flex-none sm:pr-6">UUID</dt>
          <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
            {user.id}
          </dd>
        </div>
        <div className="pt-6 sm:flex">
          <dt className="font-medium sm:w-64 sm:flex-none sm:pr-6">
            Full name
          </dt>
          <Profile.Attribute id={user.id} attribute="name" value={user.name} />
        </div>
        <div className="pt-6 sm:flex">
          <dt className="font-medium sm:w-64 sm:flex-none sm:pr-6">
            Email address
          </dt>
          <Profile.Attribute
            id={user.id}
            attribute="email"
            value={user.email}
          />
        </div>
        <div className="pt-6 sm:flex">
          <dt className="font-medium sm:w-64 sm:flex-none sm:pr-6">Role</dt>
          <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
            {user.role}
          </dd>
        </div>
      </dl>
    </div>

    <div
      class={cx(
        user.password
          ? ""
          : "pointer-events-none select-none opacity-75 saturate-0",
      )}
    >
      <Profile.PasswordChange />
    </div>
  </div>
);

Profile.Attribute = ({
  id,
  attribute,
  value,
}: {
  id: string | number;
  attribute: string;
  value: string;
}) => {
  return (
    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
      {value}
      <Button
        hx-get={`/dashboard/${id}/${attribute}/edit?value=${value}`}
        hx-target="closest dd"
        hx-swap="outerHTML"
        size="sm"
      >
        Update
      </Button>
    </dd>
  );
};

// Can only change name or email so ... it's all string
Profile.AttributeEdit = ({
  id,
  attribute,
  value,
}: {
  id: string | number;
  attribute: string;
  value: string;
}) => {
  return (
    <form
      hx-patch={`/dashboard/${id}`}
      hx-target="this"
      hx-swap="outerHTML"
      class="-mb-3 mt-0 flex items-center justify-between gap-x-6 sm:-mt-4 sm:flex-auto"
    >
      <Input name={attribute} label={attribute} value={value} type="text" />
      <span class="flex gap-2 sm:gap-4">
        <Button size="sm" intent="primary">
          Save
        </Button>
        <Button
          hx-get={`/dashboard/${id}/${attribute}?value=${value}`}
          size="sm"
          intent="secondary"
          type="reset"
        >
          Cancel
        </Button>
      </span>
    </form>
  );
};

Profile.PasswordChange = () => (
  <div>
    <h2 className="text-base font-semibold leading-7">Update Password</h2>
    <p className="mt-1 text-sm leading-6 text-gray-500">
      On password change current session will continue to exists, and changes
      take effect the next time you log in.
    </p>
    <form
      hx-patch="/dashboard/password"
      hx-target="#notification"
      hx-target-403="#notification"
      hx-swap="none"
      class="mt-4 space-y-3 rounded-lg bg-gray-50 p-4 dark:bg-gray-900/50"
    >
      <div class="isolate">
        <Input
          name="currentPassword"
          label="current password"
          placeholder="********"
          type="password"
          required="true"
        />
        <Input
          name="password"
          label="new password"
          placeholder="**********"
          type="password"
          required="true"
        />
      </div>

      <div class="flex justify-between">
        <Button intent="destructive">Update password</Button>
      </div>
    </form>
  </div>
);

export default Profile;
