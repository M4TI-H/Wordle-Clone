import '../globals.css';

function KeyboardLetter({ letter, isCorrect }) {
  let bgColor = 'bg-sky-950';
  let fontColor = 'text-neutral-300';

  if (isCorrect === 'correct') {
    bgColor = 'bg-emerald-500';
  } else if (isCorrect === 'semicorrect') {
    bgColor = 'bg-amber-600';
  } else if (isCorrect === 'incorrect') {
    bgColor = 'bg-slate-800';
    fontColor = 'text-gray-500';
  }

  return (
    <div
      className={`w-full h-12 md:h-16 flex items-center justify-center font-semibold text-sm sm:text-lg md:text-2xl rounded-sm md:rounded-lg transition-colors duration-250
        ${bgColor} ${fontColor}
      `}
    >
      <p className="select-none">{String.fromCharCode(letter)}</p>
    </div>
  );
}

export default KeyboardLetter;
