import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { KeyboardSwitcher } from '../components/KeyboardSwitcher';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<KeyboardSwitcher />} />
      </Routes>
    </Router>
  );
}
