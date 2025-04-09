import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import LoginPage from './layouts/loginLayout'; 

function App() {
  return (
    <Router>
      <Routes>
        
        {/* Ruta para la pantalla principal */}
        <Route path="/" element={<MainLayout />} />

        {/* Ruta para el login */}
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
