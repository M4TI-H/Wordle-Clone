import { Row, Col } from "react-bootstrap";
import KeyboardLetter from "./keyboardLetter";
import '../globals.css';

function LetterRow({correctLetters, semiCorrectLetters, incorrectLetters, handleCheck, isGuessed, turn}) {
  const firstRow = Array.from({ length: 9 }, (_, i) => 65 + i);       // A-I
  const secondRow = Array.from({ length: 9 }, (_, i) => 74 + i);      // J-R
  const thirdRow = Array.from({ length: 8 }, (_, i) => 83 + i);       // S-Z

  const displayLetter = (ascii) => {
    const letter = String.fromCharCode(ascii);
    if (correctLetters.includes(letter)) {
      return <KeyboardLetter letter={ascii} isCorrect={"2"}/>
    }
    else if (semiCorrectLetters.includes(letter)) {
      return <KeyboardLetter letter={ascii} isCorrect={"1"}/>
    }
    else if (incorrectLetters.includes(letter)) {
      return <KeyboardLetter letter={ascii} isCorrect={"0"}/>
    }
    else {
      return <KeyboardLetter letter={ascii} isCorrect={"-1"}/>
    }
  }

  return(
    <div className='w-auto max-w-screen '>
      <div className='flex justify-center bg-slate-900 rounded-t-lg pt-2 px-2'>
        <div className='grid grid-cols-9 md:gap-[0.5vw] gap-[1vw]'>
          {firstRow.map((ascii, id) => (
            <div key={id}>
              {displayLetter(ascii)}
            </div>
          ))}
        </div>
      </div>
     
      <div className='flex justify-center bg-slate-900'>
          <div className='grid grid-cols-9 md:gap-[0.5vw] gap-[1vw] my-2'>
            {secondRow.map((ascii, id) => (
              <div key={id}>
                {displayLetter(ascii)}
              </div>
            ))}
          </div>
        </div>
      <div className='flex justify-center bg-slate-900 rounded-b-lg pb-2'>
          <div className='grid grid-cols-9 md:gap-[0.5vw] gap-[1vw]'>
            {thirdRow.map((ascii, id) => (
              <div key={id}>
                {displayLetter(ascii)}
              </div>
            ))}
            <button onClick={handleCheck} disabled={isGuessed || turn > 5}
              className='w-[min(4rem,8vw)] sm:w-[min(3rem, 8vw)] aspect-square
              font-bold text-lg text-neutral-300
              rounded-lg cursor-pointer
              bg-sky-800 hover:bg-sky-900'
            >&#129030;</button>
          </div>
        </div>
    </div>
  );
} 

export default LetterRow;