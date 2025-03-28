import { createRoot } from 'react-dom/client';
import App from './App';
import 'react-tooltip/dist/react-tooltip.css';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<App />);
