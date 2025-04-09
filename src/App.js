import React, { useState } from 'react';
import './App.css';

const frases = [
  "Confía en el proceso.",
  "Tu alma ya conoce el camino.",
  "El silencio también habla.",
  "Hoy es un buen día para comenzar de nuevo.",
  "Escucharte es el primer paso hacia tu verdad."
];

const preguntas = [
  "¿Qué aprendiste de ti hoy?",
  "¿Qué emoción estás sintiendo en este momento?",
  "¿Cuándo fue la última vez que te sentiste en paz?",
  "¿Qué parte de ti necesita más amor ahora?",
  "¿Qué agradeces profundamente hoy?"
];

function App() {
  const [frase, setFrase] = useState(frases[0]);
  const [pregunta, setPregunta] = useState(preguntas[0]);

  const nuevaReflexion = () => {
    const nuevaFrase = frases[Math.floor(Math.random() * frases.length)];
    const nuevaPregunta = preguntas[Math.floor(Math.random() * preguntas.length)];
    setFrase(nuevaFrase);
    setPregunta(nuevaPregunta);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>✨ Brújula App ✨</h1>
        <p style={{ fontSize: '1.2rem' }}>{frase}</p>
        <p style={{ fontStyle: 'italic', marginTop: '20px' }}>{pregunta}</p>
        <button onClick={nuevaReflexion} style={{ marginTop: '30px', padding: '10px 20px', fontSize: '1rem', borderRadius: '8px', cursor: 'pointer' }}>
          Dame otra 🌟
        </button>
      </header>
    </div>
  );
}

export default App;