import React, { useState, useEffect } from 'react';
import './App.css';
import { jsPDF } from 'jspdf';

const textos = {
  es: {
    titulo: "✨ Brújula App ✨",
    preguntas: [
      "¿Qué tipo de actividades disfrutas hacer más?",
      "¿Qué temas te hacen perder la noción del tiempo?",
      "¿Qué habilidad te gustaría dominar?",
      "¿Qué problema del mundo te gustaría ayudar a resolver?",
      "¿Qué cosas te dicen que se te dan bien?",
      "¿Qué harías si no tuvieras miedo de fallar?",
      "¿Preferís trabajar en equipo o de forma individual?",
      "¿Te considerás una persona más práctica o imaginativa?",
      "¿Qué te motiva más: aprender, enseñar o resolver?",
      "¿Qué actividad harías aunque no te pagaran por ella?",
      "¿Cómo te gusta expresarte mejor: hablando, escribiendo, creando?",
      "¿Qué causa social o ambiental te conmueve profundamente?",
      "¿Qué te hace sentir orgulloso de vos mismo?",
      "¿Con qué tipo de personas te sentís más conectado?",
      "¿Qué hacés cuando nadie te dice qué hacer?",
      "¿Qué te entusiasma tanto que te cuesta dormir de la emoción?",
      "¿Qué cosas aprendiste solo por curiosidad?",
      "¿Cómo te gustaría que te recuerden en el futuro?",
      "¿Qué experiencia te cambió la forma de ver el mundo?",
      "¿Qué elegirías hacer si supieras que vas a tener éxito?"
    ],
    siguiente: "Siguiente ➡️",
    resultado: "🎯 Resultado de tu brújula personal:",
    reiniciar: "Reiniciar test 🔄",
    descargar: "📄 Descargar PDF",
    mensajeFinal: {
      creativo: "Tu brújula apunta hacia lo creativo: diseño, arte, escritura o música.",
      social: "Tu brújula apunta hacia lo social: enseñanza, comunicación o acompañamiento.",
      analitico: "Tu brújula apunta hacia lo analítico: ciencias, lógica o resolución de problemas.",
      tecnico: "Tu brújula apunta hacia lo técnico: tecnología, ingeniería o sistemas.",
      ninguno: "Tu brújula está explorando un territorio único. ¡Seguí descubriendo!"
    }
  },
  en: {
    titulo: "✨ Compass App ✨",
    preguntas: [
      "What kind of activities do you enjoy the most?",
      "What topics make you lose track of time?",
      "What skill would you like to master?",
      "What world problem would you like to help solve?",
      "What do people say you're good at?",
      "What would you do if you weren't afraid of failing?",
      "Do you prefer working in teams or alone?",
      "Are you more practical or imaginative?",
      "What motivates you more: learning, teaching or solving?",
      "What activity would you do even if you didn’t get paid for it?",
      "How do you express yourself best: talking, writing, creating?",
      "What social or environmental cause deeply moves you?",
      "What makes you feel proud of yourself?",
      "What kind of people do you feel most connected with?",
      "What do you do when no one tells you what to do?",
      "What excites you so much you lose sleep over it?",
      "What things have you learned just out of curiosity?",
      "How would you like to be remembered in the future?",
      "What experience changed how you see the world?",
      "What would you choose to do if you knew you'd succeed?"
    ],
    siguiente: "Next ➡️",
    resultado: "🎯 Your personal compass result:",
    reiniciar: "Restart test 🔄",
    descargar: "📄 Download PDF",
    mensajeFinal: {
      creativo: "Your compass points to the creative: design, art, writing or music.",
      social: "Your compass points to the social: teaching, communication or support.",
      analitico: "Your compass points to the analytical: science, logic or problem-solving.",
      tecnico: "Your compass points to the technical: technology, engineering or systems.",
      ninguno: "Your compass is exploring a unique path. Keep discovering!"
    }
  }
};

function App() {
  const [idioma, setIdioma] = useState('es');
  const [paso, setPaso] = useState(0);
  const [respuestas, setRespuestas] = useState(() => {
    const guardadas = localStorage.getItem('respuestasBrújula');
    return guardadas ? JSON.parse(guardadas) : Array(textos[idioma].preguntas.length).fill('');
  });
  const [finalizado, setFinalizado] = useState(() => {
    return localStorage.getItem('finalizadoBrújula') === 'true';
  });

  const t = textos[idioma];

  useEffect(() => {
    localStorage.setItem('respuestasBrújula', JSON.stringify(respuestas));
    localStorage.setItem('finalizadoBrújula', finalizado.toString());
  }, [respuestas, finalizado]);

  const handleRespuesta = (e) => {
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[paso] = e.target.value;
    setRespuestas(nuevasRespuestas);
  };

  const siguientePaso = () => {
    if (paso < t.preguntas.length - 1) {
      setPaso(paso + 1);
    } else {
      setFinalizado(true);
    }
  };

  const reiniciar = () => {
    setPaso(0);
    setRespuestas(Array(t.preguntas.length).fill(''));
    setFinalizado(false);
    localStorage.removeItem('respuestasBrújula');
    localStorage.removeItem('finalizadoBrújula');
  };

  const analizarRespuestas = () => {
    const todo = respuestas.join(" ").toLowerCase();

    const intereses = {
      creativo: ["diseño", "crear", "arte", "escribir", "dibujar", "música", "create", "design", "art", "write", "draw", "music"],
      social: ["ayudar", "escuchar", "enseñar", "personas", "comunicar", "help", "listen", "teach", "people", "communicate"],
      analitico: ["resolver", "pensar", "problema", "datos", "analizar", "solve", "think", "problem", "data", "analyze"],
      tecnico: ["tecnología", "construir", "programar", "máquinas", "sistemas", "technology", "build", "code", "machines", "systems"]
    };

    let puntuacion = {
      creativo: 0,
      social: 0,
      analitico: 0,
      tecnico: 0
    };

    for (const categoria in intereses) {
      intereses[categoria].forEach(palabra => {
        if (todo.includes(palabra)) {
          puntuacion[categoria]++;
        }
      });
    }

    const categoriaFinal = Object.entries(puntuacion).sort((a, b) => b[1] - a[1])[0][0];

    return t.mensajeFinal[categoriaFinal] || t.mensajeFinal["ninguno"];
  };

  const descargarPDF = () => {
    const doc = new jsPDF();
  
    const fecha = new Date().toLocaleDateString(idioma === 'es' ? 'es-ES' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  
    // 🧭 PORTADA
    doc.setFontSize(24);
    doc.text(t.idioma === 'es' ? "Tu Brújula Personal" : "Your Personal Compass", 105, 60, null, null, 'center');
  
    doc.setFontSize(14);
    doc.setTextColor(100);
    doc.text(
      idioma === 'es'
        ? "Una guía de autodescubrimiento hecha por vos mismo"
        : "A self-discovery guide made by you",
      105,
      70,
      null,
      null,
      'center'
    );
  
    doc.setFontSize(12);
    doc.setTextColor(150);
    doc.text(`${fecha}`, 105, 80, null, null, 'center');
  
    doc.addPage(); // 🆕 Nueva página para el contenido
  
    // 🧠 RESULTADO
    doc.setFontSize(16);
    doc.setTextColor(0);
    doc.text(t.resultado, 10, 20);
  
    doc.setFontSize(12);
    doc.text(analizarRespuestas(), 10, 30);
  
    // 📝 RESPUESTAS
    let y = 45;
    respuestas.forEach((resp, idx) => {
      const pregunta = `${idx + 1}. ${t.preguntas[idx]}`;
      const respuesta = `→ ${resp}`;
      doc.setFont('helvetica', 'bold');
      doc.text(pregunta, 10, y);
      y += 7;
      doc.setFont('helvetica', 'normal');
      doc.text(respuesta, 10, y);
      y += 10;
  
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });
  
    doc.save("brujula_resultado.pdf");
  };
  

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ textAlign: 'right' }}>
          <button onClick={() => setIdioma(idioma === 'es' ? 'en' : 'es')}>
            🌐 {idioma === 'es' ? 'EN' : 'ES'}
          </button>
        </div>
        <h1>{t.titulo}</h1>
        {!finalizado ? (
          <>
            <p style={{ fontStyle: 'italic' }}>{t.preguntas[paso]}</p>
            <textarea
              placeholder="..."
              value={respuestas[paso]}
              onChange={handleRespuesta}
              style={{
                width: '100%',
                height: '80px',
                padding: '10px',
                borderRadius: '8px',
                marginBottom: '10px',
                fontSize: '1rem',
                resize: 'none'
              }}
            />
            <button onClick={siguientePaso}>{t.siguiente}</button>
          </>
        ) : (
          <>
            <h2>{t.resultado}</h2>
            <p>{analizarRespuestas()}</p>
            <ul style={{ textAlign: 'left' }}>
              {respuestas.map((resp, idx) => (
                <li key={idx}>
                  <strong>{t.preguntas[idx]}</strong><br />
                  {resp}
                </li>
              ))}
            </ul>
            <button onClick={descargarPDF}>{t.descargar}</button>
            <button onClick={reiniciar}>{t.reiniciar}</button>
          </>
        )}
      </header>
    </div>
  );
}

export default App;