// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ChatBot from './views/ChatBot' // Eliminar la extensión .tsx

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<h1>a</h1>} />
        <Route path="/" element={<ChatBot />} />
      </Routes>
    </Router>
  )
}

export default App
