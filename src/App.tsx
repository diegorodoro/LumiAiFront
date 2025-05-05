// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ChatBot from './views/ChatBot' // Eliminar la extensión .tsx
import Landing from './views/Landing'
import SignIn from './views/SignIn'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/chatbot" element={<ChatBot />} />
        <Route path="/sign-in" element={<SignIn onLogin={(loginData) => console.log('Login data:', loginData)} />} />
      </Routes>
    </Router>
  )
}

export default App
