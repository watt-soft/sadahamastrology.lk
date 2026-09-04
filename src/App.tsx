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
      <header className="top-bar no-print">
        <div className="brand-badge">
          <img src="/logo-main.png" alt="Sadaham Astrology" className="brand-logo-img" />
        </div>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={theme === 'light' ? "Switch to dark mode" : "Switch to light mode"}
          title={theme === 'light' ? "රාත්‍රී මාදිලිය" : "දිවා මාදිලිය"}
        >
          {theme === 'light' ? <Moon size={19} /> : <Sun size={19} />}
        </button>
      </header>

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
