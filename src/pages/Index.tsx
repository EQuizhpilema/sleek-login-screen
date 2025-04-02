
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
        <Card className="shadow-card overflow-hidden">
          <LoginForm onLogin={handleLogin} companyName="Sun Logistics" />
        </Card>
      </div>
    </div>
  );
};

export default Index;
