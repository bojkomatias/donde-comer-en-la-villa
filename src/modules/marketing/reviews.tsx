/** Component maps the 'stars' get tha avg reviews directly from SQL */
export const Review = ({ avgReviews }: { avgReviews: number | null }) => {
  if (!avgReviews) return <span></span>;
  // Max stars is 5
  const full = Math.floor(avgReviews);
  const empty = Math.floor(5 - avgReviews);
  const half = avgReviews % 1;

  return (
    <div class="flex">
      {Array.from(Array(full).keys()).map((_) => (
        <i class="i-ic-round-star text-yellow-600" />
      ))}
      {half > 0.79 ? (
        <i class="i-ic-round-star text-yellow-600" />
      ) : half < 0.2 ? (
        <i class="i-ic-round-star-border text-yellow-600" />
      ) : (
        <i class="i-ic-round-star-half text-yellow-600" />
      )}
      {Array.from(Array(empty).keys()).map((_) => (
        <i class="i-ic-round-star-border text-yellow-600" />
      ))}
    </div>
  );
};
// Could be an htmx separate request... but since it's a list of businesses it will trigger too many queries.
