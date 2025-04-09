import React, { useState, useEffect } from 'react';
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
  const [reflexion, setReflexion] = useState('');
  const [guardada, setGuardada] = useState('');

  useEffect(() => {
    const reflexionGuardada = localStorage.getItem('reflexion');
    if (reflexionGuardada) {
      setGuardada(reflexionGuardada);
    }
  }, []);

  const nuevaReflexion = () => {
    const nuevaFrase = frases[Math.floor(Math.random() * frases.length)];
    const nuevaPregunta = preguntas[Math.floor(Math.random() * preguntas.length)];
    setFrase(nuevaFrase);
    setPregunta(nuevaPregunta);
  };

  const guardarReflexion = () => {
    localStorage.setItem('reflexion', reflexion);
    setGuardada(reflexion);
    setReflexion('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>✨ Brújula App ✨</h1>
        <p>{frase}</p>
        <p style={{ fontStyle: 'italic' }}>{pregunta}</p>

        <button onClick={nuevaReflexion} style={{ marginBottom: '20px' }}>
          Dame otra 🌟
        </button>

        <textarea
          placeholder="Escribí tu reflexión aquí..."
          value={reflexion}
          onChange={(e) => setReflexion(e.target.value)}
          style={{
            width: '100%',
            height: '80px',
            padding: '10px',
            borderRadius: '8px',
            marginBottom: '10px',
            fontSize: '1rem',
            resize: 'none'
          }}
        ></textarea>

        <button onClick={guardarReflexion}>
          Guardar reflexión 📝
        </button>

        {guardada && (
          <div style={{ marginTop: '30px', textAlign: 'left' }}>
            <h4>🧠 Tu última reflexión guardada:</h4>
            <p style={{ background: '#f0f0f0', padding: '10px', borderRadius: '8px' }}>{guardada}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;