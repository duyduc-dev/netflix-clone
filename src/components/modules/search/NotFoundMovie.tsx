export default function NotFoundMovie({ query }: { query: string }) {
  return (
    <div className="flex justify-center w-full">
      <div className="text-xs text-white">
        <p>Your search for &quot;{query}&quot; did not have any matches.</p>
        <div className="mt-5">
          <p>Suggestions:</p>
          <ul className="pl-5 list-disc">
            <li>Try different keywords</li>
            <li>Looking for a movie or TV show?</li>
            <li>Try using a movie, TV show title, an actor or director</li>
            <li>Try a genre, like comedy, romance, sports, or drama</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
