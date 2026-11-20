import { useState } from 'react'

function Login({
  onClose,
  onLogin,
  registeredUser,
  openRegister
}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    if (!email || !password) {
      setError('Please fill in all fields.')
      return
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email.')
      return
    }

    if (!registeredUser) {
      setError('Please register first.')
      return
    }

    if (
      email !== registeredUser.email ||
      password !== registeredUser.password
    ) {
      setError('Incorrect email or password.')
      return
    }

    onLogin(registeredUser)
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

        <h2>Welcome Back</h2>

        <p className="auth-description">
          Login to continue your order.
        </p>

        <form onSubmit={handleSubmit}>

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
              placeholder="Your password"
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

          {error && (
            <p className="auth-error">
              {error}
            </p>
          )}

          <button
            className="auth-main-button"
            type="submit"
          >
            Login
          </button>

        </form>

        <p className="auth-switch">
          Don't have an account?

          <button
            type="button"
            onClick={openRegister}
          >
            Register
          </button>
        </p>

      </div>
    </div>
  )
}

export default Login