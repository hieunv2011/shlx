import axios from 'axios';
import jwt from 'jwtwebtoken';
class AuthService {
  // Logging in the user
  async login(credentials) {
    try {
      const response = await axios.post('/api/login', credentials);
      localStorage.setItem('userToken', response.data.token);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Logging out the user
  logout() {
    localStorage.removeItem('userToken');
  }

  // Getting user data from the token
  getUserData() {
    const token = localStorage.getItem('userToken');
    return jwt.decode(token);
  }
}

export default new AuthService();