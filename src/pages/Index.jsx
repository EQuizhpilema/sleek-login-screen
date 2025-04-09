
import React from 'react';
import LoginForm from '@/components/LoginForm';

const Index = () => {
  const handleLogin = (username, password) => {
    console.log('Login attempted with:', username, password);
    // In a real app, you would handle authentication here
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-5 col-xl-4">
            <div className="card shadow-sm">
              <LoginForm onLogin={handleLogin} companyName="Sun Logistics" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
