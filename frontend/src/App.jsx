import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom'; 
import Catalogo from './pages/Catalogo';
import CarritoPage from './pages/CarritoPage';
import { useCarrito } from './context/CarritoContext';
import Historial from './pages/Historial';
import AdminPage from './pages/AdminPage';

function App() {
  const { cantidadTotalItems } = useCarrito();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const toggleMenu = () => setMenuAbierto(!menuAbierto);
  const cerrarMenu = () => setMenuAbierto(false);

  return (
    <>
      <nav className="navbar-eco" style={{
        backgroundColor: 'var(--verde-musgo)',
        padding: '15px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        position: 'relative',
        zIndex: 1000
      }}>
        
        <Link to="/" style={{ textDecoration: 'none' }} onClick={cerrarMenu}>
          <h1 style={{ color: 'var(--blanco)', margin: 0, fontSize: '1.5em' }}>
            EcoMarket
          </h1>
        </Link>

        <button 
          onClick={toggleMenu}
          className="menu-hamburguesa-btn"
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--blanco)',
            fontSize: '1.8em',
            cursor: 'pointer',
            display: 'none'
          }}
        >
          {menuAbierto ? '✕' : '☰'}
        </button>

        <div 
          className={`navbar-links ${menuAbierto ? 'abierto' : ''}`}
          style={{ display: 'flex', gap: '20px' }}
        >
          <Link to="/" onClick={cerrarMenu} style={{ color: 'var(--blanco)', textDecoration: 'none', fontWeight: 'bold' }}>
            Catálogo
          </Link>
          <Link to="/carrito" onClick={cerrarMenu} style={{ color: 'var(--blanco)', textDecoration: 'none', fontWeight: 'bold' }}>
            Ver Carrito {cantidadTotalItems > 0 && `(${cantidadTotalItems})`}
          </Link>
          <Link to="/historial" onClick={cerrarMenu} style={{ color: 'var(--blanco)', textDecoration: 'none', fontWeight: '500' }}>
            Historial
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Catalogo />} />
        <Route path="/carrito" element={<CarritoPage />} />
        <Route path="/historial" element={<Historial />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </>
  );
}

export default App;