function AdminAcces({ children }) {
    const isAuthenticated = !!localStorage.getItem("token");
    return isAuthenticated ? children : null;
  }
  
  export default AdminAcces;