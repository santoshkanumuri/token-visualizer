
import React, { useState, useMemo } from 'react';
import { DARK_TOKEN_COLORS, LIGHT_TOKEN_COLORS } from '../constants';
import type { Theme } from '../App';

interface TokenVisualizerProps {
  tokens: string[];
  theme: Theme;
}

const TokenVisualizer: React.FC<TokenVisualizerProps> = ({ tokens, theme }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const tokenColors = theme === 'dark' ? DARK_TOKEN_COLORS : LIGHT_TOKEN_COLORS;
  
  const filteredTokens = useMemo(() => {
    if (!searchTerm) return tokens;
    return tokens.filter(token => 
      token.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [tokens, searchTerm]);

  const matchingIndices = useMemo(() => {
    if (!searchTerm) return new Set<number>();
    return new Set(
      tokens
        .map((token, index) => token.toLowerCase().includes(searchTerm.toLowerCase()) ? index : -1)
        .filter(index => index !== -1)
    );
  }, [tokens, searchTerm]);

  return (
    <div className="w-full h-full bg-white/50 dark:bg-slate-950/70 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden relative transition-colors duration-300 backdrop-blur-sm flex flex-col">
      {/* Search Bar */}
      <div className="p-3 border-b border-slate-200 dark:border-slate-700">
        <div className="relative">
          <input
            type="text"
            placeholder="Search tokens..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 bg-white/70 dark:bg-slate-800/70 rounded-md border border-slate-200 dark:border-slate-600 text-orange-800 dark:text-orange-200 placeholder-orange-500 dark:placeholder-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
          />
          {searchTerm && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-orange-500 dark:text-orange-400">
              {filteredTokens.length}/{tokens.length}
            </div>
          )}
        </div>
      </div>

      {/* Token Display */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="text-lg leading-relaxed whitespace-pre-wrap break-words font-mono">
          {tokens.length > 0 ? (
            tokens.map((token, index) => {
              const isHighlighted = matchingIndices.has(index);
              const baseClasses = `rounded px-0.5 py-0.5 m-0.5 inline-block transition-colors duration-300 ${tokenColors[index % tokenColors.length]}`;
              const highlightClasses = isHighlighted ? 'ring-2 ring-yellow-400 ring-opacity-75 shadow-lg' : '';
              
              return (
                <span 
                  key={index} 
                  className={`${baseClasses} ${highlightClasses}`}
                  title={`Token ${index + 1}: "${token}"`}
                >
                  {token.replace(/\n/g, '↵\n')}
                </span>
              );
            })
          ) : (
            <div className="text-orange-500 dark:text-orange-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V4m0 16v-2M8 12a4 4 0 118 0 4 4 0 01-8 0z" /></svg>
              <span>Token visualization appears here</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TokenVisualizer;
