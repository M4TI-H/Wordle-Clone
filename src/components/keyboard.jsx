import KeyboardLetter from './keyboardLetter';
import '../globals.css';

export default function Keyboard({
  correctLetters,
  semiCorrectLetters,
  incorrectLetters,
  handleCheck,
  isGuessed,
  turn,
}) {
  const getLetterStatus = (ascii) => {
    const char = String.fromCharCode(ascii);
    if (correctLetters.includes(char)) return 'correct';
    if (semiCorrectLetters.includes(char)) return 'semicorrect';
    if (incorrectLetters.includes(char)) return 'incorrect';
    return 'default';
  };

  const rows = [
    Array.from({ length: 9 }, (_, i) => 65 + i), // A-I
    Array.from({ length: 9 }, (_, i) => 74 + i), // J-R
    Array.from({ length: 8 }, (_, i) => 83 + i), // S-Z
  ];

  return (
    <div className="w-full max-w-3xl mx-auto mt-auto p-2 rounded-lg flex flex-col gap-2 bg-slate-900">
      {rows.map((rowLetters, rowIndex) => (
        <div
          key={rowIndex}
          className="flex justify-center w-full gap-1 md:gap-2"
        >
          {rowLetters.map((ascii) => (
            <div key={ascii} className="flex-1">
              <KeyboardLetter
                letter={ascii}
                isCorrect={getLetterStatus(ascii)}
              />
            </div>
          ))}

          {rowIndex === 2 && (
            <button
              onClick={handleCheck}
              disabled={isGuessed || turn > 5}
              className="flex-1 h-12 md:h-16 flex items-center justify-center font-bold text-sm md:text-xl text-neutral-300 rounded-lg cursor-pointer bg-sky-800 hover:bg-sky-900 outline-none"
            >
              &#129030;
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
