
import React from 'react';
import LoginForm from '@/components/LoginForm';
import { Card } from '@/components/ui/card';

const Index = () => {
  const handleLogin = (email: string, password: string) => {
    console.log('Login attempted with:', email, password);
    // In a real app, you would handle authentication here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue mb-2">Login</h1>
          <p className="text-gray-600">Enter your credentials to access your account</p>
        </div>
        <Card className="shadow-card overflow-hidden">
          <LoginForm onLogin={handleLogin} companyName="Sun Logistics" />
        </Card>
      </div>
    </div>
  );
};

export default Index;
