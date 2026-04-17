import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API_BASE_URL = 'http://localhost:4007';

function Dashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [addingProductId, setAddingProductId] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
      navigate('/login');
      return;
    }

    loadProducts();
    loadCart();
  }, [navigate]);

  async function loadProducts() {
    try {
      setLoadingProducts(true);
      setError('');
      const response = await fetch(`${API_BASE_URL}/products`);
      const data = await response.json();
      setProducts(data.msg || []);
    } catch (err) {
      setError('Unable to fetch products');
    } finally {
      setLoadingProducts(false);
    }
  }

  async function loadCart() {
    try {
      const response = await fetch(`${API_BASE_URL}/cart`);
      const data = await response.json();
      setCart(data.msg || []);
    } catch (err) {
      setError('Unable to fetch cart');
    }
  }

  async function addToCart(product) {
    try {
      setAddingProductId(product.id);
      setMessage('');
      const response = await fetch(`${API_BASE_URL}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image
        })
      });

      const data = await response.json();
      setCart(data.cart || []);
      setMessage(data.msg || 'Added to cart');
    } catch (err) {
      setError('Unable to add product to cart');
    } finally {
      setAddingProductId(null);
    }
  }

  function handleLogout() {
    sessionStorage.removeItem('isLoggedIn');
    navigate('/login');
  }

  const totalAmount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Shop</h3>
        <button onClick={handleLogout} className="btn btn-outline-secondary btn-sm">
          Logout
        </button>
      </div>

      <div className="mb-3">
        <strong>Cart:</strong> {cart.length} items | <strong>Total:</strong> ${totalAmount.toFixed(2)}
      </div>

      {error && <div className="alert alert-danger py-2">{error}</div>}
      {message && <div className="alert alert-success py-2">{message}</div>}

      {loadingProducts ? (
        <p>Loading products...</p>
      ) : (
        <div className="row g-3">
          {products.map(product => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={product.id}>
              <div className="card h-100">
                <img
                  src={product.image}
                  className="card-img-top p-3"
                  alt={product.title}
                  style={{ height: '170px', objectFit: 'contain' }}
                />
                <div className="card-body d-flex flex-column">
                  <h6 className="card-title" style={{ fontSize: '14px' }}>{product.title}</h6>
                  <p className="fw-bold mb-2">${product.price}</p>
                  <button
                    onClick={() => addToCart(product)}
                    className="btn btn-primary btn-sm mt-auto"
                    disabled={addingProductId === product.id}
                  >
                    {addingProductId === product.id ? 'Adding...' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4">
        <h5>Cart Items</h5>
        {cart.length === 0 ? (
          <p className="text-muted">No items in cart.</p>
        ) : (
          <ul className="list-group">
            {cart.map(item => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{item.title}</span>
                <span>Qty: {item.quantity}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Dashboard
