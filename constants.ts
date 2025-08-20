
export const DARK_TOKEN_COLORS = [
  'bg-red-900/50 text-red-300 border border-red-500/20',
  'bg-sky-900/50 text-sky-300 border border-sky-500/20',
  'bg-green-900/50 text-green-300 border border-green-500/20',
  'bg-yellow-900/50 text-yellow-300 border border-yellow-500/20',
  'bg-purple-900/50 text-purple-300 border border-purple-500/20',
  'bg-pink-900/50 text-pink-300 border border-pink-500/20',
  'bg-indigo-900/50 text-indigo-300 border border-indigo-500/20',
];

export const LIGHT_TOKEN_COLORS = [
  'bg-red-100 text-red-900 border border-red-200',
  'bg-sky-100 text-sky-900 border border-sky-200',
  'bg-green-100 text-green-900 border border-green-200',
  'bg-yellow-100 text-yellow-800 border border-yellow-200',
  'bg-purple-100 text-purple-900 border border-purple-200',
  'bg-pink-100 text-pink-900 border border-pink-200',
  'bg-indigo-100 text-indigo-900 border border-indigo-200',
];

export const DEFAULT_TEXT = `Welcome to the LLM Token Visualizer!
This tool helps you see how text is broken down into tokens for Large Language Models.

1.  Enter your text in the left panel.
2.  See real-time stats (tokens, words, characters) update above.
3.  Observe the color-coded tokens on the right.

This is useful for prompt engineering, understanding API costs, and learning about tokenization. For example, "don't" becomes two tokens: "don" and "'t". Complex words or misspellings like "tokenizationn" might also be split differently.`;
