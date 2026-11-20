import { useState } from 'react'

function Register({ onClose, onRegister, openLogin }) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [terms, setTerms] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    if (
      !fullName ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setError('Please fill in all fields.')
      return
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email.')
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (!terms) {
      setError('Please accept the terms.')
      return
    }

    const newUser = {
      fullName,
      email,
      password
    }

    onRegister(newUser)
  }

  return (
    <div className="auth-overlay">
      <div className="auth-modal">

        <button
          className="auth-close"
          onClick={onClose}
        >
          ×
        </button>

        <p className="auth-small-title">
          iFlowers
        </p>

        <h2>Create Account</h2>

        <p className="auth-description">
          Create an account to continue shopping.
        </p>

        <form onSubmit={handleSubmit}>

          <label>Full Name</label>

          <input
            type="text"
            placeholder="Your name"
            value={fullName}
            onChange={(event) =>
              setFullName(event.target.value)
            }
          />

          <label>Email</label>

          <input
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
          />

          <label>Password</label>

          <div className="password-field">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Minimum 8 characters"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <label>Confirm Password</label>

          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Repeat your password"
            value={confirmPassword}
            onChange={(event) =>
              setConfirmPassword(event.target.value)
            }
          />

          <label className="terms-row">
            <input
              type="checkbox"
              checked={terms}
              onChange={(event) =>
                setTerms(event.target.checked)
              }
            />

            <span>
              I agree to the terms and conditions
            </span>
          </label>

          {error && (
            <p className="auth-error">
              {error}
            </p>
          )}

          <button
            className="auth-main-button"
            type="submit"
          >
            Register
          </button>

        </form>

        <p className="auth-switch">
          Already have an account?

          <button
            type="button"
            onClick={openLogin}
          >
            Login
          </button>
        </p>

      </div>
    </div>
  )
}

export default Register