
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { DEFAULT_TEXT } from './constants';
import { tokenize, countWords, analyzeTokens } from './lib/tokenizer';
import StatCard from './components/StatCard';
import TokenVisualizer from './components/TokenVisualizer';
import IconButton from './components/IconButton';
import { useCopyToClipboard } from './hooks/useCopyToClipboard';

export type Theme = 'light' | 'dark';

export default function App() {
  const [text, setText] = useState<string>(() => {
    const savedText = localStorage.getItem('tokenizer-text');
    return savedText || DEFAULT_TEXT;
  });
  const [theme, setTheme] = useState<Theme>('dark');
  const [isCopied, copy] = useCopyToClipboard();
  const [costPerMillion, setCostPerMillion] = useState<number>(() => {
    const savedCost = localStorage.getItem('cost-per-million');
    return savedCost ? parseFloat(savedCost) : 0;
  });
  const [useEnteredTokens, setUseEnteredTokens] = useState<boolean>(() => {
    const savedSetting = localStorage.getItem('use-entered-tokens');
    return savedSetting ? JSON.parse(savedSetting) : true;
  });
  const [manualTokenCount, setManualTokenCount] = useState<number>(() => {
    const savedCount = localStorage.getItem('manual-token-count');
    return savedCount ? parseInt(savedCount) : 0;
  });

  useEffect(() => {
    // Check for saved theme in localStorage or system preference
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const systemPrefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    if (text !== DEFAULT_TEXT || localStorage.getItem('tokenizer-text')) {
      localStorage.setItem('tokenizer-text', text);
    }
  }, [text]);

  useEffect(() => {
    localStorage.setItem('cost-per-million', costPerMillion.toString());
  }, [costPerMillion]);

  useEffect(() => {
    localStorage.setItem('use-entered-tokens', JSON.stringify(useEnteredTokens));
  }, [useEnteredTokens]);

  useEffect(() => {
    localStorage.setItem('manual-token-count', manualTokenCount.toString());
  }, [manualTokenCount]);
  
  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  const stats = useMemo(() => {
    const tokenList = tokenize(text);
    const analysis = analyzeTokens(tokenList);
    const tokenCount = useEnteredTokens ? tokenList.length : manualTokenCount;
    const estimatedCost = costPerMillion > 0 ? (tokenCount / 1000000) * costPerMillion : 0;
    
    return {
      tokens: tokenList.length,
      words: countWords(text),
      characters: text.length,
      tokenList: tokenList,
      analysis,
      estimatedCost,
      effectiveTokenCount: tokenCount,
    };
  }, [text, costPerMillion, useEnteredTokens, manualTokenCount]);

  const handleCopy = useCallback(() => {
    const tokensString = stats.tokenList.map(t => `"${t}"`).join(', ');
    copy(`[${tokensString}]`);
  }, [stats.tokenList, copy]);

  const handleClear = useCallback(() => {
    setText('');
    localStorage.removeItem('tokenizer-text');
  }, []);

  // Keyboard shortcuts - moved after function definitions
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 's':
            e.preventDefault();
            handleCopy();
            break;
          case 'k':
            e.preventDefault();
            toggleTheme();
            break;
          case 'l':
            e.preventDefault();
            handleClear();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleCopy, toggleTheme, handleClear]);

  return (
    <div className="h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans transition-colors duration-300 flex flex-col w-full p-4 sm:p-6 lg:p-8 overflow-hidden">
      <header className="relative text-center mb-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-blue-600 dark:from-orange-400 dark:to-blue-500 pb-2">
          LLM Token Visualizer
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-2xl mx-auto">
          Analyze and visualize text tokenization for Large Language Models in real-time.
        </p>
        
        <div className="absolute top-0 right-0 flex gap-2">
          <IconButton 
            onClick={toggleTheme} 
            aria-label="Toggle theme"
            title="Toggle theme (Ctrl+K)"
          >
            {theme === 'light' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            )}
          </IconButton>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard
          label="Tokens"
          value={stats.tokens}
          subtitle={stats.analysis ? `Avg: ${stats.analysis.avgLength} chars` : undefined}
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500 dark:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V4m0 16v-2M8 12a4 4 0 118 0 4 4 0 01-8 0z" /></svg>}
        />
        <StatCard
          label="Words"
          value={stats.words}
          subtitle={stats.analysis ? `${Math.round((stats.analysis.categories.words / stats.tokens) * 100)}% of tokens` : undefined}
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
        />
        <StatCard
          label="Characters"
          value={stats.characters}
          subtitle={stats.analysis ? `Efficiency: ${stats.analysis.efficiency}` : undefined}
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-600 dark:text-orange-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10m16-10v10M9 3h6l3 4-3 4H9L6 7l3-4z" /></svg>}
        />
      </div>

      <div className="bg-white/50 dark:bg-slate-950/70 backdrop-blur-sm rounded-lg border border-slate-200 dark:border-slate-700 p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">Cost Calculator</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
          <div className="space-y-2">
            <label htmlFor="cost-input" className="block text-sm font-medium text-slate-600 dark:text-slate-300">
              Cost per 1M tokens ($)
            </label>
            <input
              id="cost-input"
              type="number"
              value={costPerMillion || ''}
              onChange={(e) => setCostPerMillion(parseFloat(e.target.value) || 0)}
              placeholder="0.00"
              step="0.01"
              min="0"
              className="w-full px-4 py-3 text-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <input
                id="use-entered-tokens"
                type="checkbox"
                checked={useEnteredTokens}
                onChange={(e) => setUseEnteredTokens(e.target.checked)}
                className="w-5 h-5 text-orange-600 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 rounded focus:ring-orange-500 focus:ring-2"
              />
              <label htmlFor="use-entered-tokens" className="text-sm font-medium text-slate-600 dark:text-slate-300">
                Count entered tokens automatically
              </label>
            </div>
            
            {!useEnteredTokens && (
              <div className="space-y-2">
                <label htmlFor="manual-tokens" className="block text-sm font-medium text-slate-600 dark:text-slate-300">
                  Manual token count
                </label>
                <input
                  id="manual-tokens"
                  type="number"
                  value={manualTokenCount || ''}
                  onChange={(e) => setManualTokenCount(parseInt(e.target.value) || 0)}
                  placeholder="0"
                  min="0"
                  className="w-full px-4 py-3 text-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            )}
          </div>
          
          {costPerMillion > 0 && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4">
              <div className="text-sm font-medium text-green-600 dark:text-green-400 mb-1">Estimated Cost</div>
              <div className="text-2xl font-bold text-green-800 dark:text-green-300">
                ${stats.estimatedCost.toFixed(6)}
              </div>
              <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                {useEnteredTokens ? `${stats.tokens} tokens` : `${stats.effectiveTokenCount} tokens`}
              </div>
            </div>
          )}
        </div>
      </div>

      <main className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
        <div className="flex flex-col h-full min-h-0 relative group">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text here to see the magic..."
            className="w-full h-full p-4 bg-white/50 dark:bg-slate-950/70 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 placeholder-slate-500 dark:placeholder-slate-600 text-lg leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 font-mono backdrop-blur-sm overflow-y-auto"
          />
           <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <IconButton 
              onClick={handleCopy} 
              aria-label="Copy tokens" 
              disabled={stats.tokens === 0}
              title="Copy tokens (Ctrl+S)"
            >
              {isCopied ? 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                :
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              }
            </IconButton>
            <IconButton 
              onClick={handleClear} 
              aria-label="Clear text" 
              disabled={text.length === 0}
              title="Clear text (Ctrl+L)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </IconButton>
          </div>
        </div>
        <div className="flex flex-col h-full min-h-0">
          <TokenVisualizer tokens={stats.tokenList} theme={theme} />
        </div>
      </main>
      
      <footer className="text-center mt-6 text-xs text-slate-500 dark:text-slate-400">
        <p>
          Disclaimer: Tokenization is a best-effort approximation based on common patterns and may not perfectly match the output of specific models (e.g., Gemini, GPT-4).
        </p>
      </footer>
    </div>
  );
}
