import React from 'react';
import { Routes, Route, Link } from 'react-router-dom'; 
import Catalogo from './pages/Catalogo';
import CarritoPage from './pages/CarritoPage';
import { useCarrito } from './context/CarritoContext';

function App() {
  const { cantidadTotalItems } = useCarrito();

  return (
    <>
      <nav className="navbar-eco" style={{
        backgroundColor: 'var(--verde-musgo)',
        padding: '15px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ color: 'var(--blanco)', margin: 0, fontSize: '1.5em' }}>
          EcoMarket
        </h1>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Link to="/" style={{ color: 'var(--blanco)', textDecoration: 'none', fontWeight: 'bold' }}>
            Catálogo
          </Link>
          <Link to="/carrito" style={{ color: 'var(--blanco)', textDecoration: 'none', fontWeight: 'bold' }}>
            Ver Carrito {cantidadTotalItems > 0 && `(${cantidadTotalItems})`}
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Catalogo />} />
        <Route path="/carrito" element={<CarritoPage />} />
      </Routes>
    </>
  );
}

export default App;