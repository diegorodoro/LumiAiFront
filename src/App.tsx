// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ChatBot from './views/ChatBot' // Eliminar la extensión .tsx
import Questionnaire from './views/questions/components/questions'
import LoginForm from './views/login/components/LoginForm'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/questions" element={<Questionnaire/>} />
        <Route path="/login" element={<LoginForm onLogin={(data) => console.log('Login data:', data)} />} />
        <Route path="/" element={<ChatBot />} />
      </Routes>
    </Router>
  )
}

export default App
