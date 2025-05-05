// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ChatBot from './views/ChatBot' 
import Landing from './views/Landing' 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<h1>a</h1>} />
        <Route path="/chatbot" element={<ChatBot />} />
      </Routes>
    </Router>
  )
}

export default App
