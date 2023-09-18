import { Layout } from "./layout";

export default function NotFound() {
  return (
    <Layout isAuth={false}>
      <div>Not found</div>
      <a href="/">return home</a>
    </Layout>
  );
}
