export const DashboardHeading = (props: {
  title: string;
  subtitle: string;
}) => {
  return (
    <>
      <h1 class="pl-3 text-xl font-black leading-loose first-letter:capitalize sm:pl-0">
        {props.title}
      </h1>
      <h2 class="mt-1 pl-3 text-sm leading-6 text-gray-500 sm:pl-0">
        {props.subtitle}
      </h2>
    </>
  );
};
