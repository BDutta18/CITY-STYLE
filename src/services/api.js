const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const getAuthHeaders = (user) => {
  if (!user) return {};
  return {
    'x-firebase-uid': user.uid,
    'x-user-email': user.email
  };
};

export const cartAPI = {
  async getCart(user) {
    const response = await fetch(`${API_URL}/cart`, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(user)
      }
    });
    if (!response.ok) throw new Error('Failed to fetch cart');
    return response.json();
  },

  async syncCart(user, items) {
    const response = await fetch(`${API_URL}/cart/sync`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(user)
      },
      body: JSON.stringify({ items })
    });
    if (!response.ok) throw new Error('Failed to sync cart');
    return response.json();
  },

  async updateCart(user, items) {
    const response = await fetch(`${API_URL}/cart`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(user)
      },
      body: JSON.stringify({ items })
    });
    if (!response.ok) throw new Error('Failed to update cart');
    return response.json();
  },

  async clearCart(user) {
    const response = await fetch(`${API_URL}/cart`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(user)
      }
    });
    if (!response.ok) throw new Error('Failed to clear cart');
    return response.json();
  }
};

export const orderAPI = {
  async createOrder(user, orderData) {
    const response = await fetch(`${API_URL}/orders/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(user)
      },
      body: JSON.stringify(orderData)
    });
    if (!response.ok) throw new Error('Failed to create order');
    return response.json();
  },

  async getOrders(user) {
    const response = await fetch(`${API_URL}/orders`, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(user)
      }
    });
    if (!response.ok) throw new Error('Failed to fetch orders');
    return response.json();
  },

  async getOrder(user, orderId) {
    const response = await fetch(`${API_URL}/orders/${orderId}`, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(user)
      }
    });
    if (!response.ok) throw new Error('Failed to fetch order');
    return response.json();
  },

  async cancelOrder(user, orderId, reason) {
    const response = await fetch(`${API_URL}/orders/${orderId}/cancel`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(user)
      },
      body: JSON.stringify({ reason })
    });
    if (!response.ok) throw new Error('Failed to cancel order');
    return response.json();
  }
};

export const userAPI = {
  async syncUser(user, userData) {
    const response = await fetch(`${API_URL}/users/sync`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(user)
      },
      body: JSON.stringify(userData)
    });
    if (!response.ok) throw new Error('Failed to sync user');
    return response.json();
  },

  async getAddresses(user) {
    const response = await fetch(`${API_URL}/users/addresses`, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(user)
      }
    });
    if (!response.ok) throw new Error('Failed to fetch addresses');
    return response.json();
  },

  async addAddress(user, addressData) {
    const response = await fetch(`${API_URL}/users/addresses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(user)
      },
      body: JSON.stringify(addressData)
    });
    if (!response.ok) throw new Error('Failed to add address');
    return response.json();
  },

  async updateAddress(user, addressId, addressData) {
    const response = await fetch(`${API_URL}/users/addresses/${addressId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(user)
      },
      body: JSON.stringify(addressData)
    });
    if (!response.ok) throw new Error('Failed to update address');
    return response.json();
  },

  async deleteAddress(user, addressId) {
    const response = await fetch(`${API_URL}/users/addresses/${addressId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(user)
      }
    });
    if (!response.ok) throw new Error('Failed to delete address');
    return response.json();
  }
};
