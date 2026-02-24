import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from '../context/AuthContext';
import { cartAPI } from '../services/api';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCart = localStorage.getItem('cart');
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error('Failed to parse cart from local storage', error);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Failed to save cart to local storage', error);
    }
  }, [cartItems]);

  useEffect(() => {
    if (user && !syncing) {
      syncCartWithBackend();
    }
  }, [user]);

  const syncCartWithBackend = async () => {
    if (!user || syncing) return;
    
    setSyncing(true);
    try {
      const localCart = cartItems.map(item => ({
        slug: item.slug,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
        color: item.color
      }));

      const backendCart = await cartAPI.syncCart(user, localCart);
      
      const mergedItems = backendCart.items.map(item => ({
        slug: item.productSlug,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
        color: item.color
      }));

      setCartItems(mergedItems);
    } catch (error) {
      console.error('Failed to sync cart:', error);
    } finally {
      setSyncing(false);
    }
  };

  const updateBackendCart = async (items) => {
    if (!user) return;
    
    try {
      const backendItems = items.map(item => ({
        productSlug: item.slug,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
        color: item.color
      }));

      await cartAPI.updateCart(user, backendItems);
    } catch (error) {
      console.error('Failed to update backend cart:', error);
    }
  };

  const addToCart = (product, quantity = 1, size = 'M') => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.slug === product.slug && item.size === size
      );

      let newItems;
      if (existingItemIndex > -1) {
        newItems = [...prevItems];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity,
        };
      } else {
        newItems = [...prevItems, { ...product, quantity, size }];
      }

      updateBackendCart(newItems);
      return newItems;
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (slug, size) => {
    setCartItems((prevItems) => {
      const newItems = prevItems.filter((item) => !(item.slug === slug && item.size === size));
      updateBackendCart(newItems);
      return newItems;
    });
  };

  const updateQuantity = (slug, size, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prevItems) => {
      const newItems = prevItems.map((item) =>
        item.slug === slug && item.size === size
          ? { ...item, quantity: newQuantity }
          : item
      );
      updateBackendCart(newItems);
      return newItems;
    });
  };

  const clearCart = async () => {
    setCartItems([]);
    if (user) {
      try {
        await cartAPI.clearCart(user);
      } catch (error) {
        console.error('Failed to clear backend cart:', error);
      }
    }
  };

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        toggleCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
