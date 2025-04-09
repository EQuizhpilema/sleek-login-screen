
import React, { useState } from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import PasswordInput from './PasswordInput';

interface ResetPasswordFormProps {
  token: string;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ token }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

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

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="card-title text-center mb-3">Create New Password</h2>
      
      {error && (
        <div className="alert alert-danger mb-4" role="alert">
          {error}
        </div>
      )}

      <PasswordInput
        id="password"
        label="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isSubmitting}
      />

      <PasswordInput
        id="confirmPassword"
        label="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        disabled={isSubmitting}
      />

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
  );
};

export default ResetPasswordForm;
