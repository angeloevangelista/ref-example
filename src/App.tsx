import React, { useCallback, useRef, useState } from "react";

import "./App.css";

const defaultBoxSize = 200;

const App: React.FC = () => {
  const boxElementRef = useRef<HTMLDivElement | null>(null);
  const [boxSize, setBoxSize] = useState<number>(defaultBoxSize);

  const handleScaleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const scale = Number(event.target.value);

      const nextSize = defaultBoxSize * scale;

      if (!boxElementRef.current) return;

      boxElementRef.current.style.width = `${nextSize}px`;
      boxElementRef.current.style.height = `${nextSize}px`;

      setBoxSize(nextSize);
    },
    []
  );

  return (
    <div className="container">
      <div className="scale-container">
        <strong>Escala</strong>

        <input
          type="range"
          min="0"
          max="2"
          step="0.1"
          defaultValue="1"
          onChange={handleScaleChange}
        />
      </div>

      <main>
        <div ref={boxElementRef} className="box">
          {boxSize >= defaultBoxSize ? (
            <strong>😎</strong>
          ) : (
            <strong>🥺</strong>
          )}
        </div>
      </main>
    </div>
  );
};

export { App };
