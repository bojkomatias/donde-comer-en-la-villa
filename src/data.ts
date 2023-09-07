export let user = {
  firstName: "Joe",
  lastName: "Mamon",
  email: "matute@test.com",
};

export function editUser(newUser: any) {
  user = newUser;
}
