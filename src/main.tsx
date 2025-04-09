
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Ensure React is properly imported and available
const root = document.getElementById("root");
if (root) {
  createRoot(root).render(<App />);
}
