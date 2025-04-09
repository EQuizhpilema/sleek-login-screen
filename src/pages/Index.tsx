
import React from 'react';
import LoginForm from '@/components/LoginForm';
import { MDBCard } from 'mdb-react-ui-kit';

const Index = () => {
  const handleLogin = (username: string, password: string) => {
    console.log('Login attempted with:', username, password);
    // In a real app, you would handle authentication here
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-5 col-xl-4">
            <MDBCard className="shadow-card">
              <LoginForm onLogin={handleLogin} companyName="Sun Logistics" />
            </MDBCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
