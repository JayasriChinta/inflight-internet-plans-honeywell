import React from 'react';
import './App.css';
import PlanList from './components/PlanList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Inflight Internet Plans</h1>
      </header>
      <main>
        <PlanList />
      </main>
    </div>
  );
}

export default App;
