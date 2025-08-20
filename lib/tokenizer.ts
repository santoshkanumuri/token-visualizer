
// This regex is a simplified approximation of how tokenizers like GPT-2/3 work before Byte-Pair Encoding.
// It handles common contractions, punctuation, and groups of letters/numbers.
const GPT_TOKEN_REGEX = /'s|'t|'re|'ve|'m|'ll|'d| ?\p{L}+| ?\p{N}+| ?[^\s\p{L}\p{N}]+|\s+(?!\S)|\s+/gu;

export const tokenize = (text: string): string[] => {
  if (!text) return [];
  const matches = text.match(GPT_TOKEN_REGEX);
  return matches || [];
};

export const countWords = (text: string): number => {
  if (!text.trim()) return 0;
  // This regex splits on any whitespace character and filters out empty strings.
  return text.trim().split(/\s+/).filter(Boolean).length;
};

// New analysis functions
export const analyzeTokens = (tokens: string[]) => {
  if (!tokens.length) return null;

  const tokenLengths = tokens.map(token => token.length);
  const avgLength = tokenLengths.reduce((sum, len) => sum + len, 0) / tokens.length;
  const minLength = Math.min(...tokenLengths);
  const maxLength = Math.max(...tokenLengths);

  // Categorize tokens
  const categories = {
    words: tokens.filter(token => /^[a-zA-Z]+$/.test(token)).length,
    numbers: tokens.filter(token => /^\d+$/.test(token)).length,
    punctuation: tokens.filter(token => /^[^\w\s]+$/.test(token)).length,
    whitespace: tokens.filter(token => /^\s+$/.test(token)).length,
    mixed: tokens.filter(token => !/^[a-zA-Z]+$|^\d+$|^[^\w\s]+$|^\s+$/.test(token)).length,
  };

  // Find most common tokens
  const tokenCounts = tokens.reduce((acc, token) => {
    acc[token] = (acc[token] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const mostCommon = Object.entries(tokenCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([token, count]) => ({ token, count }));

  return {
    total: tokens.length,
    avgLength: Math.round(avgLength * 100) / 100,
    minLength,
    maxLength,
    categories,
    mostCommon,
    efficiency: Math.round((tokens.length / (tokens.join('').length || 1)) * 100) / 100,
  };
};

export const estimateCost = (tokens: string[], model: 'gpt-4' | 'gpt-3.5' | 'claude' = 'gpt-4') => {
  const rates = {
    'gpt-4': { input: 0.03, output: 0.06 }, // per 1K tokens
    'gpt-3.5': { input: 0.0015, output: 0.002 },
    'claude': { input: 0.015, output: 0.075 },
  };

  const rate = rates[model];
  const inputCost = (tokens.length / 1000) * rate.input;
  const outputCost = (tokens.length / 1000) * rate.output; // assuming same output length

  return {
    input: Math.round(inputCost * 1000) / 1000,
    output: Math.round(outputCost * 1000) / 1000,
    total: Math.round((inputCost + outputCost) * 1000) / 1000,
    currency: 'USD',
  };
};
