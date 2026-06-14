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
  const [index, setIndex] = useState(0);


  function goNext() {
    if (index < data.length - 1) 
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
      <p>Number of cards: 10</p>
      <p>Card {index + 1} of {data.length}</p>
      <StepBox key={index} question={data[index].q} answer={data[index].a} />
      
      <div className="nav-buttons">
        <button onClick={goPrev} disabled={index === 0}>Previous</button>
        <button onClick={goNext} disabled={index === data.length - 1}>Next</button>
      </div>
    </div>
  )
}

export default App
