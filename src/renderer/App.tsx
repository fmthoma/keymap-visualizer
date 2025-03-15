import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import { Crkbd } from '../components/Crkbd';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Crkbd />} />
      </Routes>
    </Router>
  );
}
