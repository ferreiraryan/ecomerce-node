// src/context/AuthContext.tsx
import react from 'react';
import { api } from '../services/api';

type User = {
  id: string;
  name: string;
  email: string;
  isAdmin?: boolean;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = react.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: react.ReactNode }) {
  const [user, setUser] = react.useState<User | null>(null);
  const [loading, setLoading] = react.useState(true);

  react.useEffect(() => {

    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    api
      .get('/profile')
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem('token');
      })
      .finally(() => setLoading(false));
  }, []);

  async function login(email: string, password: string) {
    const res = await api.post('/login', { email, password });
    const { token, user } = res.data;

    localStorage.setItem('token', token);
    setUser(user);
  }

  async function register(name: string, email: string, password: string) {
    const res = await api.post('/register', { name, email, password });
    const { token, user } = res.data;

    localStorage.setItem('token', token);
    setUser(user);
  }

  function logout() {
    localStorage.removeItem('token');
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = react.useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

