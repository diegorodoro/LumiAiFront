import { useState } from 'react';
import './components/loginForms.css';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../firebase';

interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LoginFormProps {
  onLogin: (loginData: LoginData) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Campos incompletos');
      return;
    }

    onLogin({ email, password, rememberMe });
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      console.log("Usuario de Google:", user);

      onLogin({ email: user.email || '', password: '', rememberMe: true });
    } catch (err) {
      console.error("Error al iniciar sesión con Google:", err);
      setError("Error al iniciar sesión con Google");
    }
  };

  return (
    <div className="login-form-container">
      <div className="login-header">
        <h1>Bienvenido</h1>
        <p>Inicia sesión para continuar</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
          />
        </div>

        <div className="form-options">
          <div className="remember-me">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="rememberMe">Recordarme</label>
          </div>
          <a href="#" className="forgot-password">¿Olvidaste tu contraseña?</a>
        </div>

        <button type="submit" className="login-button">Iniciar Sesión</button>

        <div className="google-login">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="google-button"
          >
            Iniciar sesión con Google
          </button>
        </div>

        <div className="register-option">
          ¿No tienes una cuenta? <a href="#">Regístrate</a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;