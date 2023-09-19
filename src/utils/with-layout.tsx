/**
 * A function to help with page refreshes!
 * So when a user triggers a refresh adds the layout. (avoid using redirects on handlers)
 * @hx Indicating a normal hx request, if not defaults to layout
 * @Component the JSX passed
 */
export const withLayoutV2 = ({
  hx,
  Layout,
  props,
  Component,
}: {
  hx: boolean;
  Layout: JSX.Element;
  props: any;
  Component: JSX.Element;
}) => {
  return hx ? Component : <Layout>{Component}</Layout>;
};
