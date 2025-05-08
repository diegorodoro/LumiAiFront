// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ChatBot from './views/ChatBot'
import Landing from './views/Landing'
import SignIn from './views/SignIn'

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/chatbot" element={<ChatBot />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </Router>
  )
}

export default App
