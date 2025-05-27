import { useEffect, useState } from 'react';
import { Container, Row, Col, Navbar, Stack, Button, Form } from "react-bootstrap";
import "./style.css";
import LetterRow from './components/letterRow';

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
  }

  useEffect(() =>{
    fetchRandomWord();
  }, []);

  const validateInput = (e) => {
    const letter = e.target.value;
    const lettersOnly = letter.replace(/[0-9]/, "");
    setInputTextValue(lettersOnly.toUpperCase());
  }

  function handleCheck() {
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
  }

  return (
    <Stack className="mainStack">
      <Navbar className="navbar">
        <Navbar.Brand className="navbar-brand">Wordle clone</Navbar.Brand>
        <Container className="input-container">
          {turn + 1 <= 5 && 
          <>
          <Form.Control className="form" 
            onChange={validateInput} 
            value={inputTextValue} 
            maxLength="5"
          />
          <Button className="check-button" onClick={handleCheck}>
            Check
          </Button>
          <p>Show password</p>
          </>

          }
        </Container>
        <Button className="fetch-button" onClick={() => fetchRandomWord()}>Get new word</Button>
      </Navbar>

      <Container className="grid-container">
        {Array.from({ length: turn+1 }).map((_, row_id) => (
          <Row key={row_id} className="grid-row">
            {Array.from({ length: 5 }).map((_, col_id) => {
              const letter = guesses[row_id]?.[col_id] || "";
              const bgColor =
                correctCheck[row_id]?.[col_id] === "2" ? "green" :
                correctCheck[row_id]?.[col_id] === "1" && "yellow";
              return (
                <Col
                  key={col_id}
                  className="grid-col"
                  style={{ backgroundColor: bgColor }}
                >
                  {letter}
                </Col>
              );
            })}
          </Row>
        ))}
      </Container>
      <Container className="letterKeyboard">
        <LetterRow correctLetters={correctLetters} semiCorrectLetters={semiCorrectLetters} incorrectLetters={incorrectLetters}/>
      </Container>
    </Stack>
  )
}

export default App
