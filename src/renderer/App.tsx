import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useEventListener } from '../components/useEventListener';
import './App.css';
import { KeyboardSwitcher } from '../components/KeyboardSwitcher';

export default function App() {
  useEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'q' && !e.ctrlKey && !e.altKey && !e.metaKey && !e.shiftKey) {
      window.electron.hideWindow();
    }
  });

  return (
    <Router>
      <Routes>
        <Route path="/" element={<KeyboardSwitcher />} />
      </Routes>
    </Router>
  );
}
