import React, { useState, useEffect, useRef } from "react";
import Card from "./Card";
import background from "../assets/background1.png";

const difficulties = {
  easy: { pairs: 6, cols: 4 },
  medium: { pairs: 9, cols: 6 },
  hard: { pairs: 12, cols: 6 },
};

const icons = [
  "😀",
  "😂",
  "🥳",
  "😎",
  "😍",
  "🤓",
  "😜",
  "😇",
  "🤠",
  "🥺",
  "🐶",
  "🐱",
  "🦁",
  "🐵",
  "🐮",
  "🐸",
  "🐔",
  "🦄",
  "🐧",
  "🐢",
  "🍕",
  "🍔",
  "🌭",
  "🍿",
  "🥨",
  "🍩",
  "🍎",
  "🍉",
  "🍋",
  "🍦",
  "🌵",
  "🌴",
  "🌈",
  "🏖️",
  "🌟",
  "⚡",
  "☀️",
  "🌙",
  "🍁",
  "🌻",
  "⚽",
  "🏀",
  "🎸",
  "🚗",
  "🚀",
  "⛵",
  "🏰",
  "📚",
  "🎤",
  "🎮",
  "♥️",
  "🧩",
  "🔑",
  "🪁",
  "🔮",
  "🎲",
  "💎",
  "📀",
  "🧸",
  "🛼",
];

export default function MemoryGame() {
  const [difficulty, setDifficulty] = useState("easy");
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(90);
  const [running, setRunning] = useState(false);
  const [message, setMessage] = useState("");
  const timerRef = useRef(null);

  function createDeck(pairs) {
    const selected = icons.slice(0, pairs);
    const deck = [...selected, ...selected].map((icon, index) => ({
      id: index,
      icon,
    }));
    return deck.sort(() => Math.random() - 0.5);
  }

  const resetGame = () => {
    const { pairs } = difficulties[difficulty];
    const newDeck = createDeck(pairs);
    setCards(newDeck);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setScore(0);
    setTimeLeft(difficulty === "easy" ? 90 : difficulty === "medium" ? 70 : 50);
    setMessage("");
    setRunning(false);
  };

  useEffect(() => {
    if (!running) return;
    if (timeLeft === 0) {
      setRunning(false);
      setMessage("⏰ Time's up!");
      return;
    }
    timerRef.current = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timerRef.current);
  }, [running, timeLeft]);

  const startGame = () => {
    if (!running) setRunning(true);
  };

  const handleFlip = (index) => {
    if (
      flipped.length === 2 ||
      flipped.includes(index) ||
      matched.includes(index)
    )
      return;

    startGame();
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [first, second] = newFlipped;
      if (cards[first].icon === cards[second].icon) {
        setTimeout(() => {
          setMatched((prev) => [...prev, first, second]);
          setFlipped([]);
          setScore((s) => s + 10);
        }, 350);
      } else {
        setTimeout(() => setFlipped([]), 900);
        setScore((s) => (s > 0 ? s - 2 : 0));
      }
    }
  };

  useEffect(() => {
    if (matched.length && matched.length === cards.length) {
      setRunning(false);
      setMessage("🎉 You Win!");
      setScore((s) => s + timeLeft);
    }
  }, [matched, cards.length, timeLeft]);

  useEffect(() => {
    resetGame();
  }, [difficulty]);

  const { cols } = difficulties[difficulty];
  const rows = Math.ceil((difficulties[difficulty].pairs * 2) / cols);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        // background: "radial-gradient(circle at center, #30e6f3ff 0%, #5feb7dff 100%)",
        backgroundImage: `url("${background}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "#fff",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginTop: "1vh" }}>
        <h1 style={{ fontSize: "2.5vw", color: "#0e0d0dff", fontWeight: 1000 }}>
          🧠 Memory Card Game
        </h1>
        <div style={{ margin: "0.5vw 0" }}>
          <button onClick={() => setDifficulty("easy")} style={buttonStyle}>
            🐣 Easy
          </button>
          <button onClick={() => setDifficulty("medium")} style={buttonStyle}>
            🧩 Medium
          </button>
          <button onClick={() => setDifficulty("hard")} style={buttonStyle}>
            🔥 Hard
          </button>
          <button
            onClick={resetGame}
            style={{ ...buttonStyle, background: "#ef4444" }}
          >
            🔄 Restart
          </button>
        </div>
        {/* <div style={{ fontSize: "1.1vw", color: "#000", fontWeight: "700" }}>
          ⏱ {timeLeft}s | 🧠 Moves: {moves} | ⭐ Score: {score}
        </div> */}
       
<div
  style={{
    fontSize: "1.1vw",
    color: "#fff",
    fontWeight: "700",
    padding: "10px 20px",
    borderRadius: "12px",
    // background: "linear-gradient(90deg, #30e6f3, #5feb7d, #f7c04a, #f30ec1)",
    background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364, #5feb7d)",
  }}
>
  ⏱ {timeLeft}s | 🧠 Moves: {moves} | ⭐ Score: {score}
</div>


        <div
          style={{
            color: "#f5b512ff",
            fontWeight: 600,
            fontSize: "1.3vw",
            marginTop: "0.5vw",
          }}
        >
          {message}
        </div>
      </div>

      {/* Card Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, minmax(60px, 1fr))`,
          gridTemplateRows: `repeat(${rows}, minmax(60px, 1fr))`,
          gap: "1vw",
          width: "70vw",
          height: "65vh",
          justifyContent: "center",
          alignContent: "center",
          // background: "linear-gradient(145deg, #1a1a1a, #0c0c0c)",
          borderRadius: "20px",
          boxShadow: "0 0 25px rgba(0,0,0,0.8)",
          padding: "2vw",
        }}
      >
        {cards.map((card, index) => (
          <Card
            key={index}
            card={card}
            onClick={() => handleFlip(index)}
            flipped={flipped.includes(index)}
            matched={matched.includes(index)}
          />
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "1vh",
          color: "#f8f2f2ff",
          fontSize: "2vw",
        }}
      >
        Made by{" "}
        <span style={{ color: "#f8f7fcff", fontWeight: 800 }}>Akash</span>
      </div>
    </div>
  );
}

const buttonStyle = {
  background: "#19b604ff",
  border: "none",
  padding: "0.6vw 1.4vw",
  margin: "0 0.3vw",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "1vw",
  fontWeight: 600,
  cursor: "pointer",
  transition: "0.3s",
};

// import React, { useState, useEffect, useRef } from "react";
// import Card from "./Card";

// export default function MemoryGame() {
//   const difficulties = {
//     easy: { pairs: 6, time: 90 },
//     medium: { pairs: 9, time: 70 },
//     hard: { pairs: 12, time: 50 },
//   };

//   const [difficulty, setDifficulty] = useState("easy");
//   const [cards, setCards] = useState([]);
//   const [flipped, setFlipped] = useState([]);
//   const [matched, setMatched] = useState([]);
//   const [moves, setMoves] = useState(0);
//   const [score, setScore] = useState(0);
//   const [timeLeft, setTimeLeft] = useState(difficulties[difficulty].time);
//   const [running, setRunning] = useState(false);
//   const [message, setMessage] = useState("");

//   const timerRef = useRef(null);
//   const icons = ["🍎", "🍌", "🍇", "🍓", "🍑", "🍍", "🍒", "🥝", "🍉", "🍋", "🍊", "🥭"];

//   // Create shuffled deck
//   function createDeck(pairs) {
//     const selected = icons.slice(0, pairs);
//     const deck = [...selected, ...selected].map((icon, index) => ({
//       id: index,
//       icon,
//     }));
//     return deck.sort(() => Math.random() - 0.5);
//   }

//   // Start / Reset
//   const resetGame = () => {
//     const newDeck = createDeck(difficulties[difficulty].pairs);
//     setCards(newDeck);
//     setFlipped([]);
//     setMatched([]);
//     setMoves(0);
//     setScore(0);
//     setTimeLeft(difficulties[difficulty].time);
//     setMessage("");
//     setRunning(false);
//   };

//   // Timer effect
//   useEffect(() => {
//     if (!running) return;
//     if (timeLeft === 0) {
//       setRunning(false);
//       setMessage("⏰ Time's up!");
//       return;
//     }
//     timerRef.current = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
//     return () => clearTimeout(timerRef.current);
//   }, [running, timeLeft]);

//   // Start first click
//   const startGame = () => {
//     if (!running) setRunning(true);
//   };

//   // Flip logic
//   const handleFlip = (index) => {
//     if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) return;

//     startGame();
//     const newFlipped = [...flipped, index];
//     setFlipped(newFlipped);

//     if (newFlipped.length === 2) {
//       setMoves((m) => m + 1);
//       const [first, second] = newFlipped;
//       if (cards[first].icon === cards[second].icon) {
//         setMatched((prev) => [...prev, first, second]);
//         setScore((s) => s + 10);
//         setFlipped([]);
//       } else {
//         setTimeout(() => setFlipped([]), 800);
//         setScore((s) => (s > 0 ? s - 2 : 0));
//       }
//     }
//   };

//   // Check win
//   useEffect(() => {
//     if (matched.length && matched.length === cards.length) {
//       setRunning(false);
//       setMessage("🎉 You Win!");
//       setScore((s) => s + timeLeft);
//     }
//   }, [matched]);

//   // Init
//   useEffect(() => {
//     resetGame();
//   }, [difficulty]);

//   return (
//     <div className="game" style={{ textAlign: "center" }}>
//       <h1 style={{marginTop: "0px"}} >🧩 Memory Card Game</h1>

//       <div style={{ marginBottom: "10px" }}>
//         <button onClick={() => setDifficulty("easy")}>Easy</button>
//         <button onClick={() => setDifficulty("medium")}>Medium</button>
//         <button onClick={() => setDifficulty("hard")}>Hard</button>
//         <button onClick={resetGame} style={{ marginLeft: "10px" }}>
//           🔄 Restart
//         </button>
//       </div>

//       <p>⏱ Time: {timeLeft}s | 🧠 Moves: {moves} | ⭐ Score: {score}</p>
//       <h3 style={{ color: "green" }}>{message}</h3>

//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",

//           justifyContent: "center",

//         }}
//       >
//         {cards.map((card, index) => (
//           <Card
//             key={index}
//             card={card}
//             onClick={() => handleFlip(index)}
//             flipped={flipped.includes(index)}
//             matched={matched.includes(index)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
