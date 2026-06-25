import React from 'react';
import { useCarrito } from '../context/CarritoContext';

function CarritoPage() {
  const { carrito, agregarProducto, restarProducto, limpiarCarrito } = useCarrito();

  const totalCompra = carrito.reduce((acumulador, item) => acumulador + (item.precio * item.cantidad), 0);

  const handleConfirmarCompra = () => {
    alert("¡Pedido procesado de forma local! Guardando estado... ");
  };

  return (
    <div className="seccion-contenedor" style={{ padding: '30px' }}>
      <h2 style={{ color: 'var(--verde-musgo)', borderBottom: '2px solid var(--verde-hoja)', paddingBottom: '10px', margin: 0 }}>
        Tu Pedido
      </h2>

      {carrito.length === 0 ? (
        <p style={{ marginTop: '20px' }}>El carrito está vacío. ¡Volvé al catálogo para sumar productos!</p>
      ) : (
        <div style={{ marginTop: '20px' }}>
          
          <div className="carrito-contenedor">
            {carrito.map((item) => (
              <div key={item.id} className="carrito-item">
                
                <div style={{ flex: 1 }}>
                  <strong style={{ fontSize: '1.1em' }}>{item.nombre}</strong>
                  <div style={{ fontSize: '0.9em', color: '#666', marginTop: '4px' }}>
                    Precio unitario: ${item.precio}
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px' }}>
                    <button 
                      style={{ padding: '2px 8px', borderRadius: '4px', border: '1px solid #ccc', cursor: 'pointer', fontWeight: 'bold' }}
                      onClick={() => restarProducto(item.id)}
                    >
                      -
                    </button>
                    <span style={{ fontWeight: 'bold', color: 'var(--verde-hoja)' }}>{item.cantidad} u.</span>
                    <button 
                      style={{ padding: '2px 8px', borderRadius: '4px', border: '1px solid #ccc', cursor: 'pointer', fontWeight: 'bold' }}
                      onClick={() => agregarProducto(item)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div style={{ fontWeight: '600', fontSize: '1.05em', color: 'var(--texto-oscuro)' }}>
                  Subtotal: ${item.precio * item.cantidad}
                </div>

              </div>
            ))}
            
            <div style={{ textAlign: 'right', marginTop: '20px', fontSize: '1.3em', fontWeight: 'bold', color: 'var(--verde-musgo)' }}>
              Total Pedido: ${totalCompra}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <button 
              style={{ 
                padding: '12px 24px', 
                backgroundColor: '#d32f2f', 
                color: 'white', 
                border: 'none', 
                borderRadius: '6px', 
                cursor: 'pointer', 
                fontWeight: 'bold' 
              }}
              onClick={limpiarCarrito}
            >
              Vaciar Carrito
            </button>

            <button 
              style={{ 
                padding: '12px 24px', 
                backgroundColor: 'var(--verde-musgo)', 
                color: 'white', 
                border: 'none', 
                borderRadius: '6px', 
                cursor: 'pointer', 
                fontWeight: 'bold',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
              onClick={handleConfirmarCompra}
            >
              Confirmar Compra
            </button>
          </div>

        </div>
      )}
    </div>
  );
}

export default CarritoPage;