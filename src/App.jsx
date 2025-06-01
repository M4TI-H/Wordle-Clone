import { useCallback, useEffect, useState, useRef } from 'react';
import { Container, Navbar, Stack, Button } from "react-bootstrap";
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

    console.log(newWord);
    setGuesses([]);
    setCorrectCheck([]);
    setInputTextValue("");
    setTurn(0);
    setIsGuessed(false);
    
    setTimeout(() => {
      gameContainerRef.current?.focus();
    }, 0);
  }

  useEffect(() =>{
    fetchRandomWord();
  }, []);
  
  const handleKeyDown = useCallback((e) => {
    if (isGuessed || turn > 4) {
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
    <Stack className='bg-slate-800 w-screen h-screen'>
      <Navbar className='w-full h-20
      flex justify-between items-center px-3 
      bg-slate-700'>
        <Navbar.Brand className='text-2xl text-neutral-300 font-bold'
        >Wordle clone</Navbar.Brand>
        <Button className='h-12 w-30 
          bg-sky-800 rounded-lg
          text-neutral-300 font-semibold
          cursor-pointer hover:bg-sky-900'
          onClick={() => fetchRandomWord()}
        >Get new word</Button>
      </Navbar>

      <Container 
        className='w-90 h-95
        flex flex-col mx-auto mt-2
        focus:outline-none'
        tabIndex={0}
        ref={gameContainerRef}
      >
        {Array.from({ length: Math.min(turn + 1, 5) }).map((_, row_id) => (
          <Container key={row_id}
            className='w-full h-18
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
                <Container
                  className={`w-16 h-16
                  flex items-center justify-center
                  border-4 border-slate-900 rounded-2xl
                  font-extrabold text-3xl text-neutral-300
                  ${bgColor}`}
                  key={col_id}
                >
                  {letter}
                </Container>
              );
            })}
          </Container>
        ))}
      </Container>
      <Container>
        <LetterRow correctLetters={correctLetters} semiCorrectLetters={semiCorrectLetters} incorrectLetters={incorrectLetters}
        handleCheck={handleCheck} isGuessed={isGuessed} turn={turn}
        />
      </Container>
    </Stack>
  )
}

export default App
