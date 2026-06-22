import { useState } from 'react';
import './App.css';
import StepBox from './Stepbox.jsx';
const App = () => {
  
  const data = [
    { q: "what kind of software are Chrome, firefox, safari, edge", a: "web browsers" },
    { q: "What common element is used in the manufacture of computer chips?", a: "Silicon (Si)" },
    { q: "Which company designed the first CPU and invented the USB port?", a: "Intel Corporation" },
    { q: "How many bits are there in a byte?", a: "8 bits" },
    { q: "Who invented the Linux operating system based off Unix?", a: "Linus Torvalds" },
    { q: "This software schedules tasks, executes applications and controls peripherals. What is it?", a: "The Operating System" },
    { q: "Which term refers to all kinds of harmful software including viruses, worms, trojan horses, or spyware?", a: "Malware" },
    { q: "This famous British mathematician/computer scientist helped crack the German Enigma machine in World War 2.", a: "Alan Turing" },
    { q: "In HTML, what does the anchor tag do?", a: "Create a hyperlink" },
    { q: "What kind of computer virus replicates itself until it uses up all the host computer's storage space?", a: "Worm" },
  ];
  const [mastered, setMastered] = useState([]); 
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [score, setScore] = useState(0);
  const [cards, setCards] = useState(data);
  const [feedback, setFeedback] = useState(null);
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);



  function markMastered() {
  const updated = cards.filter((_, i) => i !== index);
  setCards(updated);
  setIndex(Math.min(index, updated.length - 1));
  setFeedback(null);
}

  function shuffle() {
    const shuffled = [...data].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setIndex(0);
    setFeedback(null);
  }

  const handleSubmit = (e) => {
    
    e.preventDefault();
    const clean = (str) => str.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim();
    if (clean(text) === clean(cards[index].a) || clean(cards[index].a).includes(clean(text))){
      setScore(score + 1);
      setStreak(streak + 1);
      if (streak + 1 > longestStreak) {
        setLongestStreak(streak + 1);
      }
      setFeedback("correct");

    }
    else {
      setStreak(0);
      setFeedback("incorrect");
    }
    setText("");
  }
  function goNext() {
    if (index < cards.length - 1) 
      setIndex(index + 1);
  }

  function goPrev() {
    if (index > 0) 
      setIndex(index - 1);
  }

  return (
    <div className="App">
      

      <h1>Computer science trivia</h1>
      <h2>Basic knowledge about Computer Science</h2>
      <p>Number of cards: {cards.length}</p>
      <p>Card {index + 1} of {cards.length}</p>
      <p>Score: {score}</p>
      <p>Current streak: {streak} | Longest streak: {longestStreak}</p>

      <StepBox key={index} question={cards[index].q} answer={cards[index].a} />
      
      <form onSubmit={handleSubmit}>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
        <input type="submit" value="Submit" />
      </form>
      <div className="nav-buttons">
      {feedback === "correct" && <p style={{color: "green"}}>Correct!</p>}
      {feedback === "incorrect" && <p style={{color: "red"}}>Incorrect answer. Try again!</p>}
        <button onClick={goPrev} disabled={index === 0}>Previous</button>
<button onClick={goNext} disabled={index === cards.length - 1}>Next</button>
        <button onClick={shuffle}>Shuffle Cards</button>
        <button onClick={markMastered}>Master</button>
      </div>
    </div>
  )
}

export default App
