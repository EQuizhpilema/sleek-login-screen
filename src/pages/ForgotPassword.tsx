import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';
import { User } from 'lucide-react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset states
    setError(null);
    
    // Basic validation
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // In a real app, you would call an API to send a password reset email
      // For now we'll simulate a successful API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setEmailSent(true);
      toast({
        title: "Reset Email Sent",
        description: "If an account exists with this email, you'll receive a password reset link.",
      });
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue mb-2">Forgot Password</h1>
          <p className="text-gray-600">Enter your email to receive a password reset link</p>
        </div>

        {emailSent ? (
          <div className="bg-white rounded-lg shadow-card p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 p-3 rounded-full">
                <User className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Email Sent</h2>
            <p className="text-gray-600 mb-6">
              If an account exists with the email <strong>{email}</strong>, you'll receive a 
              password reset link shortly. Please check your inbox and spam folder.
            </p>
            <Button 
              asChild
              className="w-full bg-blue hover:bg-blue-dark transition-colors rounded-full"
            >
              <Link to="/">Return to Login</Link>
            </Button>
          </div>
        ) : (
          <div className="w-full animate-fade-in">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-card p-8">
              <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Reset Password</h2>
              
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email
                  </Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <User size={18} />
                    </div>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 border-gray-200 focus:border-blue-400 focus:ring-blue-400 shadow-input"
                      placeholder="your@email.com"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-blue hover:bg-blue-dark transition-colors rounded-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Reset Link"}
                </Button>

                <div className="text-center mt-4">
                  <p className="text-sm text-gray-600">
                    Remember your password?{" "}
                    <Link to="/" className="text-blue hover:text-blue-dark transition-colors font-medium">
                      Back to login
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
