// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatBot from "./views/ChatBot";
import Landing from "./views/Landing";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
