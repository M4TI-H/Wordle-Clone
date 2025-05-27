import { useEffect, useState } from 'react';
import { Container, Row, Col, Navbar, Stack, Button, Form } from "react-bootstrap";
import "./style.css";

function App() {
  const [word, setWord] = useState("");
  const [inputTextValue, setInputTextValue] = useState("");
  const [userWord, setUserWord] = useState({
    1: "", 2: "", 3: "", 4: "", 5: ""
  });
  const [correct, setCorrect] = useState({
    1: "-1", 2: "-1", 3: "-1", 4: "-1", 5: "-1"
  });
  const [turn, setTurn] = useState(1);
  const [isGuessed, setIsGuessed] = useState(false);
  const [incorrect, setIncorrect] = useState([]);
  const [guesses, setGuesses] = useState([]);

  async function fetchRandomWord() {
    const res = await fetch(`https://random-word-api.herokuapp.com/word?length=5`);
    const data = await res.json();
    let newWord = data[0].toUpperCase();
    setWord(newWord);

    console.log(newWord);
    setUserWord({ 1: "", 2: "", 3: "", 4: "", 5: "" });
    setInputTextValue("");
    setCorrect("");
  }
word
  useEffect(() =>{
    fetchRandomWord();
  }, []);

  function keyPress(e) {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      const letter = e.key.toUpperCase();
      const currentIndex = inputTextValue.length;

      const letterCount = Object.keys(userWord).filter(c => userWord[c] !== "").length;

      if (letterCount >= 5) return;

      if (currentIndex <= 5) {
        setUserWord(prev => ({
          ...prev,
          [currentIndex]: letter
        }));
      }
    }

    if (e.keyCode == 8) {
      const filledKeys = Object.keys(userWord).filter(k => userWord[k] !== "");
      const lastLetter = filledKeys[filledKeys.length - 1];
      if (lastLetter) {
        setUserWord(prev => ({
          ...prev,
          [lastLetter]: ""
        }));

        setInputTextValue(prev => prev.slice(0, filledKeys.length).toUpperCase());
      }
    }
  }

  const validateInput = (e) => {
    const letter = e.target.value;
    const lettersOnly = letter.replace(/[0-9]/, "");
    setInputTextValue(lettersOnly.toUpperCase());
  }

  function checkWord() {
    const errorList = {}
    let newInorrect = [];
    for (let i = 1; i <= 5; i++) {
      errorList[i] = "-1";
    }

    let n = 0;
    while (n < 5) {
      if (userWord[n] == word[n]){
        errorList[n] = "2";
      }
      else{
        newInorrect.push(userWord[n]);
        
        errorList[n] = "0";
        for (let m = 0; m < 5; m++){
          if (word[m] === userWord[n]){
             errorList[n] = "1";
             break;
          }
        }
      }
      n++;
    }
    setCorrect(errorList);
    setIncorrect(prev => [...prev, ...newIncorrect]);
    console.log(errorList);

    let correctWord = true;
    for (let i = 1; i <= 5; i++) {
      if (errorList[i] !== "2") {
        correctWord = false;
      }
    }

    if (correctWord) setIsGuessed(true);
    setTurn(turn + 1);
  }
  
  return (
    <Stack className="mainStack">
      <Navbar className="navbar">
        <Navbar.Brand className="navbar-brand">Wordle clone</Navbar.Brand>
        <Button className="fetch-button" onClick={() => fetchRandomWord()}>Get new word</Button>
      </Navbar>

      <Container className="input-container">
        <Form.Control className="form" 
          onChange={validateInput} 
          onKeyUp={keyPress} 
          value={inputTextValue} 
          maxLength="5"
        />
        <Button className="check-button" onClick={checkWord}>
          Check
        </Button>
      </Container>

      {Object.values(correct).some(value => value !== "-1") && (
        <Container>
          <p>Incorrect letters: </p>
          <p>
            {Object.keys(userWord).map((id) => {
              if (correct[id] === "0" && userWord[id]) {
                return userWord[id] + " ";
              }
              return null;
            })}
          </p>
        </Container>
      )}

      <Container className="grid-container">
        {!isGuessed && turn <= 5 ?
          <Row className="grid-row">
            {Object.keys(userWord).map((id) => (
            <Col key={id} className="grid-col" style={{backgroundColor: correct[id] === "2" ? "green" : correct[id] === "1" && "yellow"}}>
              {userWord[id]}
            </Col>
            ))}
          </Row>
          :
          <Container>
            <p>Correct!!</p>
            <p>You got it in {turn} tries!</p>
          </Container>
          
        }
        
      </Container>
    </Stack>
  )
}

export default App
