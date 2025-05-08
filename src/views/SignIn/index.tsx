// src/pages/AuthForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate(); // ⬅️ Aquí usamos el hook

  const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let userCredential;

      if (isRegistering) {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }

      const token = await userCredential.user.getIdToken();

      const response = await fetch("https://lumiapi-luzj.onrender.com/protected", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log(`${isRegistering ? "Registro" : "Login"} exitoso, respuesta del backend:`, data);

      // 🔁 Si es registro, redirigimos a preferencias
      if (isRegistering) {
        navigate("/preferencias");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error al ${isRegistering ? "registrar" : "iniciar sesión"}:`, error.message);
      } else {
        console.error(`Error al ${isRegistering ? "registrar" : "iniciar sesión"}:`, error);
      }
    }
  };

  return (
    <div>
      <h2>{isRegistering ? "Registrarse" : "Iniciar sesión"}</h2>
      <form onSubmit={handleAuth}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
        />
        <button type="submit">{isRegistering ? "Registrarse" : "Iniciar sesión"}</button>
      </form>
      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
      </button>
    </div>
  );
}

export default SignIn;
