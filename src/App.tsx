// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ChatBot from './views/ChatBot'
import Landing from './views/Landing'
import SignIn from './views/SignIn'

function App() {
  const handleLogin = (loginData: any) => {
    console.log('Login data:', loginData)
    // Aquí puedes manejar la lógica de inicio de sesión
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/chatbot" element={<ChatBot />} />
        <Route path="/sign-in" element={<SignIn onLogin={handleLogin} />} />
      </Routes>
    </Router>
  )
}

export default App
