const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const getAuthHeaders = (user) => {
  if (!user) return {};
  return {
    'x-firebase-uid': user.uid,
    'x-user-email': user.email
  };
};

const parseResponse = async (response) => {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data?.error || 'Request failed');
  }
  return data;
};

export const cartAPI = {
  async getCart(user) {
    const response = await fetch(`${API_URL}/cart`, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(user)
      }
    });
    return parseResponse(response);
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
    return parseResponse(response);
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
    return parseResponse(response);
  },

  async clearCart(user) {
    const response = await fetch(`${API_URL}/cart`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(user)
      }
    });
    return parseResponse(response);
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
    return parseResponse(response);
  },

  async getOrders(user) {
    const response = await fetch(`${API_URL}/orders`, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(user)
      }
    });
    return parseResponse(response);
  },

  async getOrder(user, orderId) {
    const response = await fetch(`${API_URL}/orders/${orderId}`, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(user)
      }
    });
    return parseResponse(response);
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
    return parseResponse(response);
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
    return parseResponse(response);
  },

  async getAddresses(user) {
    const response = await fetch(`${API_URL}/users/addresses`, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(user)
      }
    });
    return parseResponse(response);
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
    return parseResponse(response);
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
    return parseResponse(response);
  },

  async deleteAddress(user, addressId) {
    const response = await fetch(`${API_URL}/users/addresses/${addressId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(user)
      }
    });
    return parseResponse(response);
  }
};

export const reviewAPI = {
  async getByProduct(productSlug) {
    const response = await fetch(`${API_URL}/reviews/${productSlug}`, {
      headers: { 'Content-Type': 'application/json' }
    });
    return parseResponse(response);
  },

  async submitReview(user, reviewData) {
    const response = await fetch(`${API_URL}/reviews/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(user)
      },
      body: JSON.stringify(reviewData)
    });
    return parseResponse(response);
  },

  async getSummary(productSlug) {
    const response = await fetch(`${API_URL}/reviews/${productSlug}/summary`, {
      headers: { 'Content-Type': 'application/json' }
    });
    return parseResponse(response);
  }
};
