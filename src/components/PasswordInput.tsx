
import React, { useState } from 'react';
import { MDBInput, MDBInputGroup } from 'mdb-react-ui-kit';
import { Eye, EyeOff, Lock } from 'lucide-react';

interface PasswordInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  id,
  label,
  value,
  onChange,
  disabled = false,
  required = true,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-4">
      <MDBInputGroup>
        <div className="input-prefix">
          <Lock size={18} />
        </div>
        <MDBInput
          label={label}
          id={id}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
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
  );
};

export default PasswordInput;
