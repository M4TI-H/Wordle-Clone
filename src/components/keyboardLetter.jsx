import '../globals.css';

function KeyboardLetter({letter, isCorrect, setInputTextValue}) {
0
  let bgColor = "bg-sky-950";
  let bgHover = "hover:bg-slate-800";
  let fontColor = "text-neutral-300";
  if (isCorrect === "2") {
    bgColor = "bg-emerald-500";
    bgHover = "hover:bg-emerald-600"
  }
  else if (isCorrect === "1") {
    bgColor = "bg-amber-600";
    bgHover = "hover:bg-amber-700"
  }
  else if (isCorrect === "0") {
    bgColor = "";
    bgHover = "";
    fontColor = "text-gray-800";
  }

  const onLetterClick = (e) => {
    const key = e.target.value;

    if (/^[a-zA-Z]$/.test(key)) {
      setInputTextValue(prev => {
        if (prev.length < 5) {
          return prev + key.toUpperCase();
        }
        return prev;
      });
    }
  }
  
  return(
    <button onClick={onLetterClick} value={String.fromCharCode(letter)}
      className={` w-[min(4rem,8vw)] lg:w-[min(3rem, 8vw)] 
      aspect-square flex items-center justify-center
      font-bold text-lg md:text-2xl rounded-lg hover:cursor-pointer
      active:bg-sky-800 ${bgColor} ${bgHover} ${fontColor}
      `}
    >{String.fromCharCode(letter)}</button>
  );
} 

export default KeyboardLetter;