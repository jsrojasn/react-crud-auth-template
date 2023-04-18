import { BrowserRouter, Routes, Route } from "react-router-dom"
import CreateProduct from "./pages/CreateProduct";
import Auth from "./pages/Auth";
import Products from "./pages/Products";
import SingleProduct from "./pages/SingleProduct";
import './App.css';
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<ProtectedRoute><Navbar /><Products /></ProtectedRoute>} />
          <Route path="/create-product" element={<ProtectedRoute><Navbar /><CreateProduct /></ProtectedRoute>} />
          <Route path="/products/:id" element={<ProtectedRoute><Navbar /><SingleProduct /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
