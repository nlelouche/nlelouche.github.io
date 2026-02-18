import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import GameLayout from './layouts/GameLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GameLayout />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
