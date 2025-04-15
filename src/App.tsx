import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import LoginPage from './layouts/loginLayout'; 
import Questionnaire from './components/questions/questions';


function App() {
  return (
    <Router>
      <Routes>
        
        {/* Ruta para la pantalla principal */}
        <Route path="/" element={<MainLayout />} />

        {/* Ruta para el login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Ruta para las preguntas */}
        <Route path="/questions" element={<Questionnaire/>} />
      </Routes>
    </Router>
  );
}

export default App;
