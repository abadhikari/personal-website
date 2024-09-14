import React from 'react';
import ReactDOM from 'react-dom/client';

function App(): React.ReactElement {
  return <h1>Hello World!</h1>;
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<App />);
