import '../globals.css';

export default function GuessedAlert({fetchRandomWord, turn, word}) {

  return (
    <div className='w-90 h-100 absolute top-1/2 left-1/2 
      -translate-x-1/2 -translate-y-1/2
      flex flex-col items-center p-3 py-10
      bg-slate-800 rounded-xl border-5 border-emerald-500'
    >
      <p className='font-bold text-3xl text-sky-800'>You won!</p>
      <p className='font-bold text-5xl text-emerald-500 mt-2'
      >{word}</p>
      <p className='font-bold text-3xl text-sky-900'>You got it in {turn+1} {turn === 0 ? "try" : "tries"}!</p>
      <button className='h-12 w-30 
        bg-sky-800 rounded-lg mt-auto
        text-neutral-300 font-semibold
        cursor-pointer hover:bg-sky-900'
        onClick={() => fetchRandomWord()}
      >Play again!</button>
    </div>
  );
}
