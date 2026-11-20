function Header({
  cartCount,
  openCart,
  currentUser,
  openLogin,
  openRegister,
  logout
}) {
  const menuItems = [
    "Home",
    "Flowers",
    "About",
    "Contact"
  ]

  return (
    <header className="header">

      <h2 className="logo">
        iFlowers
      </h2>

      <nav>
        <ul className="nav-list">
          {menuItems.map((item) => (
            <li key={item}>
              <a
                href={
                  "#" + item.toLowerCase()
                }
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="header-actions">

        <button
          className="cart-header-button"
          onClick={openCart}
        >
          Cart ({cartCount})
        </button>

        {currentUser ? (
          <>
            <span className="user-name">
              Hi, {currentUser.fullName}
            </span>

            <button
              className="logout-button"
              onClick={logout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              className="login-header-button"
              onClick={openLogin}
            >
              Login
            </button>

            <button
              className="register-header-button"
              onClick={openRegister}
            >
              Register
            </button>
          </>
        )}

      </div>

    </header>
  )
}

export default Header