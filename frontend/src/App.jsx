import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])

  // --- Filtering state ---
  const [searchName, setSearchName] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  // --- New product form state ---
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    category: '',
    subcategory: '',
    sellerName: '',
    price: '',
    quantity: ''
  })

  // --- Fetch products from backend ---
  const fetchProducts = () => {
    let url = 'http://localhost:8080/api/products'
    const params = {}
    if (searchName) params.name = searchName
    if (minPrice && maxPrice) {
      params.minPrice = minPrice
      params.maxPrice = maxPrice
    }

    axios.get(url, { params })
      .then(res => setProducts(res.data))
      .catch(err => console.error(err))
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  // --- Load cart from localStorage ---
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) setCart(JSON.parse(savedCart))
  }, [])

  // --- Save cart in localStorage ---
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  // --- Cart functions ---
  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id)
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const removeFromCart = (product) => {
    setCart(cart.filter(item => item.id !== product.id))
  }

  const increaseQty = (product) => {
    setCart(cart.map(item =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    ))
  }

  const decreaseQty = (product) => {
    setCart(cart.map(item =>
      item.id === product.id ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
    ))
  }

  const total = cart.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0)

  // --- Checkout ---
  const checkout = () => {
    const orderItems = cart.map(item => ({
      productId: item.id,
      name: item.name,
      price: parseFloat(item.price),
      quantity: item.quantity
    }))
    axios.post('http://localhost:8080/api/orders', { items: orderItems })
      .then(res => {
        alert('Comanda a fost plasată!')
        setCart([])
      })
      .catch(err => {
        console.error(err)
        alert('A apărut o eroare la plasarea comenzii.')
      })
  }

  // --- Add new product ---
  const addProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.quantity) {
      alert('Please fill at least name, price, and quantity')
      return
    }

    const payload = {
      ...newProduct,
      price: parseFloat(newProduct.price),
      quantity: parseInt(newProduct.quantity)
    }

    axios.post('http://localhost:8080/api/products', payload)
      .then(res => {
        alert('Produs adăugat cu succes!')
        setProducts(prev => [...prev, res.data])
        setNewProduct({
          name: '',
          description: '',
          category: '',
          subcategory: '',
          sellerName: '',
          price: '',
          quantity: ''
        })
      })
      .catch(err => {
        console.error(err)
        alert('A apărut o eroare la adăugarea produsului.')
      })
  }

  return (
    <div className="app-container">
      <h1>Produse Shop</h1>

      {/* --- New Product Form --- */}
      <h2>Add New Product</h2>
      <div className="new-product-form">
        <input placeholder="Name" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})}/>
        <input placeholder="Description" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})}/>
        <input placeholder="Category" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})}/>
        <input placeholder="Subcategory" value={newProduct.subcategory} onChange={e => setNewProduct({...newProduct, subcategory: e.target.value})}/>
        <input placeholder="Seller Name" value={newProduct.sellerName} onChange={e => setNewProduct({...newProduct, sellerName: e.target.value})}/>
        <input type="number" placeholder="Price" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})}/>
        <input type="number" placeholder="Quantity" value={newProduct.quantity} onChange={e => setNewProduct({...newProduct, quantity: e.target.value})}/>
        <button onClick={addProduct}>Add Product</button>
      </div>

      {/* --- Filter Form --- */}
      <h2>Filter Products</h2>
      <div className="filter-form">
        <input placeholder="Search by name" value={searchName} onChange={e => setSearchName(e.target.value)}/>
        <input type="number" placeholder="Min Price" value={minPrice} onChange={e => setMinPrice(e.target.value)}/>
        <input type="number" placeholder="Max Price" value={maxPrice} onChange={e => setMaxPrice(e.target.value)}/>
        <button onClick={fetchProducts}>Filter</button>
      </div>

      {/* --- Products List --- */}
      <h2>Available Products</h2>
      <div className="products-container">
        {products.length === 0 ? <p>No products.</p> :
          products.map(product => (
            <div key={product.id} className="product-card">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Category: {product.category} / {product.subcategory}</p>
              <p>Seller: {product.sellerName}</p>
              <p>Price: {product.price} RON</p>
              <p>Stock: {product.quantity}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))
        }
      </div>

      {/* --- Cart --- */}
      <div className="cart-container">
        <h2>Your Cart</h2>
        {cart.length === 0 ? <p>Cart is empty.</p> :
          <>
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <div>
                  <strong>{item.name}</strong><br/>
                  Price: {item.price} RON<br/>
                  Quantity: {item.quantity}
                </div>
                <div className="cart-buttons">
                  <button onClick={() => increaseQty(item)}>+</button>
                  <button onClick={() => decreaseQty(item)}>-</button>
                  <button onClick={() => removeFromCart(item)}>Remove</button>
                </div>
              </div>
            ))}
            <p className="total">Total: {total.toFixed(2)} RON</p>
            <button onClick={checkout} className="checkout-button">Checkout</button>
          </>
        }
      </div>
    </div>
  )
}

export default App
