import * as elements from "typed-html";
import { user } from "../../data";
export function UserView() {
  return (
    <div hx-target="this" hx-swap="outerHTML" class="max-w-5xl mx-auto m-20">
      <div>
        <label>First Name</label>: {user.firstName}
      </div>
      <div>
        <label>Last Name</label>: {user.lastName}
      </div>
      <div>
        <label>Email</label>: {user.email}
      </div>
      <button
        hx-get="/user/1/edit"
        class="rounded-md px-3 py-2 font-semibold bg-gray-100 ring-1 ring-black/10"
      >
        Click To Edit
      </button>
    </div>
  );
}
