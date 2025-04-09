
import React, { useState } from 'react';
import { Eye, EyeOff, Lock, User } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';

const LoginForm = ({ onLogin, companyName = "Sun Logistics" }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
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
    <div className="card-body animate__animated animate__fadeIn p-4 p-md-5">
      <form onSubmit={handleSubmit}>
        <h3 className="fw-bold mb-3 text-center">{`Login to ${companyName}`}</h3>
        <p className="text-center mb-4 text-muted">Enter your credentials to access your account</p>
        
        {error && (
          <div className="alert alert-danger mb-4" role="alert">
            {error}
          </div>
        )}

        <div className="form-outline mb-4">
          <div className="input-group">
            <span className="input-group-text">
              <User size={18} />
            </span>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control form-control-lg"
              placeholder="Username"
              disabled={isSubmitting}
            />
          </div>
          <label className="form-label" htmlFor="username">Username</label>
        </div>

        <div className="form-outline mb-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <label className="form-label mb-0" htmlFor="password">
              Password
            </label>
            <Link 
              to="/forgot-password" 
              className="text-primary text-decoration-none small"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="input-group">
            <span className="input-group-text">
              <Lock size={18} />
            </span>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control form-control-lg"
              placeholder="••••••••"
              disabled={isSubmitting}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="btn btn-outline-secondary"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="form-check mb-4">
          <input 
            type="checkbox" 
            className="form-check-input" 
            id="remember" 
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label
            className="form-check-label"
            htmlFor="remember"
          >
            Remember me
          </label>
        </div>

        <button 
          type="submit" 
          className="btn btn-primary btn-lg btn-block w-100 ripple-surface rounded-pill"
          disabled={isSubmitting}
        >
          {isSubmitting ? 
            <span>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Signing in...
            </span> : 
            "Sign In"
          }
        </button>

        <div className="text-center mt-4">
          <p>Not a member? <Link to="/signup" className="text-primary">Register</Link></p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
