import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import InterestCalculator from './components/InterestCalculator';
import { LanguageProvider } from './contexts/LanguageContext';
import LanguageTransition from './components/LanguageTransition';
import KeyboardShortcutsGuide from './components/KeyboardShortcutsGuide';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

function AppContent() {
  useKeyboardShortcuts();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calculator" element={<InterestCalculator />} />
      </Routes>
      <Footer />
      <KeyboardShortcutsGuide />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <LanguageTransition />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
