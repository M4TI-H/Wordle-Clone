import { useCallback, useEffect, useState, useRef } from 'react';
import LetterRow from './components/letterRow';
import './globals.css';

function App() {
  const [word, setWord] = useState("");
  const [inputTextValue, setInputTextValue] = useState("");
  const [turn, setTurn] = useState(0);
  const [isGuessed, setIsGuessed] = useState(false);
  const [semiCorrectLetters, setSemiCorrectLetters] = useState([]);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [incorrectLetters, setIncorrectLetters] = useState([]);
  const [guesses, setGuesses] = useState([]);
  const [correctCheck, setCorrectCheck] = useState([]);

  const gameContainerRef = useRef(null);

  async function fetchRandomWord() {
    const res = await fetch(`https://random-word-api.herokuapp.com/word?length=5`);
    const data = await res.json();
    let newWord = data[0].toUpperCase();
    setWord(newWord);

    setGuesses([]);
    setCorrectCheck([]);
    setInputTextValue("");
    setTurn(0);
    setIsGuessed(false);
    setSemiCorrectLetters([]);
    setCorrectLetters([]);
    setIncorrectLetters([]);
    setTimeout(() => {
      gameContainerRef.current?.focus();
    }, 0);
  }

  useEffect(() =>{
    fetchRandomWord();
  }, []);
  
  const handleKeyDown = useCallback((e) => {
    if (isGuessed || turn >= 5) {
      return;
    }

    if (e.key === "Enter") {
      handleCheck();
    } 
    else if (e.key === "Backspace") {
      setInputTextValue(prev => prev.slice(0, -1));
    } 
    else if (/^[a-zA-Z]$/.test(e.key)) {
      setInputTextValue(prev => {
        if (prev.length < 5) {
          return prev + e.key.toUpperCase();
        }
        return prev;
      });
    }
  }, [inputTextValue, turn, isGuessed]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleCheck = useCallback(() => {
    if (inputTextValue.length !== 5) return;

    const guess = inputTextValue.toUpperCase();;
    const newCorrectCheck = [];
    const newSemiCorrectLetters = new Set();
    const newCorrectLetters = new Set();
    const newIncorrectLetters = new Set();

    for (let i = 0; i < 5; i++) {
      if (guess[i] === word[i]) {
        newCorrectLetters.add(guess[i]);
        newCorrectCheck.push("2");
      } 
      else if (word.includes(guess[i])) {
        newSemiCorrectLetters.add(guess[i]);
        newCorrectCheck.push("1");
      } 
      else {
        newIncorrectLetters.add(guess[i]);
        newCorrectCheck.push("0");
      }
    }
    setCorrectLetters(prev => [...new Set([...prev, ...Array.from(newCorrectLetters)])]);
    setSemiCorrectLetters(prev => [...new Set([...prev, ...Array.from(newSemiCorrectLetters)])]);
    setIncorrectLetters(prev => [...new Set([...prev, ...Array.from(newIncorrectLetters)])]);

    setGuesses(prev => [...prev, guess]);
    setCorrectCheck(prev => [...prev, newCorrectCheck]);
    setInputTextValue("");
    
    if (newCorrectCheck.every(val => val === "2")) {
      setIsGuessed(true);
    } 
    else {
      setTurn(prev => prev + 1);
    }
  }, [inputTextValue, word]);

  return (
    <div className='flex flex-col bg-slate-800 w-screen min-h-[100dvh]'>
      <nav className='w-full h-20
      flex justify-between items-center px-10 
      bg-slate-700'>
        <h1 className='text-2xl text-neutral-300 font-bold'
        >Wordle Clone</h1>
        <button className='h-12 w-30 
          bg-sky-800 rounded-lg
          text-neutral-300 font-semibold
          cursor-pointer hover:bg-sky-900'
          onClick={() => fetchRandomWord()}
        >Get new word</button>
      </nav>

      <div 
        className='w-70 md:w-90 min-h-65
        flex flex-col mx-auto mt-2
        focus:outline-none'
        tabIndex={0}
        ref={gameContainerRef}
      >
        {Array.from({ length: Math.min(turn + 1, 5) }).map((_, row_id) => (
          <div key={row_id}
            className='w-full h-14 md:h-18
            grid grid-cols-5'
          >
            {Array.from({ length: 5 }).map((_, col_id) => {
              let letter = "";
              let bgColor = "bg-sky-950";

              if (row_id < turn) {
                letter = guesses[row_id]?.[col_id] || "";
                const check = correctCheck[row_id]?.[col_id];
                if (check === "2") {
                  bgColor = "bg-emerald-500";
                }
                else if (check === "1") {
                  bgColor = "bg-amber-600";
                }
              } else if (row_id === turn) {
                letter = inputTextValue[col_id] || "";
              }
              return (
                <div
                  className={`size-12 md:size-16
                  flex items-center justify-center
                  border-4 border-slate-900 rounded-xl md:rounded-2xl
                  font-extrabold text-3xl text-neutral-300
                  ${bgColor}`}
                  key={col_id}
                >
                  {letter}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className='mt-auto mb-2'>
        <LetterRow correctLetters={correctLetters} semiCorrectLetters={semiCorrectLetters} incorrectLetters={incorrectLetters}
        handleCheck={handleCheck} isGuessed={isGuessed} turn={turn}
        />
      </div>

      {isGuessed &&
      <div className='w-90 h-100 absolute top-1/2 left-1/2 
        -translate-x-1/2 -translate-y-1/2
        flex flex-col items-center p-3 py-10
        bg-slate-900 rounded-xl border-5 border-emerald-500'
      >
        <p className='font-bold text-3xl text-sky-900'>You won!</p>
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
      }
      
      {!isGuessed && turn === 5 && 
      <div className='w-90 h-100 absolute top-1/2 left-1/2 
        -translate-x-1/2 -translate-y-1/2
        flex flex-col items-center p-3 py-10
        bg-slate-900 rounded-xl border-5 border-rose-700'
      >
        <p className='font-bold text-3xl text-sky-900'>You lost!</p>
        <p className='font-bold text-xl text-sky-900 mt-5'>The word was:</p>
        <p className='font-bold text-5xl text-rose-700 mt-2'
        >{word}</p>
        <button className='h-12 w-30 
          bg-sky-800 rounded-lg mt-auto
          text-neutral-300 font-semibold
          cursor-pointer hover:bg-sky-900'
          onClick={() => fetchRandomWord()}
        >Try again!</button>
      </div>
      }

    </div>
  );
}

export default App