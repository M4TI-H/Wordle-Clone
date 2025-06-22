import '../globals.css';

export default function NotGuessedAlert({fetchRandomWord, word}) {

  return (
    <div className='w-90 h-100 absolute top-1/2 left-1/2 
      -translate-x-1/2 -translate-y-1/2
      flex flex-col items-center p-3 py-10
      bg-slate-800 rounded-xl border-5 border-rose-700'
    >
      <p className='font-bold text-3xl text-sky-800'>You lost!</p>
      <p className='font-bold text-xl text-sky-800 mt-5'>The word was:</p>
      <p className='font-bold text-5xl text-rose-700 mt-2'
      >{word}</p>
      <button className='h-12 w-30 
        bg-sky-800 rounded-lg mt-auto
        text-neutral-300 font-semibold
        cursor-pointer hover:bg-sky-900'
        onClick={() => fetchRandomWord()}
      >Try again!</button>
    </div>
  );
}