
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBInputGroup
} from 'mdb-react-ui-kit';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  const { toast } = useToast();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset error state
    setError(null);
    
    // Basic validation
    if (!password.trim() || !confirmPassword.trim()) {
      setError('Please enter both password fields');
      return;
    }
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!token) {
      setError('Invalid or missing reset token');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // In a real app, you would call an API to reset the password with the token
      // For now we'll simulate a successful API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Password Reset Successfully",
        description: "Your password has been updated. You can now login with your new password.",
      });
      
      // Redirect to login page after successful reset
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    } catch (err) {
      setError('An error occurred while resetting your password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // If no token is provided in the URL, show an error
  if (!token) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-6 col-lg-5 col-xl-4">
              <MDBCard className="shadow-card">
                <MDBCardBody className="text-center">
                  <h2 className="card-title text-center mb-3">Invalid Reset Link</h2>
                  <p className="text-muted mb-4">
                    This password reset link is invalid or has expired. Please request a new password reset link.
                  </p>
                  <MDBBtn 
                    color="primary" 
                    rounded 
                    tag={Link} 
                    to="/forgot-password" 
                    className="w-100"
                  >
                    Request New Reset Link
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-5 col-xl-4">
            <div className="text-center mb-4">
              <h1 className="fw-bold text-primary">Reset Password</h1>
              <p className="text-muted">Create a new password for your account</p>
            </div>
            
            <MDBCard className="shadow-card">
              <MDBCardBody className="animate__animated animate__fadeIn">
                <form onSubmit={handleSubmit}>
                  <h2 className="card-title text-center mb-3">Create New Password</h2>
                  
                  {error && (
                    <div className="alert alert-danger mb-4" role="alert">
                      {error}
                    </div>
                  )}

                  <div className="mb-4">
                    <MDBInputGroup>
                      <div className="input-prefix">
                        <Lock size={18} />
                      </div>
                      <MDBInput
                        label="New Password"
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isSubmitting}
                        required
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
                    <MDBInputGroup>
                      <div className="input-prefix">
                        <Lock size={18} />
                      </div>
                      <MDBInput
                        label="Confirm Password"
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        disabled={isSubmitting}
                        required
                        contrast
                      />
                      <button
                        type="button"
                        onClick={toggleConfirmPasswordVisibility}
                        className="btn btn-outline-secondary"
                        tabIndex={-1}
                        style={{ zIndex: 0 }}
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </MDBInputGroup>
                  </div>

                  <MDBBtn 
                    type="submit" 
                    className="w-100 mb-3"
                    color="primary"
                    rounded
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Resetting..." : "Reset Password"}
                  </MDBBtn>

                  <div className="text-center">
                    <p className="small text-muted">
                      Remember your password?{" "}
                      <Link to="/" className="text-decoration-none">
                        Back to login
                      </Link>
                    </p>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
