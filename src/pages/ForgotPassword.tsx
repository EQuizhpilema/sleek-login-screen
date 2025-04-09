
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { User } from 'lucide-react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [username, setUsername] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [requestSent, setRequestSent] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset states
    setError(null);
    
    // Basic validation
    if (!username.trim()) {
      setError('Please enter your username');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // In a real app, you would call an API to send a password reset email
      // For now we'll simulate a successful API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setRequestSent(true);
      toast({
        title: "Reset Link Sent",
        description: "If an account exists with this username, you'll receive a password reset link.",
      });
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-5 col-xl-4">
            <div className="card shadow-card">
              {requestSent ? (
                <div className="card-body text-center">
                  <div className="d-flex justify-content-center mb-4">
                    <div className="bg-success bg-opacity-10 p-3 rounded-circle">
                      <User className="text-success" size={32} />
                    </div>
                  </div>
                  <h2 className="card-title text-center mb-3">Reset Link Sent</h2>
                  <p className="text-muted mb-4">
                    If an account exists with the username <strong>{username}</strong>, you'll receive a 
                    password reset link shortly. Please check your registered email and spam folder.
                  </p>
                  <Link to="/" className="btn btn-primary w-100 rounded-pill">
                    Return to Login
                  </Link>
                </div>
              ) : (
                <div className="card-body animate__animated animate__fadeIn">
                  <form onSubmit={handleSubmit}>
                    <h2 className="card-title text-center mb-2">Forgot Password</h2>
                    <p className="text-center mb-4 text-muted">Enter your username to receive a password reset link</p>
                    
                    {error && (
                      <div className="alert alert-danger mb-4" role="alert">
                        {error}
                      </div>
                    )}

                    <div className="mb-3">
                      <label htmlFor="username" className="form-label">
                        Username
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <User size={18} />
                        </span>
                        <input
                          id="username"
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="form-control"
                          placeholder="username"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      className="btn btn-primary w-100 rounded-pill mb-3"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Reset Link"}
                    </button>

                    <div className="text-center">
                      <p className="small text-muted">
                        Remember your password?{" "}
                        <Link to="/" className="text-decoration-none">
                          Back to login
                        </Link>
                      </p>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
