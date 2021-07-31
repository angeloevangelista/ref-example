import React, { useCallback, useEffect, useRef, useState } from "react";

import "./App.css";

const App: React.FC = () => {
  const boxElementRef = useRef<HTMLDivElement | null>(null);
  
  const [defaultBoxSize, setDefaultBoxSize] = useState<number>(0);
  const [boxSize, setBoxSize] = useState<number>(defaultBoxSize);

  useEffect(() => {
    if (!boxElementRef.current) return;

    const elementSize = boxElementRef.current.clientWidth;

    setDefaultBoxSize(elementSize);
    setBoxSize(elementSize);
  }, [boxElementRef]);

  const handleScaleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const scale = Number(event.target.value);

      const nextSize = defaultBoxSize * scale;

      if (!boxElementRef.current) return;

      boxElementRef.current.style.width = `${nextSize}px`;
      boxElementRef.current.style.height = `${nextSize}px`;

      setBoxSize(nextSize);
    },
    [defaultBoxSize]
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
