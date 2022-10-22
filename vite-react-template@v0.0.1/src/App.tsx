import { useState } from "react";
import React from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(1);

  return (
    <div className="App">
      <h1>React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p className="flex-c">
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </div>
  );
}

export default App;
