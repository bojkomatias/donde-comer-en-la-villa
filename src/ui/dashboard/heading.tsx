export const DashboardHeading = (props: {
  title: string;
  action?: JSX.Element;
}) => {
  return (
    <div class="-mx-2 mb-4 flex items-center border-b border-border bg-card px-6 py-6 sm:-mx-6 lg:-mx-16 lg:px-16">
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
