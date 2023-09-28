export const DashboardHeading = (props: {
  title: string;
  action?: JSX.Element;
}) => {
  return (
    <div class="mb-4 flex items-center border-b border-border bg-card px-4 py-6 sm:px-6 lg:px-12 xl:px-16">
      <h1
        class="flex-grow text-2xl font-black lowercase leading-loose first-letter:capitalize"
        safe
      >
        {props.title}
      </h1>
      {props.action}
    </div>
  );
};
