import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { User } from "@/db/schema/user";
import { cx } from "@/utils/cx";
import { dict } from "@/utils/dictionary";

const Profile = ({ user }: { user: User }) => (
  <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
    <div>
      <h1 className="text-xl font-black capitalize leading-loose">
        {dict.get("profile")}
      </h1>
      <p className="mt-1 text-sm leading-6 text-gray-500">
        This information will be displayed publicly so be careful what you
        share.
      </p>

      <dl className="mt-6 space-y-6 divide-y border-t-2 text-sm leading-6 dark:divide-gray-700 dark:border-gray-700">
        <div className="pt-6 sm:flex">
          <dt className="font-medium capitalize sm:w-64 sm:flex-none sm:pr-6">
            {dict.get("id")}
          </dt>
          <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
            {user.id}
          </dd>
        </div>
        <div className="pt-6 sm:flex">
          <dt className="font-medium capitalize sm:w-64 sm:flex-none sm:pr-6">
            {dict.get("name")}
          </dt>
          <Profile.Attribute id={user.id} attribute="name" value={user.name} />
        </div>
        <div className="pt-6 sm:flex">
          <dt className="font-medium capitalize sm:w-64 sm:flex-none sm:pr-6">
            {dict.get("email")}
          </dt>
          <Profile.Attribute
            id={user.id}
            attribute="email"
            value={user.email}
          />
        </div>
        <div className="pt-6 sm:flex">
          <dt className="font-medium capitalize sm:w-64 sm:flex-none sm:pr-6">
            {dict.get("role")}
          </dt>
          <dd className="mt-1 flex justify-between gap-x-6 capitalize sm:mt-0 sm:flex-auto">
            {dict.get(user.role)}
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
        hx-get={`/d/${id}/${attribute}/edit?value=${value}`}
        hx-target="closest dd"
        hx-swap="outerHTML"
        size="sm"
      >
        {dict.get("update")}
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
      hx-patch={`/d/${id}`}
      hx-target="this"
      hx-swap="outerHTML"
      class="-mb-3 mt-0 flex items-center justify-between gap-x-6 sm:-mt-4 sm:flex-auto"
    >
      <Input name={attribute} label={attribute} value={value} type="text" />
      <span class="flex gap-2 sm:gap-4">
        <Button size="sm" intent="primary">
          {dict.get("save")}
        </Button>
        <Button
          hx-get={`/d/${id}/${attribute}?value=${value}`}
          size="sm"
          intent="secondary"
          type="reset"
        >
          {dict.get("cancel")}
        </Button>
      </span>
    </form>
  );
};

Profile.PasswordChange = () => (
  <div class="-mx-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-900/50">
    <h2 className="text-base font-semibold leading-7 first-letter:capitalize">
      {dict.get("update")} {dict.get("password")}
    </h2>
    <p className="mt-1 text-sm leading-6 text-gray-500">
      On password change current session will continue to exists, and changes
      take effect the next time you log in.
    </p>
    <form
      hx-patch="/d/password"
      hx-target="#notification"
      hx-target-403="#notification"
      hx-swap="none"
      class=""
    >
      <Input
        name="currentPassword"
        placeholder="********"
        type="password"
        required="true"
      />
      <Input
        name="password"
        placeholder="**********"
        type="password"
        required="true"
      />

      <span class="mt-2 flex justify-end">
        <Button intent="destructive" size="sm">
          {dict.get("update")} {dict.get("password")}
        </Button>
      </span>
    </form>
  </div>
);

export default Profile;
