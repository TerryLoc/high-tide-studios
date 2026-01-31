import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (pkg) => {
    setCartItems(prev => {
      const exists = prev.find(item => item.title === pkg.title);
      if (exists) {
        return prev.map(item =>
          item.title === pkg.title
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...pkg, quantity: 1 }];
    });
  };

  const removeFromCart = (title) => {
    setCartItems(prev => prev.filter(item => item.title !== title));
  };

  const updateQuantity = (title, quantity) => {
    if (quantity < 1) {
      removeFromCart(title);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.title === title ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((total, item) => {
    const price = parseInt(item.price.replace(/[^0-9]/g, ''));
    return total + price * item.quantity;
  }, 0);

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
