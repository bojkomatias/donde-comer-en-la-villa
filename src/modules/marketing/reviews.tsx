/** Component maps the 'stars' get tha avg reviews directly from SQL */
export const Review = ({ avgReviews }: { avgReviews: number }) => {
  // Max stars is 5
  const full = Math.floor(avgReviews);
  const empty = Math.floor(5 - avgReviews);
  const half = avgReviews % 1;

  return (
    <div class="flex">
      {Array.from(Array(full).keys()).map((_) => (
        <i class="i-ic-round-star" />
      ))}
      {half > 0.79 ? (
        <i class="i-ic-round-star" />
      ) : half < 0.2 ? (
        <i class="i-ic-round-star-border" />
      ) : (
        <i class="i-ic-round-star-half" />
      )}
      {Array.from(Array(empty).keys()).map((_) => (
        <i class="i-ic-round-star-border" />
      ))}
    </div>
  );
};
// Could be an htmx separate request... but since it's a list of businesses it will trigger too many queries.
