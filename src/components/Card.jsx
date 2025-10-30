import React from "react";

export default function Card({ card, onClick, flipped, matched }) {
  return (
    <div
      onClick={onClick}
      style={{
        width: "100%",
        height: "100%",
         background: flipped || matched
          ? "linear-gradient(145deg, #f30ec1, #f80959)"  // bright magenta-pink tone
          : "linear-gradient(145deg, #1c130d, #1612e9)", // dark professional base
        borderRadius: "10px",
        cursor: "pointer",
        fontSize: "2rem",
        color: "#f5f5dc",
        boxShadow: flipped || matched
          ? "inset 0 0 10px #d4af37, 0 0 15px #8b5a2b"
          : "inset 0 0 15px #000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // textShadow: "2px 2px 4px #000",
      }}
    >
      {flipped || matched ? card.icon : "🪵"}
    </div>
  );
}



// import React from "react";

// export default function Card({ card, onClick, flipped, matched }) {
//   return (
//     <div
//   className={`card ${flipped || matched ? "flipped" : ""}`}
//   onClick={onClick}
//   style={{
//     width: "80px",
//     height: "80px",
//     perspective: "1000px",
//     cursor: "pointer",
//     transition: "transform 0.2s ease",
//   }}
//   onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
//   onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
// >

//       <div
//         className="card-inner"
//         style={{
//           position: "relative",
//           width: "100%",
//           height: "100%",
//           textAlign: "center",
//           transition: "transform 0.5s",
//           transformStyle: "preserve-3d",
//           transform: flipped || matched ? "rotateY(180deg)" : "rotateY(0deg)",
//         }}
//       >
//         {/* Front side (hidden) */}
//         <div
//           className="card-front"
//           style={{
//             position: "absolute",
//             width: "100%",
//             height: "100%",
//             background: "#1e293b",
//             color: "#fff",
//             borderRadius: "10px",
//             backfaceVisibility: "hidden",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             fontSize: "24px",
//           }}
//         >
//           ❓
//         </div>

//         {/* Back side (emoji) */}
//         <div
//           className="card-back"
//           style={{
//             position: "absolute",
//             width: "100%",
//             height: "100%",
//             background: "#facc15",
//             borderRadius: "10px",
//             backfaceVisibility: "hidden",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             fontSize: "30px",
//             transform: "rotateY(180deg)",
//           }}
//         >
//           {card.icon}
//         </div>
//       </div>
//     </div>
//   );
// }
