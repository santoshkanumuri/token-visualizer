# LLM Token Visualizer

A real-time tokenization visualization tool for Large Language Models. See how your text is broken down into tokens with interactive analysis and search capabilities.

![LLM Token Visualizer](https://img.shields.io/badge/React-19.1.1-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ Features

- **Real-time Tokenization**: See tokens as you type with color-coded visualization
- **Advanced Search**: Search and filter tokens with highlighting
- **Detailed Analytics**: Token statistics, word percentages, and efficiency metrics
- **Persistent Storage**: Your text and theme preferences are automatically saved
- **Keyboard Shortcuts**: Power user shortcuts for faster workflow
- **Dark/Light Mode**: Toggle between themes with system preference detection
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/llm-token-visualizer.git
cd llm-token-visualizer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🎯 Usage

### Basic Tokenization
1. Enter text in the left panel
2. Watch real-time token analysis update above
3. View color-coded tokens on the right

### Advanced Features
- **Search Tokens**: Use the search bar in the token visualizer to find specific tokens
- **Keyboard Shortcuts**:
  - `Ctrl+S`: Copy tokens to clipboard
  - `Ctrl+K`: Toggle theme
  - `Ctrl+L`: Clear text
- **Statistics**: View detailed metrics including:
  - Token count with average length
  - Word percentage of total tokens
  - Character count with efficiency metrics

## 🔧 How Tokenization Works

This tool uses a simplified approximation of GPT-2/3 tokenization:

- **Contractions**: Split into separate tokens (`don't` → `["don", "'t"]`)
- **Words**: Groups of letters become individual tokens
- **Numbers**: Groups of digits become tokens
- **Punctuation**: Non-letter/number characters become tokens
- **Whitespace**: Spaces and whitespace characters become tokens

⚠️ **Note**: This is an educational approximation and may not perfectly match actual model tokenizers.

## 📊 Statistics Explained

- **Tokens**: Total number of tokens generated
- **Words**: Traditional word count (space-separated)
- **Characters**: Total character count
- **Average Length**: Mean characters per token
- **Word Percentage**: Percentage of tokens that are words
- **Efficiency**: Tokens per character ratio

## 🎨 Customization

### Themes
- **Light Mode**: Clean, bright interface
- **Dark Mode**: Easy on the eyes for extended use
- **Auto-detection**: Respects system preferences

### Token Colors
Tokens are color-coded using a rotating palette of 7 colors for easy identification and pattern recognition.

## 🛠️ Tech Stack

- **Frontend**: React 19.1.1 with TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **State Management**: React Hooks
- **Icons**: Heroicons (SVG)

## 📁 Project Structure

```
llm-token-visualizer/
├── components/          # React components
│   ├── IconButton.tsx
│   ├── StatCard.tsx
│   └── TokenVisualizer.tsx
├── hooks/              # Custom React hooks
│   └── useCopyToClipboard.ts
├── lib/                # Utility functions
│   └── tokenizer.ts
├── App.tsx             # Main application component
├── constants.ts        # App constants and configurations
└── index.html          # HTML template
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for educational purposes to understand LLM tokenization
- Inspired by the need for better prompt engineering tools
- Uses simplified tokenization patterns based on GPT models

## 📞 Support

If you have any questions or suggestions, please open an issue on GitHub.

---

**Disclaimer**: Tokenization is a best-effort approximation based on common patterns and may not perfectly match the output of specific models (e.g., Gemini, GPT-4).
