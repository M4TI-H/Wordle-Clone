export default function AnswerGrid({
  turn,
  guesses,
  inputTextValue,
  correctCheck,
}) {
  const rowCount = Math.min(turn + 1, 5);

  return (
    <div className="flex flex-col items-center gap-2   mx-auto">
      {Array.from({ length: rowCount }).map((_, row_id) => (
        <div key={row_id} className="w-full h-auto grid grid-cols-5 gap-2">
          {Array.from({ length: 5 }).map((_, col_id) => {
            let letter = '';
            let bgColor = 'bg-sky-950';

            if (row_id < turn) {
              letter = guesses[row_id]?.[col_id] || '';
              const check = correctCheck[row_id]?.[col_id];

              if (check === 'correct') bgColor = 'bg-emerald-500';
              else if (check === 'semicorrect') bgColor = 'bg-amber-600';
            } else if (row_id === turn) {
              letter = inputTextValue[col_id] || '';
            }

            return (
              <div
                key={col_id}
                className={`select-none size-12 sm:size-16 md:size-20 flex items-center justify-center border-4 border-slate-900 rounded-xl  font-semibold text-2xl md:text-4xl text-neutral-300 ${bgColor}`}
              >
                {letter}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
