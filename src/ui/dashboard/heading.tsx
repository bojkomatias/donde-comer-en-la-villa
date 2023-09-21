export const DashboardHeading = (props: {
  title: string;
  subtitle: string;
}) => {
  return (
    <>
      <h1
        class="pl-3 text-lg font-black first-letter:capitalize sm:pl-0 sm:text-xl sm:leading-loose"
        safe
      >
        {props.title}
      </h1>
      <h2
        class="pl-3 text-xs font-light leading-6 text-gray-600 dark:text-gray-400 sm:pl-0 sm:text-sm"
        safe
      >
        {props.subtitle}
      </h2>
    </>
  );
};
