import * as elements from "typed-html";
import { user } from "../../data";

export function UserForm() {
  return (
    <form
      hx-put="/user/1"
      hx-target="this"
      hx-swap="outerHTML"
      class="mx-auto max-w-5xl m-20"
    >
      <div>
        <label>First Name</label>
        <input type="text" name="firstName" value={user.firstName} />
      </div>
      <div class="form-group">
        <label>Last Name</label>
        <input type="text" name="lastName" value={user.lastName} />
      </div>
      <div class="form-group">
        <label>Email Address</label>
        <input type="email" name="email" value={user.email} />
      </div>
      <button class="rounded-md bg-gray-100 px-3 py-2">Submit</button>
      <button
        class="rounded-md bg-red-600 text-white px-3 py-2"
        hx-get="/user/1"
      >
        Cancel
      </button>
    </form>
  );
}
