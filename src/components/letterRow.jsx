import { Row, Col } from "react-bootstrap";
import KeyboardLetter from "./keyboardLetter";
import '../globals.css';

function LetterRow({correctLetters, semiCorrectLetters, incorrectLetters, handleCheck, isGuessed, turn}) {
  const firstRow = Array.from({ length: 9 }, (_, i) => 65 + i);       // A-I
  const secondRow = Array.from({ length: 9 }, (_, i) => 74 + i);      // J-R
  const thirdRow = Array.from({ length: 8 }, (_, i) => 83 + i);       // S-Z

  return(
    <>
     <Row className='w-112 md:w-146 h-14 md:h-20
     flex justify-center items-center mx-auto
     bg-slate-900 rounded-t-lg'
     >
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
    <Row className='w-112 md:w-146 h-12 md:h-20
      flex justify-center items-center mx-auto
      bg-slate-900'
    >
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
    <Row className='w-112 md:w-146 h-14 md:h-20
      flex justify-center items-center mx-auto
      bg-slate-900 rounded-b-lg'
    >
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
      <button onClick={handleCheck} disabled={isGuessed || turn > 5}
        className='size-10 md:size-14
        flex items-center justify-center m-1
        font-bold text-lg text-neutral-300
        rounded-lg cursor-pointer
        bg-sky-800 hover:bg-sky-900'
      >&#129030;</button>
    </Row>
    </>
   
  );
} 

export default LetterRow;