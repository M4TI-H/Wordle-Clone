import { Container, Row, Col } from "react-bootstrap";
import KeyboardLetter from "./keyboardLetter";
import "../style.css";

function LetterRow({correctLetters, semiCorrectLetters, incorrectLetters}) {
  const firstRow = Array.from({ length: 9 }, (_, i) => 65 + i);       // A-I
  const secondRow = Array.from({ length: 9 }, (_, i) => 74 + i);      // J-R
  const thirdRow = Array.from({ length: 8 }, (_, i) => 83 + i);       // S-Z

  return(
    <>
     <Row className="letterRow">
      {firstRow.map((ascii, id) => (
        <Col key={id}>
          {correctLetters.includes(String.fromCharCode(ascii)) ?
           <KeyboardLetter letter={ascii} isCorrect={"2"}/>
            :
            semiCorrectLetters.includes(String.fromCharCode(ascii)) ?
            <KeyboardLetter letter={ascii} isCorrect={"1"}/>
            :
            incorrectLetters.includes(String.fromCharCode(ascii)) ?
            <KeyboardLetter letter={ascii} isCorrect={"0"}/>
            :
            <KeyboardLetter letter={ascii} isCorrect={"-1"}/>
          }
        </Col>
      ))}
    </Row>
    <Row className="letterRow">
      {secondRow.map((ascii, id) => (
        <Col key={id}>
          {correctLetters.includes(String.fromCharCode(ascii)) ?
           <KeyboardLetter letter={ascii} isCorrect={"2"}/>
            :
            semiCorrectLetters.includes(String.fromCharCode(ascii)) ?
            <KeyboardLetter letter={ascii} isCorrect={"1"}/>
            :
            incorrectLetters.includes(String.fromCharCode(ascii)) ?
            <KeyboardLetter letter={ascii} isCorrect={"0"}/>
            :
            <KeyboardLetter letter={ascii} isCorrect={"-1"}/>
          }
        </Col>
      ))}
    </Row>
    <Row className="letterRow">
      {thirdRow.map((ascii, id) => (
        <Col key={id}>
          {correctLetters.includes(String.fromCharCode(ascii)) ?
           <KeyboardLetter letter={ascii} isCorrect={"2"}/>
            :
            semiCorrectLetters.includes(String.fromCharCode(ascii)) ?
            <KeyboardLetter letter={ascii} isCorrect={"1"}/>
            :
            incorrectLetters.includes(String.fromCharCode(ascii)) ?
            <KeyboardLetter letter={ascii} isCorrect={"0"}/>
            :
            <KeyboardLetter letter={ascii} isCorrect={"-1"}/>
          }
        </Col>
      ))}
    </Row>
    </>
   
  );
} 

export default LetterRow;