export default function ResultAlert({ isWon, word, turn, onRestart }) {
  const borderColor = isWon ? 'border-emerald-500' : 'border-rose-700';
  const textColor = isWon ? 'text-emerald-500' : 'text-rose-700';

  return (
    <div
      className={`w-full max-w-72 md:max-w-84 flex flex-col items-center p-4 md:p-8 bg-slate-900 rounded-lg border-2 ${borderColor}`}
    >
      <h2 className="font-semibold text-3xl md:text-4xl text-sky-800">
        {isWon ? 'You won!' : 'You lost!'}
      </h2>

      <div className="w-full flex flex-col gap-1 items-center mt-8">
        {!isWon && (
          <p className="font-semibold text-lg md:text-xl text-sky-800">
            The word was:
          </p>
        )}

        <p className={`font-bold text-4xl md:text-5xl ${textColor}`}>{word}</p>

        {isWon && (
          <p className="font-bold text-2xl text-sky-800">
            You got it in {turn + 1} {turn === 0 ? 'try' : 'tries'}!
          </p>
        )}
      </div>

      <button
        className="mt-16 px-4 py-3 bg-sky-800 rounded-lg text-neutral-300 font-semibold cursor-pointer outline-0 hover:bg-sky-900 active:bg-sky-900 transition-colors duration-200"
        onClick={onRestart}
      >
        {isWon ? 'Play again!' : 'Try again!'}
      </button>
    </div>
  );
}
