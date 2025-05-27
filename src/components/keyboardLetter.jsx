import { Container } from "react-bootstrap";
import "../style.css";

function KeyboardLetter({letter, isCorrect}) {

  let bgColor = "gray";
  if (isCorrect === "2") {
    bgColor = "green";
  }
  else if (isCorrect === "1") {
    bgColor = "yellow";
  }
  else if (isCorrect === "0") {
    bgColor = "red";
  }
  
  return(
    <Container className="keyboardLetter" style={{backgroundColor: bgColor}}>
      <p>{String.fromCharCode(letter)}</p>
    </Container>
  );
} 

export default KeyboardLetter;