
export const DARK_TOKEN_COLORS = [
  'bg-orange-900/50 text-orange-300 border border-orange-500/20',
  'bg-blue-900/50 text-blue-300 border border-blue-500/20',
  'bg-orange-800/50 text-orange-200 border border-orange-400/20',
  'bg-blue-800/50 text-blue-200 border border-blue-400/20',
  'bg-orange-700/50 text-orange-100 border border-orange-300/20',
  'bg-blue-700/50 text-blue-100 border border-blue-300/20',
  'bg-slate-700/50 text-slate-200 border border-slate-500/20',
];

export const LIGHT_TOKEN_COLORS = [
  'bg-orange-100 text-orange-900 border border-orange-200',
  'bg-blue-100 text-blue-900 border border-blue-200',
  'bg-orange-200 text-orange-800 border border-orange-300',
  'bg-blue-200 text-blue-800 border border-blue-300',
  'bg-orange-300 text-orange-700 border border-orange-400',
  'bg-blue-300 text-blue-700 border border-blue-400',
  'bg-slate-200 text-slate-800 border border-slate-300',
];

export const DEFAULT_TEXT = `Welcome to the LLM Token Visualizer!
This tool helps you see how text is broken down into tokens for Large Language Models.

1.  Enter your text in the left panel.
2.  See real-time stats (tokens, words, characters) update above.
3.  Observe the color-coded tokens on the right.

This is useful for prompt engineering, understanding API costs, and learning about tokenization. For example, "don't" becomes two tokens: "don" and "'t". Complex words or misspellings like "tokenizationn" might also be split differently.`;
