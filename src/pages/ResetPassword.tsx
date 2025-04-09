
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import ResetPasswordForm from '@/components/ResetPasswordForm';
import InvalidResetToken from '@/components/InvalidResetToken';

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-5 col-xl-4">
            {!token ? (
              <InvalidResetToken />
            ) : (
              <>
                <div className="text-center mb-4">
                  <h1 className="fw-bold text-primary">Reset Password</h1>
                  <p className="text-muted">Create a new password for your account</p>
                </div>
                
                <MDBCard className="shadow-card">
                  <MDBCardBody className="animate__animated animate__fadeIn">
                    <ResetPasswordForm token={token} />
                  </MDBCardBody>
                </MDBCard>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
