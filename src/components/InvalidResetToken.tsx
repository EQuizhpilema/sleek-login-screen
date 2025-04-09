
import React from 'react';
import { MDBCard, MDBCardBody, MDBBtn } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

const InvalidResetToken: React.FC = () => {
  return (
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
  );
};

export default InvalidResetToken;
