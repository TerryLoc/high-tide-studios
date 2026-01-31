import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import SEO from '../components/SEO';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <>
        <SEO page="cart" />
        <section className="container py-5 text-center">
        <div className="py-5">
          <i className="bi bi-cart-x display-1 text-muted mb-4 d-block"></i>
          <h1 className="mb-3">Your Cart is Empty</h1>
          <p className="text-muted mb-4">
            Looks like you haven't added any packages yet.
          </p>
          <Link to="/" className="btn btn-dark btn-lg">
            <i className="bi bi-arrow-left me-2"></i>
            Browse Packages
          </Link>
        </div>
      </section>
      </>
    );
  }

  return (
    <>
      <SEO page="cart" />
      <section className="container py-5">
        <h1 className="mb-4">Your Cart</h1>

      <div className="row">
        {/* Cart Items */}
        <div className="col-12 col-lg-8 mb-4 mb-lg-0">
          {cartItems.map((item, index) => (
            <div key={index} className="card mb-3 shadow-sm">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-12 col-md-6 mb-3 mb-md-0">
                    <h5 className="fw-bold mb-1">{item.title}</h5>
                    <p className="text-muted small mb-0">{item.subtitle}</p>
                  </div>
                  <div className="col-6 col-md-3">
                    <div className="input-group input-group-sm">
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => updateQuantity(item.title, item.quantity - 1)}
                      >
                        <i className="bi bi-dash"></i>
                      </button>
                      <span className="input-group-text bg-white px-3">
                        {item.quantity}
                      </span>
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => updateQuantity(item.title, item.quantity + 1)}
                      >
                        <i className="bi bi-plus"></i>
                      </button>
                    </div>
                  </div>
                  <div className="col-4 col-md-2 text-end">
                    <span className="fw-bold">{item.price}</span>
                  </div>
                  <div className="col-2 col-md-1 text-end">
                    <button
                      className="btn btn-link text-danger p-0"
                      onClick={() => removeFromCart(item.title)}
                      aria-label="Remove item"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={clearCart}
          >
            <i className="bi bi-trash me-2"></i>
            Clear Cart
          </button>
        </div>

        {/* Order Summary */}
        <div className="col-12 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="fw-bold mb-4">Order Summary</h5>

              {cartItems.map((item, index) => (
                <div key={index} className="d-flex justify-content-between mb-2">
                  <span className="text-muted">
                    {item.title} × {item.quantity}
                  </span>
                  <span>
                    €{parseInt(item.price.replace(/[^0-9]/g, '')) * item.quantity}
                  </span>
                </div>
              ))}

              <hr />

              <div className="d-flex justify-content-between mb-4">
                <span className="fw-bold">Total</span>
                <span className="fw-bold fs-5">€{cartTotal}</span>
              </div>

              <Link to="/contact" className="btn btn-dark w-100 mb-2">
                <i className="bi bi-envelope me-2"></i>
                Request Quote
              </Link>
              <p className="small text-muted text-center mb-0">
                We'll contact you to confirm your booking
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
