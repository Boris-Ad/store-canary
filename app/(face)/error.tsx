'use client';

const FaceErrorPage = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>Error:{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
};

export default FaceErrorPage;
