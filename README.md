# iFlowers — Online Flower Shop

## Project Description

iFlowers is a responsive online flower shop developed using React and Vite. The project allows customers to browse flower bouquets, view product details, search and sort products, add items to a shopping cart, and place orders using a checkout form.

The website was developed as part of Web Development coursework.

## Technologies Used

- React
- JavaScript
- HTML5
- CSS3
- Vite
- React Hooks: useState and useEffect
- Local Storage

## Main Features

- Home page with flower collection
- Product cards with images, descriptions, and prices
- Product details
- Shopping cart
- Search and product filtering
- Login and registration
- Checkout form with validation
- Discount countdown timers
- Product sorting
- Responsive design

## Laboratory Work 8 — Forms and Controlled Components

**Topic:** Creating a customer checkout form in React.

**Objective:** Learn to work with forms, controlled components, useState, event handling, and input validation.

### Implemented Features

1. Checkout form with 11 fields: full name, email, phone, address, city, payment method, cardholder, card number, expiration date, CVV, and comment.
2. Payment method selection: Bank Card or Cash on Delivery.
3. Conditional rendering of bank card fields.
4. Controlled form inputs using useState, value, checked, and onChange.
5. Validation of required fields, email, phone number, and payment information.
6. Order submission using onSubmit and preventDefault().
7. Success message: "Order successfully placed!"
8. Your Order section displaying customer information, purchased products, total amount, and payment method.
9. Place Order, Reset Form, and Clear Cart buttons.
10. Form and cart reset after successful order submission.

## Discount Countdown Timer

**Objective:** Implement promotional product cards with a countdown timer.

### Implemented Features

- 10 flower product cards, including 6 promotional products.
- Product images, names, original prices, discounted prices, and discount percentages.
- Countdown timers displaying days, hours, minutes, and seconds.
- Timer updates every second using setInterval.
- useEffect for timer management and clearInterval for cleanup.
- Sale Expired message when the promotion ends.
- Product sorting by price and discount percentage.
- Add to Cart and Buy Now buttons.
- Responsive product layout.

## How to Run the Project

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

### 3. Open the website

Open the local URL displayed in Terminal, usually:

http://localhost:5173/

## Project Structure

```text
iFlowers/
├── public/
├── src/
│   ├── components/
│   └── ...
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## Important Notes

This project is a frontend educational demonstration.

The bank card form is for demonstration only. Users should not enter real bank card information. No real payment is processed.

Authentication and checkout are not intended for production use.

## Conclusion

The iFlowers project demonstrates practical React development skills, including component-based architecture, state management, controlled forms, input validation, conditional rendering, event handling, shopping cart functionality, and countdown timers.