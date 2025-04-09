// layouts/loginLayout.tsx
import LoginForm from '../components/login/loginForm';
import './loginLayout.css';

interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const LoginPage: React.FC = () => {
  const handleLogin = (loginData: LoginData) => {
    console.log('Login data:', loginData);
  };

  return (
    <div className="login-page">
      <div className="login-form-side">
        <LoginForm onLogin={handleLogin} />
      </div>
      <div className="login-image-side">
        <div className="image-overlay">
          <h2>Lumi AI</h2>
          <p>Tu acompañante psicológico</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
