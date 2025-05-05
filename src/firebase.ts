import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'Api key',
  authDomain: 'blablabla',
  projectId: 'blablabla',
  storageBucket: 'bablabla',
  messagingSenderId: 'bablabla',
  appId: 'bablabla',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };