import { useState } from 'react'

import './App.css'

import Header from './components/Header'
import Hero from './components/Hero'
import Flowers from './components/Flowers'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Cart from './components/Cart'
import Login from './components/Login'
import Register from './components/Register'
import Checkout from './components/Checkout'

function App() {
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  const [registeredUser, setRegisteredUser] = useState(() => {
    const savedUser = localStorage.getItem('registeredUser')

    return savedUser
      ? JSON.parse(savedUser)
      : null
  })

  const [currentUser, setCurrentUser] = useState(null)

  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)

  const [checkoutMessage, setCheckoutMessage] = useState('')

  function requireAccount() {
    if (currentUser) return true
    setIsCartOpen(false)
    setIsCheckoutOpen(false)
    if (registeredUser) openLogin()
    else openRegister()
    setCheckoutMessage('Please register or log in before shopping.')
    return false
  }

  function addToCart(product) {
    if (!requireAccount()) return
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      )

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1
              }
            : item
        )
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1
        }
      ]
    })
  }

  function buyNow(product) {
    if (!requireAccount()) return
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      )

      if (existingProduct) {
        return currentCart
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1
        }
      ]
    })

    setIsCartOpen(true)
  }

  function increaseQuantity(id) {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1
            }
          : item
      )
    )
  }

  function decreaseQuantity(id) {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id && item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1
            }
          : item
      )
    )
  }

  function removeFromCart(id) {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => item.id !== id
      )
    )
  }

  function handleRegister(user) {
    setRegisteredUser(user)
    setCurrentUser(user)

    localStorage.setItem(
      'registeredUser',
      JSON.stringify(user)
    )

    setIsRegisterOpen(false)

    setCheckoutMessage(
      'Registration successful. You are now logged in.'
    )
  }

  function handleLogin(user) {
    setCurrentUser(user)
    setIsLoginOpen(false)

    setCheckoutMessage(
      'Login successful.'
    )
  }

  function logout() {
    setCurrentUser(null)

    setCheckoutMessage(
      'You have logged out.'
    )
  }

  function handleCheckout() {
    if (!requireAccount()) return
    if (cart.length === 0) {
      setCheckoutMessage('Your cart is empty.')
      return
    }
    setIsCartOpen(false)
    setIsCheckoutOpen(true)
  }

  function clearCart() {
    setCart([])
  }

  function openCart() {
    if (!requireAccount()) return
    setIsCartOpen(true)
  }

  function openLogin() {
    setIsRegisterOpen(false)
    setIsLoginOpen(true)
  }

  function openRegister() {
    setIsLoginOpen(false)
    setIsRegisterOpen(true)
  }

  const cartCount = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  )

  return (
    <>
      <Header
        cartCount={cartCount}
        openCart={openCart}
        currentUser={currentUser}
        openLogin={openLogin}
        openRegister={openRegister}
        logout={logout}
      />

      {checkoutMessage && (
        <div className="site-message">
          <span>{checkoutMessage}</span>

          <button
            onClick={() =>
              setCheckoutMessage('')
            }
          >
            ×
          </button>
        </div>
      )}

      <main>
        <Hero />

        <Flowers
          addToCart={addToCart}
          buyNow={buyNow}
        />

        <About />
        <Contact />
      </main>

      <Footer />

      {isCartOpen && (
        <Cart
          cart={cart}
          onClose={() =>
            setIsCartOpen(false)
          }
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          removeFromCart={removeFromCart}
          handleCheckout={handleCheckout}
        />
      )}

      {isCheckoutOpen && (
        <Checkout
          cart={cart}
          clearCart={clearCart}
          onClose={() => setIsCheckoutOpen(false)}
        />
      )}

      {isLoginOpen && (
        <Login
          onClose={() =>
            setIsLoginOpen(false)
          }
          onLogin={handleLogin}
          registeredUser={registeredUser}
          openRegister={openRegister}
        />
      )}

      {isRegisterOpen && (
        <Register
          onClose={() =>
            setIsRegisterOpen(false)
          }
          onRegister={handleRegister}
          openLogin={openLogin}
        />
      )}
    </>
  )
}

export default App