import React, { useState, useEffect } from 'react';
import { useCarrito } from '../context/CarritoContext';

function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const { agregarProducto } = useCarrito();

  useEffect(() => {
    fetch('http://localhost:8080/api/productos')
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error conectando con Spring Boot:", err);
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return <div className="seccion-contenedor" style={{ padding: '30px' }}>Cargando productos desde el servidor...</div>;
  }

  return (
    <div className="seccion-contenedor" style={{ padding: '30px' }}>
      <h2 style={{ color: 'var(--verde-musgo)', borderBottom: '2px solid var(--verde-hoja)', paddingBottom: '10px', margin: 0 }}>
        Catálogo de Productos EcoMarket
      </h2>
      
      {productos.length === 0 ? (
        <p style={{ marginTop: '20px' }}>No se encontraron productos en la base de datos.</p>
      ) : (
        <div className="catalogo-grid" style={{ marginTop: '20px' }}>
          {productos.map((prod) => {
            const estaAgotado = prod.stock <= 0;
            return (
              <div 
                key={prod.id} 
                className="producto-card"
                style={{
                  opacity: estaAgotado ? 0.6 : 1,
                  backgroundColor: estaAgotado ? '#f5f5f5' : '#ffffff',
                  position: 'relative',
                  transition: 'all 0.3s ease'
                }}
              >
                {estaAgotado && (
                  <span style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: '#d32f2f', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8em', fontWeight: 'bold' }}>
                    AGOTADO
                  </span>
                )}
                <div>
                  <h3 style={{ margin: '0 0 10px 0', color: estaAgotado ? '#888' : 'var(--verde-musgo)' }}>{prod.nombre}</h3>
                  <p style={{ fontWeight: 'bold', fontSize: '1.1em', margin: '10px 0', color: estaAgotado ? '#888' : 'inherit' }}>
                    ${prod.precio}
                  </p>
                  <p style={{ color: estaAgotado ? '#d32f2f' : (prod.stock < 10 ? '#D97706' : 'var(--verde-hoja)'), fontWeight: '500', margin: '5px 0' }}>
                    {estaAgotado ? 'Sin unidades disponibles' : `Stock: ${prod.stock} unidades`}
                  </p>
                </div>
                <button 
                  style={{ 
                    width: '100%', padding: '10px', 
                    backgroundColor: estaAgotado ? '#ccc' : 'var(--verde-musgo)', 
                    color: estaAgotado ? '#666' : 'var(--blanco)', 
                    border: 'none', borderRadius: '6px',
                    cursor: estaAgotado ? 'not-allowed' : 'pointer', fontWeight: 'bold', marginTop: '15px'
                  }}
                  disabled={estaAgotado}
                  onClick={() => agregarProducto(prod)}
                >
                  {estaAgotado ? 'No disponible' : 'Agregar al Carrito'}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Catalogo;