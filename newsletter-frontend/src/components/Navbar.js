import React from "react";
import { Link } from "react-router-dom";

// Mock kullanıcı durumu (Gerçek projede Redux/AuthContext ile yönetilebilir)
const isAuthenticated = true; // Kullanıcı giriş yaptıysa `true`
const isAdmin = true; // Admin kullanıcısıysa `true`

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">🏠 Home</Link></li>
    
        <li><Link to="/contact">📩 Contact</Link></li>

        {/* Kullanıcı giriş yaptıysa ürün ve sipariş sayfaları gösterilir */}
     

        {/* Eğer kullanıcı admin ise admin paneli görünür */}
        {isAdmin && <li><Link to="/admin">⚙️ Panel</Link></li>}


    
      </ul>
    </nav>
  );
}

export default Navbar;
