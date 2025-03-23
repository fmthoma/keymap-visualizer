import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import { Ergodox } from '../components/Ergodox';
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
