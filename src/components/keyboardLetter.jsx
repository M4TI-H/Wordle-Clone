import '../globals.css';

function KeyboardLetter({letter, isCorrect}) {

  let bgColor = "bg-sky-950";
  let fontColor = "text-neutral-300";
  if (isCorrect === "2") {
    bgColor = "bg-emerald-500";
  }
  else if (isCorrect === "1") {
    bgColor = "bg-amber-600";
  }
  else if (isCorrect === "0") {
    bgColor = "";
    fontColor = "text-gray-800";
  }
  
  return(
    <div className={`size-10 md:size-14
    flex items-center justify-center m-1
    font-bold text-2xl rounded-lg
    ${bgColor} ${fontColor}`}>
      <p>{String.fromCharCode(letter)}</p>
    </div>
  );
} 

export default KeyboardLetter;