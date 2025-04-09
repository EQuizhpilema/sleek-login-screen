import React, { useState } from 'react';
import { Eye, EyeOff, Lock, User } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';
import {
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBInputGroup
} from 'mdb-react-ui-kit';

interface LoginFormProps {
  onLogin?: (username: string, password: string) => void;
  companyName?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, companyName = "Sun Logistics" }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setError(null);
    
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (username === 'admin' && password === 'password123') {
        toast({
          title: "Login Successful",
          description: "Welcome back!",
        });
        
        if (onLogin) {
          onLogin(username, password);
        }
      } else {
        setError('Invalid username or password. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="card-body animate__animated animate__fadeIn">
      <form onSubmit={handleSubmit}>
        <h2 className="card-title text-center mb-2">{`Login to ${companyName}`}</h2>
        <p className="text-center mb-4 text-muted">Enter your credentials to access your account</p>
        
        {error && (
          <div className="alert alert-danger mb-4" role="alert">
            {error}
          </div>
        )}

        <div className="mb-4">
          <MDBInput
            label='Username'
            id='username'
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isSubmitting}
            required
            contrast
          >
            <div className="input-prefix">
              <User size={18} />
            </div>
          </MDBInput>
        </div>

        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <label htmlFor="password" className="form-label mb-0">
              Password
            </label>
            <Link 
              to="/forgot-password" 
              className="text-decoration-none small"
            >
              Forgot Password?
            </Link>
          </div>
          <MDBInputGroup>
            <div className="input-prefix">
              <Lock size={18} />
            </div>
            <MDBInput
              id='password'
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
              required
              label='Password'
              contrast
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="btn btn-outline-secondary"
              tabIndex={-1}
              style={{ zIndex: 0 }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </MDBInputGroup>
        </div>

        <div className="mb-4">
          <MDBCheckbox
            name='remember'
            id='remember'
            label='Remember me'
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
        </div>

        <MDBBtn 
          type='submit' 
          className="w-100 mb-3"
          color='primary'
          rounded
          disabled={isSubmitting}
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </MDBBtn>
      </form>
    </div>
  );
};

export default LoginForm;
