import { useCallback, useEffect, useState, useRef } from 'react';
import './globals.css';
import Keyboard from './components/Keyboard';
import NavBar from './components/navBar';
import ResultAlert from './components/resultAlert';
import AnswerGrid from './components/answerGrid';

function App() {
  const [word, setWord] = useState('');
  const [inputTextValue, setInputTextValue] = useState('');
  const [turn, setTurn] = useState(0);
  const [isGuessed, setIsGuessed] = useState(false);

  // semiCorrectLetters itd...
  const [semiCorrectLetters, setSemiCorrectLetters] = useState([]);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [incorrectLetters, setIncorrectLetters] = useState([]);
  const [guesses, setGuesses] = useState([]);
  const [correctCheck, setCorrectCheck] = useState([]);
  const gameContainerRef = useRef(null);

  // Logika: Czy gra się skończyła?
  const isGameLost = !isGuessed && turn === 5;
  const showModal = isGuessed || isGameLost;

  async function fetchRandomWord() {
    const res = await fetch(
      `https://random-word-api.herokuapp.com/word?length=5`
    );
    const data = await res.json();
    let newWord = data[0].toUpperCase();

    setWord(newWord);
    console.log(newWord); // Poprawione: logujemy newWord, bo state 'word' zaktualizuje się dopiero przy renderze

    setGuesses([]);
    setCorrectCheck([]);
    setInputTextValue('');
    setTurn(0);
    setIsGuessed(false);
    setSemiCorrectLetters([]);
    setCorrectLetters([]);
    setIncorrectLetters([]);

    setTimeout(() => {
      gameContainerRef.current?.focus();
    }, 0);
  }

  // Pobranie słowa na start
  useEffect(() => {
    fetchRandomWord();
  }, []);

  // 1. NAJPIERW DEFINIUJEMY handleCheck (bo jest używane w handleKeyDown)
  const handleCheck = useCallback(() => {
    if (inputTextValue.length !== 5) return;

    const guess = inputTextValue.toUpperCase();
    const newCorrectCheck = [];
    const newSemiCorrectLetters = new Set();
    const newCorrectLetters = new Set();
    const newIncorrectLetters = new Set();

    for (let i = 0; i < 5; i++) {
      if (guess[i] === word[i]) {
        newCorrectLetters.add(guess[i]);
        newCorrectCheck.push('correct');
      } else if (word.includes(guess[i])) {
        newSemiCorrectLetters.add(guess[i]);
        newCorrectCheck.push('semicorrect');
      } else {
        newIncorrectLetters.add(guess[i]);
        newCorrectCheck.push('incorrect');
      }
    }

    setCorrectLetters((prev) => [
      ...new Set([...prev, ...Array.from(newCorrectLetters)]),
    ]);
    setSemiCorrectLetters((prev) => [
      ...new Set([...prev, ...Array.from(newSemiCorrectLetters)]),
    ]);
    setIncorrectLetters((prev) => [
      ...new Set([...prev, ...Array.from(newIncorrectLetters)]),
    ]);

    setGuesses((prev) => [...prev, guess]);
    setCorrectCheck((prev) => [...prev, newCorrectCheck]);
    setInputTextValue('');

    if (newCorrectCheck.every((val) => val === 'correct')) {
      setIsGuessed(true);
    } else {
      setTurn((prev) => prev + 1);
    }
  }, [inputTextValue, word]);

  // 2. POTEM DEFINIUJEMY handleKeyDown (bo używa handleCheck)
  const handleKeyDown = useCallback(
    (e) => {
      // Jeśli gra skończona (modal widoczny), ignoruj wpisywanie liter
      if (showModal) return;

      if (e.key === 'Enter') {
        handleCheck();
      } else if (e.key === 'Backspace') {
        setInputTextValue((prev) => prev.slice(0, -1));
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        setInputTextValue((prev) => {
          if (prev.length < 5) return prev + e.key.toUpperCase();
          return prev;
        });
      }
    },
    [inputTextValue, turn, showModal, handleCheck]
  );

  // 3. OBSŁUGA ENTERA PO ZAKOŃCZENIU GRY (Restart)
  const nextWordKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      fetchRandomWord();
    }
  }, []); // Pusta zależność, fetchRandomWord jest stabilne (lub można dodać do deps jeśli linter krzyczy)

  // 4. NA KOŃCU USE EFFECT DO PODPIĘCIA NASŁUCHIWANIA
  useEffect(() => {
    if (showModal) {
      // Jeśli gra skończona -> Czekamy tylko na Enter żeby zresetować
      window.addEventListener('keydown', nextWordKeyDown);
      return () => window.removeEventListener('keydown', nextWordKeyDown);
    } else {
      // Jeśli gra trwa -> Obsługujemy wpisywanie słów
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [handleKeyDown, nextWordKeyDown, showModal]);

  return (
    <div className="flex flex-col items-center bg-slate-800 gap-4 md:pb-4 w-screen min-h-screen">
      <NavBar fetchRandomWord={fetchRandomWord} />

      <AnswerGrid
        turn={turn}
        guesses={guesses}
        inputTextValue={inputTextValue}
        correctCheck={correctCheck}
      />

      <Keyboard
        correctLetters={correctLetters}
        semiCorrectLetters={semiCorrectLetters}
        incorrectLetters={incorrectLetters}
        handleCheck={handleCheck}
        isGuessed={isGuessed}
        turn={turn}
      />

      {showModal && (
        <div className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <ResultAlert
            isWon={isGuessed}
            word={word}
            turn={turn}
            onRestart={fetchRandomWord}
          />
        </div>
      )}
    </div>
  );
}

export default App;
