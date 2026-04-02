import React, { useState } from 'react';
import './App.css';
import DemoForm from './DemoForm';
import HomePage from './homepage';
import Button from './UI-Components/Button';

function App() {
  const [currentTab, setCurrentTab] = useState('demo');

  return (
    <div className="app-wrapper">
      <nav className="top-nav">
        <div className="nav-logo">
          <span className="icon">❖</span>
          UI Platform
        </div>
        <div className="nav-tabs">
          <Button 
            variant={currentTab === 'home' ? 'primary' : 'ghost'}
            onClick={() => setCurrentTab('home')}
          >
            Showcase
          </Button>
          <Button 
            variant={currentTab === 'demo' ? 'primary' : 'ghost'}
            onClick={() => setCurrentTab('demo')}
          >
            Interactive Form
          </Button>
        </div>
      </nav>

      <main className="main-content">
        {currentTab === 'demo' ? <DemoForm /> : <HomePage />}
      </main>
    </div>
  );
}

export default App;
