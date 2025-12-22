export default function NavBar({ fetchRandomWord }) {
  return (
    <div className="w-full h-20 flex justify-between items-center px-4 md:px-8 bg-slate-700">
      <h1 className="text-lg md:text-xl text-neutral-300 font-semibold">
        Wordle Clone
      </h1>
      <button
        className="p-2 md:px-4 md:py-3 bg-sky-800 rounded-lg text-neutral-300 font-semibold cursor-pointer outline-0 hover:bg-sky-900 active:bg-sky-900 transition-colors duration-200"
        onClick={fetchRandomWord}
      >
        Generate new
      </button>
    </div>
  );
}
