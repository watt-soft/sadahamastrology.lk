import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { BillForm } from './components/BillForm';
import { BillPreview } from './components/BillPreview';
import { InstituteHeader } from './components/InstituteHeader';
import type { BillData } from './types';

function App() {
  const [view, setView] = useState<'form' | 'preview'>('form');
  const [billData, setBillData] = useState<BillData | null>(null);
  
  // Check local storage or system preference for initial theme
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('app-theme');
    if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
    return 'light'; // Default to light mode
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleGenerate = (data: BillData) => {
    setBillData(data);
    setView('preview');
  };

  const handleBack = () => {
    setView('form');
  };

  return (
    <div className="app-container">
      <div className="top-bar no-print">
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>

      {view === 'form' ? (
        <>
          <InstituteHeader />
          <BillForm onGenerate={handleGenerate} />
        </>
      ) : (
        billData && <BillPreview data={billData} onBack={handleBack} />
      )}
    </div>
  );
}

export default App;
