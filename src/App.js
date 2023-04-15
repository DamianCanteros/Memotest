import './App.css';
import Board from './component/Board/Board';
import React, { useState, useEffect } from 'react';

const App = () => {

  const [Backs, setBacks] = useState([]);
  const [reset, setReset] = useState(false);
  const [blockSelected, setBlockSelected] = useState(null);
  const [pairsFound, setPairsFound] = useState(0); // nuevo estado para llevar la cuenta de los pares encontrados
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    const generateBacks = () => {
      const newBacks = ["\u{1F435}", "\u{1F436}", "\u{1F431}", "\u{1F981}", "\u{1F437}", "\u{1F439}", "\u{1F430}", "\u{1F438}","\u{1F435}", "\u{1F436}", "\u{1F431}", "\u{1F981}", "\u{1F437}", "\u{1F439}", "\u{1F430}", "\u{1F438}"];
      for (let i = 0; i < 16; i++) {
          const j = Math.floor(Math.random() * (16));
          [newBacks[i], newBacks[j]] = [newBacks[j], newBacks[i]];
      }
      return newBacks;
    }
    setBacks(generateBacks());
  }, []);

  const handleClick = (e) => {
      const block = e.target;
      const value = block.getAttribute('value');

      // Verificar si el elemento clickeado es un bloque
      if (!block.classList.contains('memo-front')) {
        return;
       // Voltea la carta si está boca abajo
      }else {
          block.classList.toggle('memo-back');
          block.classList.toggle('memo-front');
      };

      if(blockSelected === null) {
          setBlockSelected(block);
      } else if(block.getAttribute('value') === blockSelected.getAttribute('value')) {
          setBlockSelected(null);
          setPairsFound(pairsFound + 1); // incrementa el contador de pares encontrados
          if (pairsFound + 1 === Backs.length / 2) { // si se encontraron todos los pares, muestra el alert y reinicia el juego
            setShowAnimation(true);
          }
      } else {
          setTimeout(() => {
              block.classList.toggle('memo-back');
              blockSelected.classList.toggle('memo-back');
              block.classList.toggle('memo-front');
              blockSelected.classList.toggle('memo-front');
              setBlockSelected(null); 
          }, 500);    
      };
  };

  const handleReset = () => {
    setReset(true);
  };

  return (
    <div className="App">
      {!reset && <Board Backs={Backs} onClick={handleClick} />}
      {!reset && <div className="button" onClick={handleReset}>Reset</div>}
      {reset && <App />}
      {!reset && <div className="animation" style={{ display: showAnimation ? 'block' : 'none' }}>
        {<div className="Win"><p>You Won &#x1F389;</p></div>}
      </div>}
    </div>
  );
};

export default App;


